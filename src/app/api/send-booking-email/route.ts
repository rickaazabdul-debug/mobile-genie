import { NextResponse } from "next/server";
import { Resend } from "resend";

const ADMIN_EMAIL = "rickaazabdul@gmail.com";

interface BookingEmailBody {
  ticketCode: string;
  customerName: string;
  email: string;
  phone: string;
  brand: string;
  model: string;
  issue: string;
  partTier: string;
  warranty: string;
  serviceMode: string;
  colomboZone: string;
  date: string;
  slot: string;
  estimatedTotalLkr: number;
  trackingUrl?: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "RESEND_API_KEY is not configured." },
      { status: 500 }
    );
  }

  try {
    const body = (await request.json()) as BookingEmailBody;
    const resend = new Resend(apiKey);

    const fromAddress =
      process.env.RESEND_FROM_EMAIL || "Mobile Genie <onboarding@resend.dev>";
    const trackLink =
      body.trackingUrl ||
      `https://mobilegenie.lk/track?ticket=${encodeURIComponent(body.ticketCode)}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
        <div style="background: #E31E24; color: #ffffff; padding: 20px 24px;">
          <h1 style="margin: 0; font-size: 20px;">Mobile Genie — Booking Receipt</h1>
          <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">Time Matters — Fix it fast, Fix it Right!</p>
        </div>
        <div style="padding: 24px;">
          <p style="margin: 0 0 12px; font-size: 14px;">Hi <strong>${body.customerName}</strong>,</p>
          <p style="margin: 0 0 16px; font-size: 14px;">Your mobile repair appointment is confirmed. Your unique ticket ID is:</p>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px 16px; font-family: monospace; font-size: 18px; font-weight: bold; color: #E31E24; text-align: center;">
            ${body.ticketCode}
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-top: 18px; font-size: 13px;">
            <tr><td style="padding: 6px 0; color: #64748b;">Device</td><td style="padding: 6px 0; font-weight: bold;">${body.brand} ${body.model}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Repair Issue</td><td style="padding: 6px 0; font-weight: bold;">${body.issue}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Part Tier &amp; Warranty</td><td style="padding: 6px 0; font-weight: bold;">${body.partTier} (${body.warranty})</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Service Mode</td><td style="padding: 6px 0; font-weight: bold;">${body.serviceMode} • ${body.colomboZone}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Date &amp; Time Slot</td><td style="padding: 6px 0; font-weight: bold; color: #1D8FE1;">${body.date} • ${body.slot}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Phone</td><td style="padding: 6px 0;">${body.phone}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Estimated Total</td><td style="padding: 6px 0; font-weight: bold;">From LKR ${Number(body.estimatedTotalLkr).toLocaleString("en-LK")}</td></tr>
          </table>
          <div style="margin-top: 22px; text-align: center;">
            <a href="${trackLink}" style="display: inline-block; background: #1D8FE1; color: #ffffff; text-decoration: none; padding: 12px 22px; border-radius: 10px; font-size: 13px; font-weight: bold;">
              Track Live Status / Reschedule Ticket
            </a>
          </div>
        </div>
      </div>
    `;

    // Always notify shop admin; also send to customer if different
    const recipients = [ADMIN_EMAIL];
    if (body.email && body.email.toLowerCase() !== ADMIN_EMAIL) {
      recipients.push(body.email);
    }

    const results = await Promise.allSettled(
      recipients.map((to) =>
        resend.emails.send({
          from: fromAddress,
          to,
          subject: `[Mobile Genie] Repair Ticket ${body.ticketCode} — ${body.brand} ${body.model}`,
          html,
        })
      )
    );

    const anySucceeded = results.some(
      (r) => r.status === "fulfilled" && !r.value.error
    );

    return NextResponse.json({ sent: anySucceeded });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to send booking email.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
