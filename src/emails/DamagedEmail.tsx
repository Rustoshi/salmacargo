import * as React from "react";
import { Html, Head, Preview, Body, Container, Section, Text, Link, Img } from "@react-email/components";

export default function DamagedEmail({ name, trackingNumber }: { name: string; trackingNumber: string }) {
  return (
    <Html>
      <Head />
      <Preview>There was an issue with your package.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.content}>
            <Text style={styles.heading}>⚠️ Your Package Was Damaged</Text>
            <Text>Hello {name},</Text>
            <Text>
              We regret to inform you that your package sustained damage during transit. Our team is currently reviewing the situation.
            </Text>
            <Text>If you need assistance or a replacement, please contact our support team.</Text>
            <Text style={styles.tracking}>
              📍 <strong>{trackingNumber}</strong>
            </Text>
            <Text>
              We sincerely apologize for the inconvenience and appreciate your patience.
            </Text>
            <Text>Thank you for choosing Salma Cargo.</Text>
            <Text style={styles.supportMessage}>
              If you have any questions or need help, please email us at{" "}
              <Link href="mailto:info@salmacargo.com" style={{ color: "#007bff", textDecoration: "none" }}>
                info@salmacargo.com
              </Link>{" "}
              or chat with our customer support on our{" "}
              <Link href="https://www.salmacargo.com" style={{ color: "#007bff", textDecoration: "none" }}>
                website
              </Link>.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles: any = {
  body: { backgroundColor: "#f4f4f4", padding: "20px" },
  container: { backgroundColor: "#fff", padding: "20px", borderRadius: "8px" },
  content: { textAlign: "center" as const },
  heading: { fontSize: "24px", fontWeight: "bold", marginBottom: "10px", color: "#d9534f" },
  tracking: { fontSize: "20px", fontWeight: "bold", color: "#d9534f", margin: "10px 0" },
  supportMessage: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#555",
    lineHeight: "1.4"
  },
};
