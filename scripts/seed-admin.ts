import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '@/models/user';

dotenv.config();

async function seedAdmin() {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        console.error('MONGO_URI is not defined in .env file');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const adminEmail = 'admin@salmafreight.com';
        const adminPassword = '@Newpass12'; // In a real scenario, use a secure password
        const adminUsername = 'admin';

        const existingAdmin = await User.findOne({
            $or: [
                { email: adminEmail },
                { username: adminUsername }
            ]
        });

        if (existingAdmin) {
            console.log('Admin user already exists with this email or username:');
            console.log('Username:', existingAdmin.username);
            console.log('Email:', existingAdmin.email);
            console.log('Current Role:', existingAdmin.role);

            if (existingAdmin.role !== 'admin' || true) { // Always update password if script is run
                console.log('Updating admin details...');
                const hashedPassword = await bcrypt.hash(adminPassword, 12);
                existingAdmin.password = hashedPassword;
                existingAdmin.role = 'admin';
                await existingAdmin.save();
                console.log('Admin details updated successfully');
            }
        } else {
            const hashedPassword = await bcrypt.hash(adminPassword, 12);

            await User.create({
                username: adminUsername,
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
            });

            console.log('Admin user created successfully');
            console.log('Email:', adminEmail);
            console.log('Password:', adminPassword);
        }

    } catch (error) {
        console.error('Error seeding admin:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        process.exit(0);
    }
}

seedAdmin();
