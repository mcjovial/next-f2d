import Modal from "./modal";
import { useModalAction, useModalState } from "./modal.context";

const ManagedModal = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      
    </Modal>
  )
}

export default ManagedModal;