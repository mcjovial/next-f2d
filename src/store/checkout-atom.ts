import { CHECKOUT } from "@/lib/constants";
import { atom } from "jotai";
import { atomWithStorage } from 'jotai/utils';

interface CheckoutState {
  // billing_address: Address | null;
  // shipping_address: Address | null;
  // payment_gateway: PaymentMethodName;
  // delivery_time: DeliveryTime | null;
  // customer_contact: string;
  // verified_response: VerifiedResponse | null;
  // coupon: Coupon | null;
  payable_amount: number;
  use_wallet: boolean;
  [key: string]: unknown;
}

export const defaultCheckout: CheckoutState = {
  billing_address: null,
  shipping_address: null,
  delivery_time: null,
  payment_gateway: 'STRIPE',
  customer_contact: '',
  verified_response: null,
  coupon: null,
  payable_amount: 0,
  use_wallet: false,
};

export const checkoutAtom = atomWithStorage(CHECKOUT, defaultCheckout);
export const clearCheckoutAtom = atom(null, (_get, set, _data) => {
  return set(checkoutAtom, defaultCheckout);
});