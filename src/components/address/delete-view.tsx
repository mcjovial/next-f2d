import ConfirmationCard from '@/components/ui/cards/confirmation';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useDeleteAddress } from '@/utilities/queries/user';

export default function AddressDeleteView() {
  const {
    data: { addressId },
  } = useModalState();
  const { closeModal } = useModalAction();
  const { mutate: deleteAddressById, isLoading } = useDeleteAddress();

  function handleDelete() {
    if (!addressId) {
      return;
    }
    deleteAddressById({ id: addressId });
    closeModal();
  }
  
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={isLoading}
    />
  );
}
