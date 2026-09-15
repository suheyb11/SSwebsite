"use client";

// The sign-in form.
//
// `useActionState` keeps the error next to the field that caused it without a
// round trip through query strings, and `useFormStatus` disables the button
// while the request is in flight so the form cannot be submitted twice.

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { LogIn } from "lucide-react";
import { login, type LoginState } from "../actions";

export default function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next ?? "/admin"} />

      <div>
        <label htmlFor="email" className="field-label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          autoFocus
          className="field"
        />
      </div>

      <div>
        <label htmlFor="password" className="field-label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="field"
        />
      </div>

      {state.error && (
        <p role="alert" className="rounded-lg bg-primary-50 px-4 py-3 text-sm font-medium text-primary-700">
          {state.error}
        </p>
      )}

      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-3 font-semibold text-white transition-colors duration-150 hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <LogIn size={17} aria-hidden="true" />
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}
