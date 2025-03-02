import {
  createContext,
  type ReactNode,
  useContext,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '../hooks/useOutsideClick';
import CloseIcon from './CloseIcon';

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
        className="fixed top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-10 pt-6 pb-10 shadow-lg transition-all duration-500"
      >
        <button onClick={close} className="absolute top-4 right-4">
          <div className="text-secondary hover:text-red-dark transition-colors duration-200">
            <CloseIcon color="currentColor" size={24} />
          </div>
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
