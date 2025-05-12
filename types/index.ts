// types/index.ts

export type Product = {
  id: string;
  title: string;
  price: number;
  image?: string;
};

export type User = {
  id: string;
  seller_name: string;
  phone: string;
  state: string;
  city: string;
};

export type JoinRequest = {
  id: string;
  full_name: string;
  phone: string;
  state: string;
  city: string;
  role: string;
  message: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
};

export type Order = {
  id: string;
  full_name: string;
  kg: number;
  phone: number;
  price: number;
  status: string;
  address?: string;
  delivery_option: string;
  created_at: string;
  state: string;
  city: string;
};

export type ContactForm = {
  id: string;
  full_name: string;
  message: string;
  gas_info?: string;
  image_url?: string;
  state?: string;
  city?: string;
  created_at: string;
};

// ✅ Declare this BEFORE using it
export type CartProductItem = {
  name: string;
  kg: string;
  price: number;
  quantity: number;
  total: number;
};

export type CartOrder = {
  id?: string;
  name: string;
  phonenumber: string;
  address: string;
  delivery_method: string;
  tx_ref: string;
  product: CartProductItem[];
  created_at?: string;
};
