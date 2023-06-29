export const AUTH_TOKEN_KEY = 'auth_token';
export const RTL_LANGUAGES: ReadonlyArray<string> = ['ar', 'he'];
export const CHECKOUT = 'farm2door-checkout';
export const CART_KEY = 'f2d-cart';
export const SHOPS_LIMIT = 20;

export function getDirection(language: string | undefined) {
  if (!language) return 'ltr';
  return RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr';
}