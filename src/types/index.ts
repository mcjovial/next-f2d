import { AddressType } from "@/utilities/constants";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  authenticationRequired?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface CountryData {
  name: string;
  currencies: {
    code: string;
    name: string;
  }[];
}

export interface HomePageProps {
  variables: HomePageVariables;
}

export interface HomePageVariables {
  products: any;
  popularProducts: any;
  categories: any;
};
export interface Banner {
  id: string;
  title: string;
  description: string;
  image: string;
}
export interface GetParams {
  slug: string;
  language?: string;
}

export interface Settings {
  id: string;
  name: string;
  slug: string;
  options: {
    [key: string]: any;
  };
}

export interface Currency {
  id?: number;
  name: string;
  code: string;
};

export interface SearchParamOptions {
  type: string;
  name: string;
  categories: string;
  tags: string;
  author: string;
  price: string;
  manufacturer: string;
  status: string;
  is_active: string;
  shop_id: string;
  min_price: string;
  max_price: string;
  rating: string;
  question: string;
}

export interface QueryOptions {
  language: string;
  page?: number;
  limit?: number;
}

export interface SettingsQueryOptions extends QueryOptions {}

export interface CategoryQueryOptions extends QueryOptions {
  language: string;
  parent: string | null;
  type: string;
}

export interface TagQueryOptions extends QueryOptions {
  parent: string | null;
  type: string;
}

export interface ShopQueryOptions extends QueryOptions {
  name: string;
  is_active: number;
  country?: string;
  currency?: string;
}

export interface ProductQueryOptions extends QueryOptions {
  shop: string;
  sortedBy: string;
  orderBy: string;
  name: string;
  categories: string;
  price: string;
  currency: string;
  language: string;
  searchType: string;
  searchQuery: string;
  text: string;
}

export interface QuestionQueryOptions extends QueryOptions {
  product_id: string;
  question?: string;
}

export interface PopularProductQueryOptions extends QueryOptions {
  language: string;
  type_slug: string;
  with: string;
  range: number;
}

export interface WishlistQueryOptions extends QueryOptions {}

export interface OrderQueryOptions extends QueryOptions {
  customer_id: string
  name: string;
  orderBy: string;
}

export interface CouponQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
}

export interface Address {
  id: string;
  title: string;
  type: AddressType;
  country: string;
  street_address: string;
  location?: {
    lat: number;
    lng: number;
  }
}

export interface User {
  id: string;
  name: string;
  email: string;
  wallet: {
    total_points: number;
    points_used: number;
    available_points: number;
  };
  profile: {
    id?: string;
    contact?: string;
    bio?: string;
    avatar?: string;
  };
  addresses: Address[];
  address: Address
}

export interface UpdateUserInput extends Partial<User> {
  id: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  roles: string[];
}

export type SocialLoginInputType = {
  provider: string;
  access_token: string;
}

export type SendOtpCodeInputType = {
  phone_number: string;
}

export interface OTPResponse {
  message: string;
  success: boolean;
  provider: string;
  id: string;
  phone_number: string;
  is_contact_exist: boolean;
}

export interface VerifyOtpInputType {
  phone_number: string;
  code: string;
  otp_id: string;
}

export interface OTPVerifyResponse {
  success: string;
  message: string;
}

export interface OtpLoginInputType {
  phone_number: string;
  code: string;
  otp_id: string;
  name?: string;
  email?: string;
}

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordUserInput {
  email: string;
}

export interface PasswordChangeResponse {
  success: boolean;
  message: string;
}

export interface VerifyForgotPasswordUserInput {
  token: string;
  email: string;
}

export interface ResetPasswordUserInput {
  email: string;
  token: string;
  password: string;
}

export interface ChangePasswordUserInput {
  oldPassword: string;
  newPassword: string;
}

export interface CreateContactUsInput {
  name: string;
  email: string;
  subject: string;
  description: string;
}

export interface CreateFeedbackInput {
  model_id: string;
  model_type: string;
  positive?: boolean;
  negative?: boolean;
}

export interface CreateQuestionInput {
  question: string;
  product_id: string;
  shop_id: string;
}

export interface CreateAbuseReportInput {
  model_id: string;
  model_type: string;
  message: string;
}

