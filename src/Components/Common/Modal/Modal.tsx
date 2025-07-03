import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useModalStyles } from './Modal.styles';
import type { ModalProps } from './Modal.types';
import { mergeClasses } from '@griffel/react'
import { Button } from '../Button/Button'

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
    <div className={mergeClasses('modal-overlay',styles.overlay)} onClick={onClose} role="dialog" aria-modal="true">
      <div className={mergeClasses('modal-root', styles.modal)} onClick={(e) => e.stopPropagation()}>
        <div className={mergeClasses('modal-header', styles.header)}>
          <h2 className={mergeClasses('modal-title', styles.title)}>{title}</h2>
          <Button type="button" className={mergeClasses('modal-close-button', styles.closeButton)} onClick={onClose} aria-label="Close modal">
            &times;
          </Button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};
