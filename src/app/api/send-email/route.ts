import { render } from "@react-email/render";
import { NextResponse } from "next/server";
import axios from "axios";
import ShippedEmail from "@/emails/ShippedEmail";
import ArrivedEmail from "@/emails/ArrivedEmail";
import CancelledEmail from "@/emails/CancelledEmail";

export async function POST(req: Request) {
  try {
    const { email, name, type, trackingNumber } = await req.json();

    let EmailComponent;
    let subject;

    switch (type) {
      case "shipped":
        EmailComponent = ShippedEmail;
        subject = "📦 Your Package Has Been Shipped!";
        break;
      case "arrived":
        EmailComponent = ArrivedEmail;
        subject = "✅ Your Package Has Arrived!";
        break;
      case "cancelled":
        EmailComponent = CancelledEmail;
        subject = "❌ Your Package Has Been Cancelled";
        break;
      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 });
    }

    const html = await render(EmailComponent({ name, trackingNumber }));

    const response = await axios.post("https://www.unosend.co/api/v1/emails", {
      from: "Salma Cargo <noreply@salmacargo.com>",
      to: [email],
      subject,
      html,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.UNOSEND_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
