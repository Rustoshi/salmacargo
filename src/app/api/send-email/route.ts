import { render } from "@react-email/render";
import { NextResponse } from "next/server";
import axios from "axios";
import ShippedEmail from "@/emails/ShippedEmail";
import ArrivedEmail from "@/emails/ArrivedEmail";
import CancelledEmail from "@/emails/CancelledEmail";
import DamagedEmail from "@/emails/DamagedEmail";
import OnHoldEmail from "@/emails/OnHoldEmail";

export async function POST(req: Request) {
  try {
    const { email, name, type, trackingNumber } = await req.json();

    let EmailComponent;
    let subject;

    switch (type) {
      case "in transit":
        EmailComponent = ShippedEmail;
        subject = "📦 Your Package Has Been Shipped!";
        break;
      case "delivered":
        EmailComponent = ArrivedEmail;
        subject = "✅ Your Package Has Arrived!";
        break;
      case "on hold":
        EmailComponent = OnHoldEmail;
        subject = "📦 Your Package Is On Hold";
        break;
      case "damaged":
        EmailComponent = DamagedEmail;
        subject = "❌ Your Package Was Damaged";
        break;
      case "cancelled":
        EmailComponent = CancelledEmail;
        subject = "❌ Your Package Has Been Cancelled";
        break;
      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 });
    }

    const html = await render(EmailComponent({ name, trackingNumber }));

    const response = await axios.post("https://api.resend.com/emails", {
      from: "Salma Freight <noreply@salmafreight.com>",
      to: [email],
      subject,
      html,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
