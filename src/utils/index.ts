import mongoose from "mongoose";
import * as fetch from 'node-fetch'

export async function generateTracking(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'SAL';
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


export async function connectDb(){
    try{
        if (mongoose.connections[0].readyState) {
            // If we have an existing connection, return it
            return mongoose.connection;
        }
        const connection = await mongoose.connect(process.env.MONGO_URI!);
        console.log('MongoDB connected');
        return connection;
    }catch(error:any){
        console.error('MongoDB connection error:', error);
        throw error; // Re-throw the error for better error handling
    }
}


export async function geocodeAddress(address:string){
    try{
        const req = await fetch.default(`https://geocode.maps.co/search?q=${address}&api_key=${process.env.GEOCODE_API}`);
        const res:any = await req.json();
        if(res.length > 0){
            return [res[0].lat, res[0].lon];
        }
        return null;
    }catch(error:any){
        console.log('error generating geocode');
        throw error;
    }
}