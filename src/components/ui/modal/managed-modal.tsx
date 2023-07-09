import dynamic from "next/dynamic";
import Modal from "./modal";
import { useModalAction, useModalState } from "./modal.context";

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
    </Modal>
  )
}

export default ManagedModal;