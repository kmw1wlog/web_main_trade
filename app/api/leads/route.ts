import { NextResponse } from "next/server";
import { validateLeadPayload } from "@/lib/leadSchema";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = validateLeadPayload(body);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: result.message },
      { status: 400 },
    );
  }

  if (result.payload.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.payload),
      });
    } catch (error) {
      console.error("[leads:webhook_error]", error);
    }
  } else {
    console.info("[leads]", {
      type: result.payload.type,
      email: result.payload.email,
      phone: result.payload.phone,
      interests: result.payload.interests,
      productInterest: result.payload.productInterest,
      marketingConsent: result.payload.marketingConsent,
      createdAt: result.payload.createdAt,
    });
  }

  return NextResponse.json({ ok: true });
}
