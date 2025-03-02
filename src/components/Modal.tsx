import type React from 'react';

import {
  createContext,
  type ReactNode,
  useContext,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import x from '../assets/icons/x-gray.svg';
import { useOutsideClick } from '../hooks/useOutsideClick';

interface ModalProps {
  children: ReactNode;
}

interface OpenProps {
  children: (openModal: () => void) => ReactNode;
  opens: string;
}

interface WindowProps {
  children: (close: () => void) => React.ReactNode;
  name: string;
}

interface ModalContextType {
  openName: string;
  close: () => void;
  open: (name: string) => void;
  isOpen: (name: string) => boolean;
}

const ModalContext = createContext<ModalContextType | null>(null);

const Modal = ({ children }: ModalProps) => {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');
  const open = setOpenName;
  const isOpen = (name: string) => name === openName;

  return (
    <ModalContext.Provider value={{ openName, close, open, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens: opensWindowName }: OpenProps) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('Open must be used within a Modal');

  const { open } = context;
  return children(() => open(opensWindowName));
};

const Window = ({ children, name }: WindowProps) => {
  const context = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement>(null);

  if (!context) throw new Error('Window must be used within a Modal');
  const { openName, close } = context;
  useOutsideClick(modalRef, close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[4px] transition-all duration-500">
      <div
        ref={modalRef}
        className="fixed top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-10 pt-6 pb-10 shadow-2xl transition-all duration-500"
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <img src={x} alt="Закрыть окно" width={24} height={24} />
        </button>
        <div>{children(close)}</div>
      </div>
    </div>,
    document.body,
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
