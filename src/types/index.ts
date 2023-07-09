import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  authenticationRequired?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface HomePageProps {
  variables?: {
    products: any;
    popularProducts?: any;
    categories: any;
  };
}

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
    [key: string]: string;
  };
}

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
}

export interface ProductQueryOptions extends QueryOptions {
  shop: string;
  sortedBy: string;
  orderBy: string;
  name: string;
  categories: string;
  price: string;
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

export interface Address {
  id: string;
  title: string;
  type: any;
  address: {
    __typename?: string;
    country: string;
    city: string;
    state: string;
    zip: string;
    street_address: string;
  };
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
  address: Address[];
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
  billing_address?: Address;
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
