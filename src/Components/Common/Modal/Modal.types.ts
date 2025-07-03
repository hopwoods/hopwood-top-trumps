export interface ModalProps {
  /**
   * The content to display inside the modal.
   */
  children: React.ReactNode;
  /**
   * The title to display in the modal header.
   */
  title: string;
  /**
   * The function to call when the modal is requested to close.
   */
  onClose: () => void;
  /**
   * A flag to determine if the modal is open.
   */
  isOpen: boolean;
}
