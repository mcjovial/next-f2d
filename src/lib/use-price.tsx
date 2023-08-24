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
  // const formatCurrency = new Intl.NumberFormat(locale, {
  //   style: 'currency',
  //   currency: currencyCode,
  // });
  const formatCurrency = () => {
    return currencyCode + ' ' + amount;
  }

  return formatCurrency;
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

  const customerCurrency = selectedCurrency || currency

  // const { amount, baseAmount, currencyCode = currency } = data ?? {};
  const amount = data.amount;
  const baseAmount = data?.baseAmount;
  const currencyCode = data?.currencyCode || customerCurrency;
  
  const { locale } = useRouter();
  const currentLocale = locale ? locale : 'en';

  const value = baseAmount ? formatVariantPrice({
    amount,
    baseAmount,
    currencyCode,
    locale: currentLocale,
  }) : formatPrice({ amount, currencyCode, locale: currentLocale });
  
  return typeof value === 'string'
    ? { price: value, basePrice: null, discount: null }
    : value;
}
