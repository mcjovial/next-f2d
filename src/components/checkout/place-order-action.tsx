import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import ValidationError from '@/components/ui/validation-error';
import Button from '@/components/ui/button';
import { formatOrderedProduct } from '@/lib/format-ordered-product';
import { useCart } from '@/store/quick-cart/cart.context';
import { checkoutAtom, discountAtom, walletAtom } from '@/store/checkout-atom';
import {
  calculatePaidTotal,
  calculateTotal,
} from '@/store/quick-cart/cart.utils';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCreateOrder, useOrderStatuses } from '@/utilities/queries/order';

export const PlaceOrderAction: React.FC<{ className?: string }> = (props) => {
  const { t } = useTranslation('common');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { createOrder, isLoading } = useCreateOrder();
  const { locale }: any = useRouter();
  const { items } = useCart();

  const { orderStatuses } = useOrderStatuses({
    limit: 1,
    language: locale,
  });

  const [
    {
      shipping_address,
      // delivery_time,
      coupon,
      verified_response,
      customer_contact,
      payment_gateway,
      token,
    },
  ] = useAtom(checkoutAtom);
  const [discount] = useAtom(discountAtom);
  const [use_wallet_points] = useAtom(walletAtom);

  useEffect(() => {
    setErrorMessage(null);
  }, [payment_gateway]);

  const available_items = items?.filter(
    (item) => !verified_response?.unavailable_products?.includes(item.id)
  );

  const subtotal = calculateTotal(available_items);
  const total = calculatePaidTotal(
    {
      totalAmount: subtotal,
      tax: verified_response?.total_tax!,
      shipping_charge: verified_response?.shipping_charge!,
    },
    Number(discount)
  );
  const handlePlaceOrder = () => {
    if (!customer_contact) {
      setErrorMessage('Contact Number Is Required');
      return;
    }
    if (!use_wallet_points && !payment_gateway) {
      setErrorMessage('Gateway Is Required');
      return;
    }
    if (!use_wallet_points && payment_gateway === 'PAYSTACK' && !token) {
      setErrorMessage('Please Pay First');
      return;
    }
    let input = {
      //@ts-ignore
      products: available_items?.map((item) => formatOrderedProduct(item)),
      status: orderStatuses[0]?.id ?? '1',
      amount: subtotal,
      coupon_id: Number(coupon?.id),
      discount: discount ?? 0,
      paid_total: total,
      sales_tax: verified_response?.total_tax,
      delivery_fee: verified_response?.shipping_charge,
      total,
      // delivery_time: delivery_time?.title,
      customer_contact,
      payment_gateway,
      use_wallet_points,
    };
    if (payment_gateway === 'PAYSTACK') {
      //@ts-ignore
      input.token = token;
    }

    // delete input.shipping_address.__typename;
    //@ts-ignore
    createOrder(input);
  };
  const isDigitalCheckout = available_items.find((item) =>
    Boolean(item.is_digital)
  );

  const formatRequiredFields = [
    customer_contact,
    payment_gateway,
    shipping_address,
    // delivery_time,
    available_items,
  ];
  const isAllRequiredFieldSelected = formatRequiredFields.every(
    (item) => !isEmpty(item)
  );
  return (
    <>
      <Button
        loading={isLoading}
        className={classNames('mt-5 w-full', props.className)}
        onClick={handlePlaceOrder}
        disabled={!isAllRequiredFieldSelected}
        {...props}
      />
      {errorMessage && (
        <div className="mt-3">
          <ValidationError message={errorMessage} />
        </div>
      )}
      {!isAllRequiredFieldSelected && (
        <div className="mt-3">
          <ValidationError message={t('text-place-order-helper-text')} />
        </div>
      )}
    </>
  );
};
