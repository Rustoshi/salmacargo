import mongoose from "mongoose";
import * as fetch from 'node-fetch'

export async function generateTracking() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'SAL';
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


export async function connectDb() {
    try {
        if (mongoose.connections[0].readyState) {
            // If we have an existing connection, return it
            return mongoose.connection;
        }
        const connection = await mongoose.connect(process.env.MONGO_URI!);
        console.log('MongoDB connected');
        return connection;
    } catch (error: any) {
        console.error('MongoDB connection error:', error);
        throw error; // Re-throw the error for better error handling
    }
}


export async function geocodeAddress(address: string) {
    try {
        if (!process.env.GEOCODE_API || process.env.GEOCODE_API === 'your_geocode_api_key_here') {
            console.warn('GEOCODE_API key is missing or invalid in .env. Falling back to default coordinates.');
            return [0.0, 0.0];
        }

        const encodedAddress = encodeURIComponent(address);
        const url = `https://geocode.maps.co/search?q=${encodedAddress}&api_key=${process.env.GEOCODE_API}`;

        const req = await fetch.default(url);

        if (!req.ok) {
            const errorText = await req.text();
            console.error(`Geocoding API error (${req.status}): ${errorText}`);
            return [0.0, 0.0];
        }

        const res: any = await req.json();
        if (Array.isArray(res) && res.length > 0) {
            return [parseFloat(res[0].lat), parseFloat(res[0].lon)];
        }

        console.warn(`No geocoding results found for address: ${address}`);
        return [0.0, 0.0];
    } catch (error: any) {
        console.error('Error during geocoding process:', error.message);
        return [0.0, 0.0];
    }
}