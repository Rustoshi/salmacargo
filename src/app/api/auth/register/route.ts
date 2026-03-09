import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import User from "@/models/user";
import { connectDb } from "@/utils";

export async function POST(req:NextRequest){
    try{
        const {username, email, password} = await req.json();
        if(!username || !email || !password){
            return NextResponse.json({message: 'please provide required fields!'}, {status: 400});
        }
        if(password.length < 6){
            return NextResponse.json({message: 'password is too short!'}, {status: 400});
        }

        await connectDb();
        const userExists = await User.findOne({$or:[{email}, {username}]});
        if(userExists){
            return NextResponse.json({message:"user with that email or username already exists"}, {status: 400})
        }
        const salt = await bcrypt.genSalt(Number(process.env.bcrypt_round));
        const hash = await bcrypt.hash(password, salt);
        const user = await User.create({
            username,
            email,
            password: hash
        });

        return NextResponse.json({user});
    }catch(error:any){
        console.log(error);
        return NextResponse.json({
            message: 'Internal server error'
        }, {status: 500});
    }
}