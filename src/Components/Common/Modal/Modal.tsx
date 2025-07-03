import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useModalStyles } from './Modal.styles';
import type { ModalProps } from './Modal.types';

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const styles = useModalStyles();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};
