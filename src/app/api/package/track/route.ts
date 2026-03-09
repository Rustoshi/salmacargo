import { connectDb } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import Package from "@/models/package";
import ShipmentHistory from "@/models/history";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const trackingId = searchParams.get('id');

        if (!trackingId) {
            return NextResponse.json({ 
                error: 'Tracking ID is required' 
            }, { status: 400 });
        }

        await connectDb();

        // Find package with case-insensitive search
        const [package_, history] = await Promise.all([
            Package.findOne({ 
                trackingID: { $regex: new RegExp('^' + trackingId + '$', 'i') }
            })
            .select('-__v -createdAt -updatedAt -googleMapsApiKey -emailServiceApiKey')
            .lean(),
            ShipmentHistory.find({ 
                trackingID: { $regex: new RegExp('^' + trackingId + '$', 'i') }
            })
            .select('-__v')
            .sort({ createdAt: -1 })
            .lean()
        ]);

        if (!package_) {
            return NextResponse.json({ 
                error: 'Package not found' 
            }, { status: 404 });
        }

        return NextResponse.json({
            package: package_,
            history: history
        });
    } catch (error) {
        console.error('Error tracking package:', error);
        return NextResponse.json({ 
            error: 'Failed to fetch package details' 
        }, { status: 500 });
    }
}
