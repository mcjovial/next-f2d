import dynamic from "next/dynamic";
import Modal from "./modal";
import { useModalAction, useModalState } from "./modal.context";
import ActiveTrip from "@/components/orders/active-trip";

const Login = dynamic(() => import('@/components/auth/login-form'), {
  ssr: false,
});
const Register = dynamic(() => import('@/components/auth/register-form'));
const ForgotPassword = dynamic(
  () => import('@/components/auth/forgot-password')
);
const ProductDetailsModalView = dynamic(
  () => import('@/components/products/details/popup'),
  { ssr: false }
);
const ProfileAddOrUpdateContact = dynamic(
  () => import('@/components/profile/profile-add-or-update-contact')
);
const AddOrUpdateCheckoutContact = dynamic(
  () => import('@/components/checkout/contact/add-or-update')
);
const CreateOrUpdateAddressForm = dynamic(
  () => import('@/components/address/address-form'),
  { ssr: false }
);
const AddressDeleteView = dynamic(
  () => import('@/components/address/delete-view')
);

const ManagedModal = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === 'LOGIN_VIEW' && <Login />}
      {view === 'REGISTER' && <Register />}
      {view === 'FORGOT_VIEW' && <ForgotPassword />}
      {view === 'PRODUCT_DETAILS' && (
        <ProductDetailsModalView productSlug={data} />
      )}
      {view === 'ADD_OR_UPDATE_PROFILE_CONTACT' && (
        <ProfileAddOrUpdateContact />
      )}
      {view === 'ADD_OR_UPDATE_CHECKOUT_CONTACT' && (
        <AddOrUpdateCheckoutContact />
      )}
      {view === 'ADD_OR_UPDATE_ADDRESS' && <CreateOrUpdateAddressForm />}
      {view === 'DELETE_ADDRESS' && <AddressDeleteView />}
      {view === 'ACTIVE_TRIP' && <ActiveTrip />}
    </Modal>
  )
}

export default ManagedModal;