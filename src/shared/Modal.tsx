import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import { useEffect } from 'react';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [onClose]);
  const modalElement = document.getElementById('modal');

  if (!modalElement) {
    return null;
  }

  return createPortal(
    <div data-testid="modal">
      <div
        data-testid="modal-overlay"
        className={styles.overlay}
        onClick={onClose}
      ></div>
      <div className={styles.modal}>
        <button
          data-testid="modal-close"
          className={styles.closeBtn}
          onClick={onClose}
        ></button>
        {children}
      </div>
    </div>,
    modalElement
  );
}
