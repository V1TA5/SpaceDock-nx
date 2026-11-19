import { ReactNode, useEffect } from 'react';
import { stylex } from '@stylexjs/stylex';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
}

const modalStyles = stylex.create({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: '24px',
    maxWidth: '500px',
    width: '100%',
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  close: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    cursor: 'pointer',
    fontSize: 20,
  },
});

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div {...stylex.props(modalStyles.overlay)} onClick={onClose}>
      <div {...stylex.props(modalStyles.content)} onClick={(e) => e.stopPropagation()}>
        {title && <h2 {...stylex.props(modalStyles.title)}>{title}</h2>}
        <span {...stylex.props(modalStyles.close)} onClick={onClose}>×</span>
        {children}
      </div>
    </div>
  );
}