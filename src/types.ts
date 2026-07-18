export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductDownload {
  title: string;
  type: "Brochure" | "Data Sheet" | "Manual" | "Certificates";
  url: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  subcategory: string;
  priceUSD: number;
  priceNGN: number;
  description: string;
  images: string[];
  specifications: ProductSpecification[];
  stock: number;
  oem: string;
  productType: "Enterprise" | "Hazardous Area" | "Industrial" | "Commercial";
  featured: boolean;
  popular: boolean;
  downloads: ProductDownload[];
  seoTitle?: string;
  seoDescription?: string;
  reviews?: Review[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  subcategories: string[];
}

export interface Solution {
  id: string;
  title: string;
  slug: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  priceUSD: number;
  priceNGN: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  billingAddress: Address;
  shippingAddress: Address;
  items: OrderItem[];
  subtotalUSD: number;
  subtotalNGN: number;
  taxUSD: number;
  taxNGN: number;
  shippingUSD: number;
  shippingNGN: number;
  totalUSD: number;
  totalNGN: number;
  status: "Pending" | "Paid" | "Cancelled" | "Completed" | "Refunded";
  paymentReference?: string;
  paymentMethod: "Paystack" | "Bank Transfer" | "Purchase Order";
}

export interface QuoteItem {
  productId?: string;
  productName: string;
  quantity: number;
}

export interface QuoteRequest {
  id: string;
  quoteNumber: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  productName?: string;
  sku?: string;
  items: QuoteItem[];
  message: string;
  status: "Pending" | "Approved" | "Rejected" | "Converted";
  createdAt: string;
  internalNotes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  subject: string;
  message: string;
  status: "Unread" | "Read" | "Replied";
  createdAt: string;
}

export interface OEMPartner {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  website: string;
  brochureUrl?: string;
  specialty: string;
}

export interface UserSession {
  email: string;
  name: string;
  role: "admin" | "customer" | "guest";
  companyName?: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  slug: string;
  category: string;
  date: string;
  author: string;
  image: string;
}
