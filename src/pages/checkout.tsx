import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { getLayout } from '@/components/layouts/layout';
import Seo from '@/components/seo/seo';
import { AddressType } from '@/utilities/constants';
import { useUser } from '@/utilities/queries/user';
import { shippingAddressAtom } from '@/store/checkout-atom';
export { getStaticProps } from '@/utilities/general.ssr';

// const ScheduleGrid = dynamic(
//   () => import('@/components/checkout/schedule/schedule-grid')
// );
const AddressGrid = dynamic(
  () => import('@/components/checkout/address-grid'),
  { ssr: false }
);
const ContactGrid = dynamic(
  () => import('@/components/checkout/contact/contact-grid')
);
const RightSideView = dynamic(
  () => import('@/components/checkout/right-side-view'),
  { ssr: false }
);

export default function CheckoutPage() {
  const { t } = useTranslation();
  const { me } = useUser();
  const { id, addresses, profile } = me ?? {};

  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <div className="bg-gray-100 px-4 py-8 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <div className="m-auto flex w-full max-w-5xl flex-col items-center rtl:space-x-reverse lg:flex-row lg:items-start lg:space-x-8">
          <div className="w-full space-y-6 lg:max-w-2xl">
            <ContactGrid
              className="bg-light p-5 shadow-700 md:p-8"
              contact={profile?.contact}
              label={t('text-contact-number')}
              count={1}
            />

            <AddressGrid
              userId={id!}
              className="bg-light p-5 shadow-700 md:p-8"
              label={t('text-shipping-address')}
              count={2}
              //@ts-ignore
              addresses={addresses}
              atom={shippingAddressAtom}
              type={AddressType.ORDER}
            />
            {/* <ScheduleGrid
              className="p-5 bg-light shadow-700 md:p-8"
              label={t('text-delivery-schedule')}
              count={4}
            /> */}
          </div>
          <div className="mt-10 mb-10 w-full sm:mb-12 lg:mb-0 lg:w-96">
            <RightSideView />
          </div>
        </div>
      </div>
    </>
  );
}
CheckoutPage.authenticationRequired = true;
CheckoutPage.getLayout = getLayout;
