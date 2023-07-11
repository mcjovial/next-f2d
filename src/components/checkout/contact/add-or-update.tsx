import { useModalAction } from '@/components/ui/modal/modal.context';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';
import PhoneNumberForm from '@/components/otp/phone-number-form';
import { customerContactAtom } from '@/store/checkout-atom';
import { useSettings } from '@/utilities/queries/settings';

export default function AddOrUpdateContact() {
  const { t } = useTranslation('common');
  const {
    // @ts-ignore
    settings: { useOtp },
  } = useSettings();
  const { closeModal } = useModalAction();
  const [contactNumber, setContactNumber] = useAtom(customerContactAtom);

  function onSubmit({ phone_number }: { phone_number: string }) {
    setContactNumber(phone_number);
    closeModal();
  }
  return (
    <div className="flex flex-col justify-center min-h-screen p-5 bg-light sm:p-8 md:min-h-0 md:rounded-xl">
      <h1 className="mb-5 text-sm font-semibold text-center text-heading sm:mb-6">
        {contactNumber ? t('text-update') : t('text-add-new')}{' '}
        {t('text-contact-number')}
      </h1>
      <PhoneNumberForm onSubmit={onSubmit} phoneNumber={contactNumber} />
    </div>
  );
}
