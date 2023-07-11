import { formatOrderedProduct } from '@/lib/format-ordered-product';
import { useAtom } from 'jotai';
import Button from '@/components/ui/button';
import { useCart } from '@/store/quick-cart/cart.context';
import classNames from 'classnames';
import omit from 'lodash/omit';
import { shippingAddressAtom } from '@/store/checkout-atom';
import { useVerifyOrder } from '@/utilities/queries/order';

export const CheckAvailabilityAction: React.FC<{ className?: string }> = (
  props
) => {
  const [shipping_address] = useAtom(shippingAddressAtom);
  const { items, total, isEmpty } = useCart();

  const { mutate: verifyCheckout, isLoading: loading } : any = useVerifyOrder();

  function handleVerifyCheckout() {
    verifyCheckout({
      amount: total,
      products: items?.map((item) => formatOrderedProduct(item)),
      shipping_address: {
        ...(shipping_address?.address &&
          omit(shipping_address.address, ['__typename'])),
      },
    });
  }

  return (
    <>
      <Button
        loading={loading}
        className={classNames('mt-5 w-full', props.className)}
        onClick={handleVerifyCheckout}
        disabled={isEmpty}
        {...props}
      />
    </>
  );
};
