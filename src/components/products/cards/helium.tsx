import cn from 'classnames';
import usePrice from '@/lib/use-price';
import { AddToCart } from '@/components/products/add-to-cart/add-to-cart';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { productPlaceholder } from '@/lib/placeholders';
import CartIcon from '@/components/icons/cart';
import Image from 'next/image';

type HeliumProps = {
  product: any;
  className?: string;
};

const Helium: React.FC<HeliumProps> = ({ product, className }) => {
  const { t } = useTranslation('common');
  const { name, image, unit, quantity } = product ?? {};
  
  const { price, basePrice, discount } = usePrice({
    amount: product.sale_price ? product.sale_price : product.price!,
    baseAmount: product.price,
  });

  const { openModal } = useModalAction();

  function handleProductQuickView() {
    return openModal('PRODUCT_DETAILS', product.slug);
  }
  
  return (
    <article
      className={cn(
        'product-card cart-type-helium h-full overflow-hidden rounded border border-border-200 bg-light transition-shadow duration-200 hover:shadow-sm',
        className
      )}
    >
      <div
        onClick={handleProductQuickView}
        className="relative flex h-48 w-auto items-center justify-center sm:h-64"
        role="button"
      >
        <span className="sr-only">{t('text-product-image')}</span>
        <Image
          src={image ?? productPlaceholder}
          alt={name}
          layout="fill"
          objectFit="contain"
          className="product-image"
        />
        {discount && (
          <div className="absolute top-3 rounded-full bg-yellow-500 px-1.5 text-xs font-semibold leading-6 text-light ltr:right-3 rtl:left-3 sm:px-2 md:top-4 md:px-2.5 ltr:md:right-4 rtl:md:left-4">
            {discount}
          </div>
        )}
      </div>
      {/* End of product image */}

      <header className="relative p-3 md:p-5 md:py-6">
        <h3
          onClick={handleProductQuickView}
          role="button"
          className="mb-2 truncate text-sm font-semibold text-heading"
        >
          {name}
        </h3>
        <p className="text-xs text-muted">{unit}</p>
        {/* End of product info */}

        <div className="relative mt-7 flex min-h-6 items-center justify-between md:mt-8">
          <>
            <div className="relative">
              {basePrice && (
                <del className="absolute -top-4 text-xs italic text-muted text-opacity-75 md:-top-5">
                  {basePrice}
                </del>
              )}
              <span className="text-sm font-semibold text-accent md:text-base">
                {price}
              </span>
            </div>

            {Number(quantity) > 0 && (
              <AddToCart data={product} variant="single" />
            )}
          </>

          {Number(quantity) <= 0 && (
            <div className="rounded bg-red-500 px-2 py-1 text-xs text-light">
              {t('text-out-stock')}
            </div>
          )}
          {/* End of product price */}
        </div>
      </header>
    </article>
  );
};

export default Helium;
