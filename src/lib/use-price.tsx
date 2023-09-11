import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSettings } from '@/utilities/queries/settings';

export function formatPrice({
  amount,
  currencyCode,
  locale,
}: {
  amount: number;
  currencyCode: string;
  locale: string;
}) {
  const formatCurrency = () => {
    return currencyCode ? currencyCode + ' ' + amount : amount;
  }

  return formatCurrency();
}

export function formatVariantPrice({
  amount,
  baseAmount,
  currencyCode,
  locale,
}: {
  baseAmount: number;
  amount: number;
  currencyCode: string;
  locale: string;
}) {
  const hasDiscount = baseAmount > amount;
  const formatDiscount = new Intl.NumberFormat(locale, { style: 'percent' });
  const discount = hasDiscount
    ? formatDiscount.format((baseAmount - amount) / baseAmount)
    : null;

  const price = formatPrice({ amount, currencyCode, locale });
  const basePrice = hasDiscount
    ? formatPrice({ amount: baseAmount, currencyCode, locale })
    : null;

  return { price, basePrice, discount };
}

type PriceProps = {
  amount: number;
  baseAmount?: number;
  currencyCode?: string;
};

export default function usePrice(data: PriceProps) {
  const {
    // @ts-ignore
    settings: { currency },
  } = useSettings();
  const router = useRouter();
  const { currency: selectedCurrency } = router.query;

  const customerCurrency = selectedCurrency || currency;

  const amount = data.amount || 0; // Default to 0 if amount is not provided
  const baseAmount = data.baseAmount || 0; // Default to 0 if baseAmount is not provided
  const currencyCode = data.currencyCode || customerCurrency;

  const { locale } = useRouter();
  const currentLocale = locale ? locale : 'en';

  const value = formatVariantPrice({
    amount,
    baseAmount,
    currencyCode,
    locale: currentLocale,
  });
  
  return value;
}
