import { NextResponse } from "next/server";
import { checkInvoicesOnExpiration } from "@/actions/superAdmin/superAdminBillingModule/check-invoices-on-expiration";

export async function GET() {
  checkInvoicesOnExpiration();
  return NextResponse.json({ ok: true });
}
