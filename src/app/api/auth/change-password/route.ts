import bcrypt from 'bcryptjs'
import User from "@/models/user";
import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/utils';

export async function PUT(req:NextRequest){
    try{
        const {password, userId} = await req.json();
        const user = await User.findById(userId);
        if(!user){
            return NextResponse.json({message: 'user not found'}, {status: 404})
        }
        if(password.length < 6){
            return NextResponse.json({message: 'password is too short!'}, {status: 400})
        }
        await connectDb();
        const salt = await bcrypt.genSalt(Number(process.env.bcrypt_round));
        const hash = await bcrypt.hash(password, salt);
        user.password = hash;
        await user.save();
        return NextResponse.json({message: 'password changed successfully'}, {status: 200})
    }catch(error:any){
        console.log(error);
        return NextResponse.json({message: 'Internal server error'}, {status: 500})
    }
}