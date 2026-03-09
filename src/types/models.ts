/**
 * User model
 */
export interface IUser {
  /**
   * Unique username
   */
  username: string;
  /**
   * Email address
   */
  email: string;
  /**
   * Password (hashed)
   */
  password: string;
  /**
   * User role
   */
  role: 'admin' | 'user';
  /**
   * Timestamp when the user was created
   */
  createdAt?: Date;
  /**
   * Timestamp when the user was last updated
   */
  updatedAt?: Date;
}

/**
 * Package model
 */
export interface IPackage {
  /**
   * Unique tracking ID
   */
  trackingID: string;
  /**
   * Sender's name
   */
  senderName: string;
  /**
   * Sender's email address (optional)
   */
  senderEmail?: string;
  /**
   * Sender's phone number (optional)
   */
  senderPhone?: string;
  /**
   * Origin address
   */
  originAddress: string;
  /**
   * Receiver's name
   */
  receiverName: string;
  /**
   * Receiver's email address (optional)
   */
  receiverEmail?: string;
  /**
   * Receiver's phone number (optional)
   */
  receiverPhone?: string;
  /**
   * Destination address
   */
  destinationAddress: string;
  /**
   * Package weight
   */
  weight: string;
  description: string;
  /**
   * Freight type
   */
  freight: string;
  /**
   * Delivery charges
   */
  charges: number;
  /**
   * Package status
   */
  status: 'order received' | 'on hold' | 'in transit' | 'delivered' | 'damaged';
  /**
   * Current location
   */
  currentLocation: string;
  /**
   * Expected delivery date
   */
  expectedDeliveryDate: Date;
  /**
   * Timestamp when the package was created
   */
  createdAt?: Date;
  /**
   * Timestamp when the package was last updated
   */
  updatedAt?: Date;
}

/**
 * Shipment history model
 */
export interface IShipmentHistory {
  trackingID: string;
  status: IPackage['status'];
  currentLocation: string;
  currentCoords: [number, number];
  notes?: string;
  createdAt?: Date;
}

/**
 * Site settings model
 */
export interface ISite {
  /**
   * Required fields
   */
  /**
   * Company name
   */
  companyName: string;
  /**
   * Company email address
   */
  companyEmail: string;
  /**
   * Company phone number
   */
  companyPhone: string;
  /**
   * Company address
   */
  companyAddress: string;

  /**
   * Optional fields
   */
  /**
   * Support email address (optional)
   */
  supportEmail?: string;
  /**
   * Support phone number (optional)
   */
  supportPhone?: string;
  /**
   * Working hours (optional)
   */
  workingHours?: string;

  /**
   * Sensitive fields (excluded from default queries)
   */
  /**
   * Google Maps API key (optional)
   */
  googleMapsApiKey?: string;
  /**
   * Email service API key (optional)
   */
  emailServiceApiKey?: string;

  /**
   * Metadata
   */
  /**
   * Timestamp when the site settings were created
   */
  createdAt?: Date;
  /**
   * Timestamp when the site settings were last updated
   */
  updatedAt?: Date;
}

/**
 * Utility types for API responses
 */
export interface ApiResponse<T> {
  /**
   * Whether the response was successful
   */
  success: boolean;
  /**
   * Optional message
   */
  message?: string;
  /**
   * Optional data
   */
  data?: T;
  /**
   * Optional error messages
   */
  errors?: string[];
}

/**
 * Paginated response type
 */
export interface PaginatedResponse<T> {
  /**
   * Array of items
   */
  items: T[];
  /**
   * Total number of items
   */
  total: number;
  /**
   * Current page number
   */
  page: number;
  /**
   * Total number of pages
   */
  totalPages: number;
  /**
   * Whether there are more items
   */
  hasMore: boolean;
}