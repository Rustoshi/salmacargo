export const config = { runtime: 'nodejs' };

import crypto from 'crypto';

// Ensure globalThis.crypto exists
if (!globalThis.crypto) {
  (globalThis as any).crypto = {};
}

// Cast globalThis.crypto as any to assign SHA224
if (!(globalThis as any).crypto.SHA224) {
  (globalThis as any).crypto.SHA224 = function (data: Buffer | string) {
    return crypto.createHash('sha224').update(data).digest();
  };
}


import { connectDb, geocodeAddress } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Package from "@/models/package";
import ShipmentHistory from "@/models/history";
import { sendEmail } from "@/utils/sendEmail";
import { generateReceiptPdf } from "@/utils/generatePdf";

export async function PUT(req: NextRequest) {
    try {
        // Verify admin session
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const {
            trackingID,
            status,
            currentLocation,
            notes
        } = await req.json();

        // Validate required fields
        if (!trackingID || !status || !currentLocation) {
            return NextResponse.json({ 
                message: 'Tracking ID, status, and current location are required' 
            }, { status: 400 });
        }

        // Validate status
        const validStatuses = [ 'order received', 'in transit', 'on hold', 'delivered', 'damaged'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ 
                message: 'Invalid status value' 
            }, { status: 400 });
        }

        await connectDb();

        // Find and update package
        const package_ = await Package.findOne({ trackingID });
        if (!package_) {
            return NextResponse.json({ 
                message: 'Package not found' 
            }, { status: 404 });
        }

        // Update package status and location
        package_.status = status;
        package_.currentLocation = currentLocation;
        await package_.save();

        const geocode = await geocodeAddress(currentLocation);
        if(!geocode){
          return NextResponse.json({ message: 'Invalid address' }, { status: 400 });
        }

        // Create history entry
        const history = await ShipmentHistory.create({
            trackingID,
            status,
            currentLocation,
            currentCoords: geocode,
            notes: notes || `Package ${status} at ${currentLocation}`
        });

        // send email notification for transit, delivered and cancelled
        // check if transit is already created to avoid mutiple duplicates
        if (status.toLowerCase() == 'in transit') {
            // Generate PDF in memory
            const pdfBuffer = await generateReceiptPdf(
                package_.trackingID,
                package_.senderName,
                package_.originAddress,
                package_.receiverName,
                package_.destinationAddress,
                package_.senderEmail,
                package_.receiverEmail,
                package_.description,
                'Shipped',
                package_.createdAt.toDateString(),
                package_.expectedDeliveryDate.toDateString(),
                package_.weight,
                package_.charges
            );
            
            await sendEmail({
                email: package_.receiverEmail,
                name: package_.receiverName,
                type: 'shipped',
                trackingNumber: package_.trackingID,
                pdfBuffer
            });
        }
        
        if (status.toLowerCase() == 'delivered') {
            await sendEmail({
                email: package_.receiverEmail,
                name: package_.receiverName,
                type: 'arrived',
                trackingNumber: package_.trackingID
            });
        }

        if (status.toLowerCase() == 'damaged') {
            await sendEmail({
                email: package_.receiverEmail,
                name: package_.receiverName,
                type: 'damaged',
                trackingNumber: package_.trackingID
            });
        }

        if (status.toLowerCase() == 'on hold') {
            await sendEmail({
                email: package_.receiverEmail,
                name: package_.receiverName,
                type: 'on hold',
                trackingNumber: package_.trackingID
            });
        }


        return NextResponse.json({
            message: 'Package updated successfully',
            package: package_,
            history: history
        });
    } catch (error) {
        console.error('Error updating package:', error);
        return NextResponse.json({ 
            message: 'Internal server error' 
        }, { status: 500 });
    }
}
