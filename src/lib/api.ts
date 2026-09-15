// Helpers shared by every Route Handler under src/app/api.
// All responses use the same { data, error } shape.

import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types";

/** A successful response. `meta` is used by the paginated list routes. */
export function ok<T>(data: T, meta?: ApiResponse<T>["meta"]) {
  return NextResponse.json<ApiResponse<T>>({ data, error: null, ...(meta ? { meta } : {}) });
}

/** An error response. Defaults to 400 Bad Request. */
export function fail(message: string, status = 400) {
  return NextResponse.json<ApiResponse<null>>({ data: null, error: message }, { status });
}

/** Reads the JSON body, returning null if the request had no valid JSON. */
export async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json();
    return body && typeof body === "object" ? body : null;
  } catch {
    return null;
  }
}

/** Trims a field from a request body and returns "" when it is missing or not a string. */
export function text(body: Record<string, unknown>, field: string) {
  const value = body[field];
  return typeof value === "string" ? value.trim() : "";
}

/** A deliberately simple email check — enough to catch typos, not a validator. */
export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
