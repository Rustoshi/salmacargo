import * as React from "react";
import { Html, Head, Preview, Body, Container, Section, Text, Img } from "@react-email/components";

export default function CancelledEmail({ name, trackingNumber }: { name: string; trackingNumber: string }) {
  return (
    <Html>
      <Head />
      <Preview>Your package has been cancelled.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.content}>
            <Text style={styles.heading}>❌ Your Package Has Been Cancelled</Text>
            <Text>Hello {name},</Text>
            <Text>Unfortunately, your package delivery has been cancelled. If this was unexpected, please contact support.</Text>
            <Text style={styles.tracking}>📍 <strong>{trackingNumber}</strong></Text>
            <Text>Thank you for choosing Salma Cargo.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles:any = {
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
};
