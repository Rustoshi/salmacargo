import { NextRequest, NextResponse } from "next/server";
import Package from "@/models/package";
import ShipmentHistory from "@/models/history";
import { connectDb } from "@/utils";

interface params{
    tracking: string
}

export async function GET(req:NextRequest,_:any,{params}:{params: any}){
    try{
        await connectDb();
        const shipmentHistory = await ShipmentHistory.find({trackingID: params.tracking});
        if(shipmentHistory){
            return NextResponse.json({shipmentHistory});
        }
        return NextResponse.json({message: 'package not found'}, {status: 404});
    }catch(error:any){
        console.log(error);
        return NextResponse.json({
            message: 'Internal server error'
        }, {status: 500});
    }
}

export async function POST(req:NextRequest, _:any, {params}:{params:any}){
    try{
        const {
            status,
            notes,
            currentLocation
        } = await req.json();

        if(!status || !notes || !currentLocation){
            return NextResponse.json({message: 'All fields are required'}, {status: 400});
        }
        await connectDb();
        const newShipmentHistory = await ShipmentHistory.create({
            trackingID: params.tracking,
            status,
            currentLocation,
            notes
        });

        await Package.updateOne({trackingID: params.tracking}, {
            status
        });

        return NextResponse.json({newShipmentHistory});
    }catch(error:any){
        console.log(error);
        return NextResponse.json({
            message: 'Internal server error'
        }, {status: 500})
    }
}


export async function PUT(req:NextRequest){
    try{
        const {
            id,
            status,
            notes,
            currentLocation
        } = await req.json();
        await connectDb();
        const shipmentHistory = await ShipmentHistory.findById(id);
        if(shipmentHistory){
            shipmentHistory.status = status;
            shipmentHistory.notes = notes;
            shipmentHistory.currentLocation = currentLocation;
            await shipmentHistory.save();
            return NextResponse.json({shipmentHistory});
        }
        return NextResponse.json({message: 'history not found'}, {status: 404});
    }catch(error:any){
        console.log(error);
        return NextResponse.json({
            message: 'Internal server error'
        }, {status: 500})
    }
}

export async function DELETE(req:NextRequest, { params }: any){
    try{
        await connectDb();
        await ShipmentHistory.findOneAndDelete({_id: params.tracking});
        return NextResponse.json({message:"history delete successfully"});
    }
    catch(error:any){
        console.log(error);
        return NextResponse.json({
            message: 'Internal server error'
        }, {status: 500})   
    }
}