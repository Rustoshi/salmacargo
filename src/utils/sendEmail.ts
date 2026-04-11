import { render } from "@react-email/render";
import axios from "axios";
import ShippedEmail from "@/emails/ShippedEmail";
import ArrivedEmail from "@/emails/ArrivedEmail";
import CancelledEmail from "@/emails/CancelledEmail";
import DamagedEmail from "@/emails/DamagedEmail";
import OnHoldEmail from "@/emails/OnHoldEmail";

export async function sendEmail({ email, name, type, trackingNumber, pdfBuffer }: {
  email: string;
  name: string;
  type: 'shipped' | 'arrived' | 'damaged' | 'on hold';
  trackingNumber: string;
  pdfBuffer?: Buffer
}) {
  try {
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
      case "on hold":
        EmailComponent = OnHoldEmail;
        subject = "📦 Your Package Is On Hold";
        break;
      case "damaged":
        EmailComponent = DamagedEmail;
        subject = "❌ Your Package Was Damaged";
        break;
      default:
        throw new Error("Invalid email type");
    }

    const html = await render(EmailComponent({ name, trackingNumber }));

    const payload: any = {
      from: "Salma Freight <noreply@salmafreight.com>",
      to: [email],
      subject,
      html,
    };

    if (type === 'shipped' && pdfBuffer) {
      payload.attachments = [
        {
          filename: `Shipment_Receipt_${trackingNumber}.pdf`,
          content: pdfBuffer.toString("base64"),
        }
      ];
    }

    const response = await axios.post("https://api.resend.com/emails", payload, {
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return { success: true, data: response.data };
  } catch (error: any) {
    console.log(error)
    return { error: error.message };
  }
}
