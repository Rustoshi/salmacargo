import * as React from "react";
import { Html, Head, Preview, Body, Container, Section, Text, Link, Img } from "@react-email/components";

export default function OnHoldEmail({ name, trackingNumber }: { name: string; trackingNumber: string }) {
  return (
    <Html>
      <Head />
      <Preview>Your package is on hold. Please check for further instructions.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.content}>
            <Text style={styles.heading}>📌 Your Package Is On Hold</Text>
            <Text>Hello {name},</Text>
            <Text>
              Your package is currently on hold pending further verification or instructions. If this is unexpected or if you need further assistance,
              please contact our support team.
            </Text>
            <Text style={styles.tracking}>
              📍 <strong>{trackingNumber}</strong>
            </Text>
            <Link href={`https://www.salmacargo.com/tracking/${trackingNumber}`} style={styles.button}>
              View Package Status
            </Link>
            <Text>
              If you have any questions or need help, please email us at{" "}
              <Link href="mailto:info@salmacargo.com" style={{ color: "#007bff", textDecoration: "none" }}>
                info@salmacargo.com
              </Link>{" "}
              or chat with our customer support on our{" "}
              <Link href="https://www.salmacargo.com" style={{ color: "#007bff", textDecoration: "none" }}>
                website
              </Link>.
            </Text>
            <Text>Thank you for choosing Salma Cargo.</Text>
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
  heading: { fontSize: "24px", fontWeight: "bold", marginBottom: "10px" },
  tracking: { fontSize: "20px", fontWeight: "bold", color: "#007bff", margin: "10px 0" },
  button: {
    display: "inline-block",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    marginTop: "10px",
  },
};