export interface UserAddress {
  street_address: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  shipping_address?: Address;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parent_id?: number | null;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Shop {
  id: string;
  name: string;
  slug: string;
  description: string;
  cover_image: string;
  logo: string;
  link?: string;
  address: {
    lat: string;
    lng: string;
  }
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  tags: Tag[];
  is_digital: boolean;
  product_type: string;
  description: string;
  price: number;
  sale_price: number;
  min_price: number;
  max_price: number;
  image: string;
  gallery: string[];
  shop: Shop;
  unit: string;
  categories: Category[];
  quantity: number;
  total_reviews: number;
  ratings: number;
  in_wishlist: boolean;
  variations: object[];
  variation_options: object[];
  rating_count: RatingCount[];
  related_products: Product[];
  created_at: string;
  updated_at: string;
  language: string;
}

export interface OrderStatus {
  id: string;
  name: string;
  color: string;
  serial: number;
  created_at: string;
  updated_at: string;
}

export interface Coupon {
  id: string;
  name: string;
  slug: string;
  amount?: string;
  code?: string;
}

enum RefundStatus {
  APPROVED = 'Approved',
  PENDING = 'Pending',
  REJECTED = 'Rejected',
  PROCESSING = 'Processing',
}

export interface Refund {
  id: string;
  title: string;
  description: string;
  images: string[];
  amount: number;
  status: RefundStatus;
  shop: Shop;
  order: Order;
  customer: User;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number | string;
  tracking_number: string;
  customer_id: number | string;
  // customer?: Maybe<User>;
  status: OrderStatus;
  amount: number;
  children: Order[];
  sales_tax: number;
  total: number;
  paid_total: number;
  payment_id?: string;
  payment_gateway?: string;
  coupon?: Coupon;
  discount?: number;
  delivery_fee?: number;
  delivery_time?: string;
  products: Product[];
  created_at: Date;
  updated_at: Date;
  shipping_address?: Address;
  refund: Refund;
  language?: string;
}

export interface ConnectProductOrderPivot {
  product_id: string;
  shop_id: string;
  order_quantity: number;
  unit_price: number;
  subtotal: number;
}

enum PaymentGatewayType {
  PAYSTACK = 'Paystack',
  FLUTTERWAVE = 'Flutterwave',
  CASH_ON_DELIVERY = 'Cash on delivery',
  CASH = 'Cash',
  FULL_WALLET_PAYMENT = 'Full wallet payment',
}

export interface CreateOrderInput {
  customer_contact: string;
  status: string;
  products: ConnectProductOrderPivot[];
  amount: number;
  sales_tax: number;
  total: number;
  paid_total: number;
  payment_id?: string;
  payment_gateway: PaymentGatewayType;
  coupon_id?: string;
  shop_id?: string;
  customer_id?: string;
  discount?: number;
  use_wallet_points?: boolean;
  delivery_fee?: number;
  delivery_time: string;
  shipping_address: string;
  language?: string;
}

export interface CreateRefundInput {
  order_id: string;
  title: string;
  description: string;
  images: string[];
}

export interface CheckoutVerificationInput {
  amount: number;
  products: ConnectProductOrderPivot[];
  shipping_address?: Address;
}

export interface VerifiedCheckoutData {
  total_tax: number;
  shipping_charge: number;
  unavailable_products?: number[];
  wallet_currency?: number;
  wallet_amount?: number;
}

export interface VerifyCouponInputType {
  code: string;
}

export interface VerifyCouponResponse {
  is_valid: boolean;
  coupon?: Coupon;
}

export interface RatingCount {
  rating: number;
  total: number;
}

export interface Question {
  id: string;
  answer: string;
  my_feedback: Feedback;
  negative_feedbacks_count: number;
  positive_feedbacks_count: number;
  question: string;
  created_at: string;
  updated_at: string;
  product: Product;
}

export interface Wishlist {
  id: string;
  product: Product;
  product_id: string;
  user: User[];
  user_id: string;
}

export interface Feedback {
  id: string;
  user_id: string;
  model_type: string;
  model_id: string;
  positive: boolean;
  negative: boolean;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  photos: string[];
  user: User;
  product: Product;
  shop: Shop;
  feedbacks: Feedback[];
  positive_feedbacks_count: number;
  negative_feedbacks_count: number;
  my_feedback: Feedback;
  created_at: string;
  updated_at: string;
}

export interface PaginatorInfo<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}


export interface CategoryPaginator extends PaginatorInfo<Category> {}
export interface TagPaginator extends PaginatorInfo<Tag> {}
export interface ShopPaginator extends PaginatorInfo<Shop> {}
export interface ProductPaginator extends PaginatorInfo<Product> {}
export interface QuestionPaginator extends PaginatorInfo<Question> {}
export interface WishlistPaginator extends PaginatorInfo<Wishlist> {}
export interface OrderPaginator extends PaginatorInfo<Order> {}
export interface OrderStatusPaginator extends PaginatorInfo<OrderStatus> {}
export interface RefundPaginator extends PaginatorInfo<Refund> {}
export interface CouponPaginator extends PaginatorInfo<Coupon> {}
