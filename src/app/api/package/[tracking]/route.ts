import Package from "@/models/package";
import { connectDb } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

interface params {
    tracking: string
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<any> }
) {
    try {
        const resolvedParams = await params;
        await connectDb();
        const packageItem = await Package.findOne({ trackingID: resolvedParams.tracking });
        if (packageItem) {
            return NextResponse.json({ packageItem });
        }
        return NextResponse.json({ message: 'package not found' }, { status: 404 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            message: 'Internal server error'
        }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest, { params }: { params: Promise<any> }
) {
    try {
        const _params = await params;
        await connectDb();
        const packageItem = await Package.findOne({ trackingID: _params.tracking });
        const {
            senderName,
            senderEmail,
            senderPhone,
            originAddress,
            receiverName,
            receiverEmail,
            receiverPhone,
            destinationAddress,
            expectedDeliveryDate,
            weight,
            freight,
            charges,
            description
        } = await req.json();

        if (!packageItem) {
            return NextResponse.json({ message: 'package not found' }, { status: 404 });
        }

        // Validate required fields
        if (!senderName || !originAddress || !receiverName || !destinationAddress || !weight || !freight || !charges || !expectedDeliveryDate) {
            return NextResponse.json({ message: 'Required fields are missing' }, { status: 400 });
        }

        // Validate email formats if provided
        if (senderEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
            return NextResponse.json({ message: 'Invalid sender email format' }, { status: 400 });
        }
        if (receiverEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(receiverEmail)) {
            return NextResponse.json({ message: 'Invalid receiver email format' }, { status: 400 });
        }

        // Validate numeric fields
        if (isNaN(Number(charges)) || Number(charges) <= 0) {
            return NextResponse.json({ message: 'Charges must be a positive number' }, { status: 400 });
        }

        // Validate delivery date is in the future
        const deliveryDate = new Date(expectedDeliveryDate);
        if (deliveryDate < new Date()) {
            return NextResponse.json({ message: 'Expected delivery date must be in the future' }, { status: 400 });
        }

        // Update package with validated data
        Object.assign(packageItem, {
            senderName,
            senderEmail,
            senderPhone,
            originAddress,
            receiverName,
            receiverEmail,
            receiverPhone,
            destinationAddress,
            expectedDeliveryDate,
            weight,
            freight,
            charges,
            description
        });

        await packageItem.save();
        return NextResponse.json({ packageItem });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            message: 'Internal server error'
        }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<any> }
) {
    try {
        const resolvedParams = await params;
        await connectDb();
        const result = await Package.findOneAndDelete({ trackingID: resolvedParams.tracking });

        if (result) {
            return NextResponse.json({ message: 'Package deleted successfully' });
        }
        return NextResponse.json({ message: 'Package not found' }, { status: 404 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            message: 'Internal server error'
        }, { status: 500 });
    }
}
