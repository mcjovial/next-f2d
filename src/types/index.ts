import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  authenticationRequired?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};

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
  location: {
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
