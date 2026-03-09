import { connectDb } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Package from "@/models/package";

export async function PUT(req: NextRequest) {
    try {
        // Verify admin session
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { trackingID, ...updateData } = body;

        // Validate required fields
        const requiredFields = [
            'senderName',
            'originAddress',
            'receiverName',
            'destinationAddress',
            'weight',
            'freight',
            'charges',
            'expectedDeliveryDate'
        ];

        for (const field of requiredFields) {
            if (!updateData[field]) {
                return NextResponse.json(
                    { message: `${field} is required` },
                    { status: 400 }
                );
            }
        }

        // Validate email formats if provided
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (updateData.senderEmail && !emailRegex.test(updateData.senderEmail)) {
            return NextResponse.json({ message: 'Invalid sender email format' }, { status: 400 });
        }
        if (updateData.receiverEmail && !emailRegex.test(updateData.receiverEmail)) {
            return NextResponse.json({ message: 'Invalid receiver email format' }, { status: 400 });
        }

        // Validate freight type
        if (!['air', 'land', 'sea'].includes(updateData.freight)) {
            return NextResponse.json({ message: 'Invalid freight type' }, { status: 400 });
        }

        // Validate charges
        if (isNaN(updateData.charges) || updateData.charges <= 0) {
            return NextResponse.json({ message: 'Invalid charges amount' }, { status: 400 });
        }

        // Validate expected delivery date
        const deliveryDate = new Date(updateData.expectedDeliveryDate);
        if (isNaN(deliveryDate.getTime())) {
            return NextResponse.json({ message: 'Invalid expected delivery date' }, { status: 400 });
        }

        await connectDb();

        // Find and update package
        const package_ = await Package.findOne({ trackingID });
        if (!package_) {
            return NextResponse.json({ message: 'Package not found' }, { status: 404 });
        }

        // Update package details
        Object.assign(package_, updateData);
        await package_.save();

        return NextResponse.json({
            message: 'Package details updated successfully',
            package: package_
        });
    } catch (error) {
        console.error('Error updating package details:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
