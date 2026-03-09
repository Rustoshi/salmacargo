
import path from "path";
import PDFDocument from "pdfkit";
import fs from "fs";

export const generateReceiptPdf = async (
  trackingNumber: string,
  from: string,
  fromAddress: string,
  to: string,
  toAddress: string,
  fromEmail: string,
  toEmail: string,
  description: string,
  status: string,
  dispatchDate: string,
  deliveryDate: string,
  weight: string,
  charges: number
) => {
  return new Promise<Buffer>((resolve, reject) => {
    try {
      const fontPathRegular = path.join(process.cwd(), "src", "fonts", "roboto.ttf");
      const fontPathBold = path.join(process.cwd(), "src", "fonts", "roboto-bold.ttf");
      const logoPath = path.join(process.cwd(), "public", "logo2.png");

      if (!fs.existsSync(fontPathRegular)) {
        throw new Error(`Regular font file not found at: ${fontPathRegular}`);
      }
      if (!fs.existsSync(fontPathBold)) {
        throw new Error(`Bold font file not found at: ${fontPathBold}`);
      }
      if (!fs.existsSync(logoPath)) {
        throw new Error(`Logo file not found at: ${logoPath}`);
      }

      const doc = new PDFDocument({ margin: 40, font: fontPathRegular });
      const chunks: Buffer[] = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (error) => reject(error));

      doc.registerFont("Roboto", fontPathRegular);
      doc.registerFont("Roboto-Bold", fontPathBold);
      doc.font("Roboto");

      // Title
      doc.fontSize(20).text("Shipment Receipt", { align: "center" });
      doc.moveDown();

      // Tracking URL
      doc.fontSize(12)
        .fillColor("blue")
        .text("Visit Our Website for Live Tracking", {
          align: "center",
          link: `https://www.salmacargo.com/tracking/${trackingNumber}`
        });
      doc.moveDown(1);

      // Add logo
      doc.image(logoPath, 220, 100, { width: 150 });
      doc.moveDown(3);

      // From and To Section
      doc.fontSize(12).fillColor("black").font("Roboto-Bold").text(`From: ${from}`, 40, 230);
      doc.font("Roboto").text(`Address: ${fromAddress}`, 40, 245);
      doc.text(`${fromEmail}`, 40, 260);

      doc.font("Roboto-Bold").text(`To: ${to}`, 400, 230);
      doc.font("Roboto").text(`Address: ${toAddress}`, 400, 245);
      doc.text(`${toEmail}`, 400, 260);

      doc.moveDown(2);

      // Created Date & Time
      const now = new Date();
      doc.font("Roboto").text(`Dispatch Date: ${dispatchDate}`, 40, 280);

      doc.moveDown(1);

      // Shipment Details Table Setup
      const tableX = 40;
      const tableY = 300;
      const tableWidth = 520;
      const headerHeight = 25;
      const rowHeight = 20;

      // Draw table header background
      doc.rect(tableX, tableY, tableWidth, headerHeight)
        .fillAndStroke("#F0F0F0", "black");
      doc.fillColor("black")
        .font("Roboto-Bold")
        .fontSize(12)
        .text("Shipment Details", tableX + 10, tableY + 7);

      // Table rows data
      const details = [
        ["Tracking Number", trackingNumber],
        ["Parcel Description", description],
        ["Courier Status", status],
        ["Dispatch Date", dispatchDate],
        ["Estimated Delivery Date", deliveryDate],
        ["Declared Weight", `${weight} KG`],
        ["Courier Fee", `$${charges.toLocaleString()}`],
      ];

      // Start below the header with a bit of margin
      let currentY = tableY + headerHeight + 5;
      doc.font("Roboto").fontSize(10);
      details.forEach(([key, value], index) => {
        // Alternate row shading for even rows
        if (index % 2 === 0) {
          doc.rect(tableX, currentY - 2, tableWidth, rowHeight)
            .fill("#EAEAEA")
            .stroke();
        }
        doc.fillColor("black").text(key, tableX + 10, currentY);
        doc.text(value, tableX + 260, currentY);
        currentY += rowHeight;
      });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
