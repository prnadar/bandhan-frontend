import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const RESEND_KEY = process.env.RESEND_API_KEY!;

// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP in Supabase (use a simple table or metadata)
    // We'll store in a temporary table approach using Supabase
    const { error: storeError } = await supabaseAdmin
      .from("otp_codes")
      .upsert({
        email: email.toLowerCase(),
        code: otp,
        expires_at: expiresAt.toISOString(),
        used: false,
      }, { onConflict: "email" });

    if (storeError) {
      console.error("Store OTP error:", storeError);
      // Continue even if storage fails — still send email
    }

    // Send OTP via Resend
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Match4Marriage <onboarding@resend.dev>",
        to: [email],
        subject: "Your Match4Marriage verification code",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #fdfbf9;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="font-family: Georgia, serif; color: #1a0a14; font-size: 28px; margin: 0;">
                Match<span style="color: #dc1e3c;">4</span>Marriage
              </h1>
            </div>
            <div style="background: #fff; border-radius: 16px; padding: 32px; border: 1px solid rgba(220,30,60,0.1);">
              <h2 style="color: #1a0a14; font-size: 20px; margin: 0 0 8px;">Welcome${name ? `, ${name.split(" ")[0]}` : ""}! 💍</h2>
              <p style="color: #666; font-size: 14px; margin: 0 0 24px;">Your verification code is:</p>
              <div style="background: #1a0a14; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
                <span style="font-size: 40px; font-weight: 700; letter-spacing: 12px; color: #fff;">${otp}</span>
              </div>
              <p style="color: #888; font-size: 13px; margin: 0;">This code expires in <strong>10 minutes</strong>. Do not share it with anyone.</p>
            </div>
            <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 24px;">
              © ${new Date().getFullYear()} Match4Marriage Limited · United Kingdom
            </p>
          </div>
        `,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend error:", data);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("send-otp error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
