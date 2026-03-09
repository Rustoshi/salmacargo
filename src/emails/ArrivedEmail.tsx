import * as React from "react";
import { Html, Head, Preview, Body, Container, Section, Text, Link, Img } from "@react-email/components";

export default function ArrivedEmail({ name, trackingNumber }: { name: string; trackingNumber: string }) {
  return (
    <Html>
      <Head />
      <Preview>Your package has arrived! Pick it up now.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.content}>
            <Text style={styles.heading}>✅ Your Package Has Arrived!</Text>
            <Text>Hello {name},</Text>
            <Text>Your package has arrived! Please collect it at the designated pickup location.</Text>
            <Text style={styles.tracking}>
              📍 <strong>{trackingNumber}</strong>
            </Text>
            <Link href={`https://www.salmacargo.com/tracking/${trackingNumber}`} style={styles.button}>
              View Pickup Details
            </Link>
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
  header: { textAlign: "center", marginBottom: "20px" },
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
  supportMessage: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#555",
    lineHeight: "1.4",
  },
};
