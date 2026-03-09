import Site from "@/models/site";
import { connectDb } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try{
        await connectDb();
        const site = await Site.findOne({}) || {};
        return NextResponse.json({site});
    }catch(error:any){
        console.log(error);
        return NextResponse.json({
            message: 'Internal server error'
        }, {status: 500})
    }
}

export async function POST(req:NextRequest){
    try{
        const {
            siteName,
            address,
            phone,
            email
        } = await req.json();

        // Validate required fields
        if (!siteName?.trim() || !address?.trim() || !email?.trim()) {
            return NextResponse.json({ message: 'Site name, address, and email are required' }, { status: 400 });
        }

        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ message: 'Please enter a valid email address' }, { status: 400 });
        }

        await connectDb();
        await Site.findOneAndUpdate({}, {
            siteName,
            address,
            phone: phone || '', // Handle optional phone
            email
        }, {
            upsert: true,
            new: true
        });
        return NextResponse.json({message: 'site updated successfully'});
    }catch(error:any){
        console.log(error);
        return NextResponse.json({
            message: 'Internal server error'
        }, {status: 500})
    }
}