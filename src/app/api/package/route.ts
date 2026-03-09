
import { connectDb, geocodeAddress } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Package from "@/models/package";
import ShipmentHistory from "@/models/history";
import { IPackage } from "@/types/models";
import { generateTracking } from "@/utils";

// Get all packages with pagination and search
export async function GET(req: NextRequest) {
  try {
    // Verify admin session
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDb();

    // Get query parameters
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const search = url.searchParams.get('search') || '';

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Build search query
    const searchQuery = search ? {
      $or: [
        { trackingID: { $regex: search, $options: 'i' } },
        { senderName: { $regex: search, $options: 'i' } },
        { receiverName: { $regex: search, $options: 'i' } },
        { destinationAddress: { $regex: search, $options: 'i' } }
      ]
    } : {};

    // Get total count for pagination
    const total = await Package.countDocuments(searchQuery);

    // Get paginated and filtered packages
    const packages = await Package.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      packages,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + packages.length < total
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Create a new package
export async function POST(req: NextRequest) {
  try {
    // Verify admin session
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    // Validate required fields
    const requiredFields: (keyof IPackage)[] = [
      'senderName',
      'originAddress',
      'receiverName',
      'destinationAddress',
      'weight',
      'freight',
      'charges',
      'status',
      'expectedDeliveryDate'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    await connectDb();

    // Generate tracking ID
    const trackingID = await generateTracking();

    // Check if tracking ID already exists
    const existingPackage = await Package.findOne({ trackingID });
    if (existingPackage) {
      return NextResponse.json(
        { message: 'Tracking ID already exists' },
        { status: 400 }
      );
    }

    // Validate email formats if provided
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (body.senderEmail && !emailRegex.test(body.senderEmail)) {
      return NextResponse.json({ message: 'Invalid sender email format' }, { status: 400 });
    }
    if (body.receiverEmail && !emailRegex.test(body.receiverEmail)) {
      return NextResponse.json({ message: 'Invalid receiver email format' }, { status: 400 });
    }

    // Validate freight type
    if (!['air', 'land', 'sea'].includes(body.freight)) {
      return NextResponse.json({ message: 'Invalid freight type' }, { status: 400 });
    }

    // Validate charges
    if (isNaN(body.charges) || body.charges <= 0) {
      return NextResponse.json({ message: 'Invalid charges amount' }, { status: 400 });
    }

    // Validate expected delivery date
    const deliveryDate = new Date(body.expectedDeliveryDate);
    if (isNaN(deliveryDate.getTime()) || deliveryDate < new Date()) {
      return NextResponse.json({ message: 'Invalid expected delivery date' }, { status: 400 });
    }

    console.log(body)

    // Create new package
    const newPackage = await Package.create({
      trackingID,
      senderName: body.senderName,
      senderEmail: body.senderEmail,
      senderPhone: body.senderPhone,
      originAddress: body.originAddress,
      currentLocation: body.originAddress,
      receiverName: body.receiverName,
      receiverEmail: body.receiverEmail,
      receiverPhone: body.receiverPhone,
      destinationAddress: body.destinationAddress,
      expectedDeliveryDate: body.expectedDeliveryDate,
      weight: body.weight,
      freight: body.freight,
      charges: body.charges,
      description: body.description,
      status: 'order received',
      notes: body.notes
    });

    const geocode = await geocodeAddress(body.originAddress);
    if(!geocode){
      return NextResponse.json({ message: 'Invalid address' }, { status: 400 });
    }

    // Create initial shipment history
    const newShipmentHistory = await ShipmentHistory.create({
      trackingID,
      status: body.status,
      currentLocation: body.originAddress,
      currentCoords: geocode,
      notes: body.notes || `Package registered with tracking ID: ${trackingID}`
    });

    return NextResponse.json({
      message: 'Package created successfully',
      package: newPackage,
      history: newShipmentHistory
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating package:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
