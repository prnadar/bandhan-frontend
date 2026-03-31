import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { email, code, password, name, gender } = await req.json();
    if (!email || !code) return NextResponse.json({ error: "Email and code required" }, { status: 400 });

    // Verify OTP
    const { data: otpData, error: otpError } = await supabaseAdmin
      .from("otp_codes")
      .select("*")
      .eq("email", email.toLowerCase())
      .eq("code", code)
      .eq("used", false)
      .single();

    if (otpError || !otpData) {
      return NextResponse.json({ error: "Invalid or expired code. Please try again." }, { status: 400 });
    }

    // Check expiry
    if (new Date(otpData.expires_at) < new Date()) {
      return NextResponse.json({ error: "Code has expired. Please register again." }, { status: 400 });
    }

    // Mark OTP as used
    await supabaseAdmin.from("otp_codes").update({ used: true }).eq("email", email.toLowerCase());

    // Create user in Supabase Auth (admin — bypasses email confirmation)
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm since we verified OTP ourselves
      user_metadata: { full_name: name, gender },
    });

    if (userError) {
      // User might already exist — try to sign them in
      if (userError.message.includes("already")) {
        const { data: signInData, error: signInError } = await supabaseAdmin.auth.admin.generateLink({
          type: "magiclink",
          email,
        });
        if (signInError) return NextResponse.json({ error: signInError.message }, { status: 400 });
        return NextResponse.json({ success: true, action_link: signInData.properties?.action_link });
      }
      return NextResponse.json({ error: userError.message }, { status: 400 });
    }

    // Generate session for immediate login
    const { data: sessionData } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email,
    });

    return NextResponse.json({
      success: true,
      user_id: userData.user?.id,
      action_link: sessionData?.properties?.action_link,
    });

  } catch (err) {
    console.error("verify-otp error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
