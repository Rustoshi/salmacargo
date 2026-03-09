import { IPackage } from '@/types/models';
import {model, models, Schema} from 'mongoose'

const PackageSchema = new Schema<IPackage>({
    trackingID: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    senderName: {
        type: String,
        required: true
    },
    senderEmail: {
        type: String,
        trim: true,
        lowercase: true
    },
    senderPhone: String,
    originAddress: {
        type: String,
        required: true
    },
    currentLocation: {
        type: String,
        required: true
    },
    receiverName: {
        type: String,
        required: true
    },
    receiverEmail: {
        type: String,
        trim: true,
        lowercase: true
    },
    receiverPhone: String,
    destinationAddress: {
        type: String,
        required: true
    },
    expectedDeliveryDate: {
        type: Date,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    freight: {
        type: String,
        enum: ['air', 'land', 'sea'],
        required: true
    },
    description: String,
    charges: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: [ 'order received', 'in transit', 'on hold', 'delivered', 'damaged'],
        default: 'order received',
        required: true
    }
}, {
    timestamps: true
})

// Create indexes for frequently queried fields
PackageSchema.index({ status: 1 });
PackageSchema.index({ updatedAt: -1 });

const Package = models.Package || model<IPackage>('Package', PackageSchema);
export default Package;