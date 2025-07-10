import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import { useEffect } from 'react';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const modalElement = document.getElementById('modal');

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

  if (!modalElement) {
    return null;
  }

  return createPortal(
    <>
      <div className={styles.layout} onClick={onClose}></div>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}></button>
        {children}
      </div>
    </>,
    modalElement
  );
}
