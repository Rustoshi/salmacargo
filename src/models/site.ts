import { ISite } from '@/types/models';
import { model, models, Schema } from 'mongoose';

const siteSchema = new Schema<ISite>({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    minlength: [2, 'Company name must be at least 2 characters long'],
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  companyEmail: {
    type: String,
    required: [true, 'Company email is required'],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  companyPhone: {
    type: String,
    required: false,
    trim: true
  },
  companyAddress: {
    type: String,
    required: [true, 'Company address is required'],
    trim: true,
    minlength: [5, 'Company address must be at least 5 characters long'],
    maxlength: [200, 'Company address cannot exceed 200 characters']
  }
}, {
  timestamps: true
});

// Ensure only one site settings document exists
siteSchema.static('findOneOrCreate', async function(data: Partial<ISite>) {
  const settings = await this.findOne();
  if (settings) {
    return settings;
  }
  return this.create(data);
});

// Add method to safely get API keys
siteSchema.method('getApiKeys', async function() {
  const settings = await this.model('Site')
    .findById(this._id)
    .select('+googleMapsApiKey +emailServiceApiKey')
    .lean();
  
  return {
    googleMapsApiKey: settings?.googleMapsApiKey || '',
    emailServiceApiKey: settings?.emailServiceApiKey || ''
  };
});

// Add indexes for better query performance
siteSchema.index({ createdAt: -1 });

const Site = models.Site || model<ISite>('Site', siteSchema);

export default Site;
