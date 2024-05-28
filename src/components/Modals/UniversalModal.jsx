import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const UniversalModal = ({
  isModal,
  setIsModal,
  title,
  children,
  size = "2xl",
  isCloseBtn = true,
}) => {
  const handleClose = () => {
    setIsModal(false);
  };

  return (
    <Modal
      isOpen={isModal}
      onClose={handleClose}
      closeOnOverlayClick={false}
      isCentered
      size={size}
    >
      <ModalOverlay />
      <ModalContent paddingY={4}>
        {title && (
          <ModalHeader paddingTop={0} marginBottom={0}>
            {title}
          </ModalHeader>
        )}
        {isCloseBtn && <ModalCloseButton className="mt-1" />}
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UniversalModal;
