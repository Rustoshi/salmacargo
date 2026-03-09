import Site from '@/models/site';
import { connectDb } from '@/utils';

export async function getSiteMetadata() {
  try {
    await connectDb();
    const site = await Site.findOne({}) || {};
    return {
      siteName: site.siteName || 'Courier Services',
      description: 'Professional courier and logistics services'
    };
  } catch (error) {
    console.error('Error fetching site metadata:', error);
    return {
      siteName: 'Courier Services',
      description: 'Professional courier and logistics services'
    };
  }
}
