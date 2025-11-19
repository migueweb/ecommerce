import { NextRequest, NextResponse } from "next/server";
import { userService, type NewUser } from "@/lib/services/userService";

type CreateUserRequest = NewUser & {
  requestedBy?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreateUserRequest;
    const { requestedBy, ...rest } = body;
    const payload: NewUser = rest;

    // Example: pass a simple opts with userId to show createdBy coming from caller
    const opts = { userId: requestedBy ?? "anonymous" };

    const created = await userService.create(payload, opts);

    return NextResponse.json({ ok: true, data: created });
  } catch (err: unknown) {
    console.error("[API /api/users] Error creating user:", err);
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
