# Resets the PostgreSQL superuser password on this machine.
#
#   powershell -ExecutionPolicy Bypass -File scripts\reset-postgres-password.ps1 -NewPassword "..."
#
# Must run elevated: it edits a file under Program Files and restarts a service.
#
# How it works, and why it is safe:
#
#   pg_hba.conf decides how PostgreSQL checks who you are. It is set to
#   scram-sha-256, which means "prove it with a password" — and without the
#   password there is no way in, by design. The only way past that is to change
#   the rule, and the only way to change the rule is to already have
#   administrator rights on the machine, which is the real gate.
#
#   So: switch local connections to `trust` for a moment, restart, set the new
#   password, then put the original file back and restart again. The window
#   where anything can connect without a password is a few seconds, on
#   localhost only, and the original file is copied aside first so it can be
#   restored even if a step fails.
#
# Nothing in any database is read, changed or deleted.

param(
  [Parameter(Mandatory = $true)]
  [string]$NewPassword,

  [string]$PgRoot = "C:\Program Files\PostgreSQL\18",
  [string]$ServiceName = "postgresql-x64-18"
)

$ErrorActionPreference = "Stop"

$hba = Join-Path $PgRoot "data\pg_hba.conf"
$psql = Join-Path $PgRoot "bin\psql.exe"
$backup = "$hba.before-reset"

if (-not (Test-Path $hba)) { throw "pg_hba.conf not found at $hba" }
if (-not (Test-Path $psql)) { throw "psql.exe not found at $psql" }

# A password with a single quote in it would end the SQL string early. Doubling
# it is the standard escape, so any password the user picked still works.
$escaped = $NewPassword.Replace("'", "''")

Write-Host "1. Backing up pg_hba.conf -> $backup"
Copy-Item $hba $backup -Force

try {
  Write-Host "2. Allowing local connections without a password, briefly"
  $original = Get-Content $hba
  $relaxed = $original | ForEach-Object {
    if ($_ -match '^\s*(local|host)\s') { $_ -replace 'scram-sha-256\s*$', 'trust' } else { $_ }
  }
  Set-Content -Path $hba -Value $relaxed -Encoding ascii

  Write-Host "3. Restarting $ServiceName"
  Restart-Service $ServiceName -Force
  Start-Sleep -Seconds 3

  Write-Host "4. Setting the new password"
  & $psql -h 127.0.0.1 -p 5432 -U postgres -d postgres -c "ALTER USER postgres WITH PASSWORD '$escaped';" | Out-Host
  if ($LASTEXITCODE -ne 0) { throw "ALTER USER failed with exit code $LASTEXITCODE" }
}
finally {
  # Runs even if something above threw: the machine must never be left with
  # password checks switched off.
  Write-Host "5. Restoring the original pg_hba.conf"
  Copy-Item $backup $hba -Force

  Write-Host "6. Restarting $ServiceName"
  Restart-Service $ServiceName -Force
  Start-Sleep -Seconds 3
}

Write-Host "7. Checking the new password works"
$env:PGPASSWORD = $NewPassword
$check = & $psql -h 127.0.0.1 -p 5432 -U postgres -d postgres -tAc "SELECT 'connected as ' || current_user" 2>&1
$code = $LASTEXITCODE
$env:PGPASSWORD = ""

if ($code -eq 0) {
  Write-Host "   OK - $check"
  Remove-Item $backup -Force -ErrorAction SilentlyContinue
  Write-Host "`nDone. Password checks are back on and the new password works."
} else {
  Write-Host "   FAILED - $check"
  Write-Host "`nThe original pg_hba.conf has been restored. Nothing was lost."
  exit 1
}
