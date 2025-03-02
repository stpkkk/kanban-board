import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useRef,
} from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import ThreeDotsIcon from './ThreeDotsIcon';

type DropDownMenuContextType = {
  openId: string;
  open: (id: string) => void;
  close: () => void;
};

type DropDownMenuProps = {
  children: ReactNode;
};

type ListItemProps = {
  children: ReactNode;
  onClick?: () => void;
  icon: string;
  disabled?: boolean;
};

type ListProps = {
  children: ReactNode;
  id: string;
};

type ToggleProps = {
  id: string;
};

const DropDownMenuContext = createContext<DropDownMenuContextType | null>(null);

export function DropDownMenu({ children }: DropDownMenuProps) {
  const [openId, setOpenId] = useState('');

  const close = () => setOpenId('');
  const open = (id: string) => setOpenId(id);

  return (
    <DropDownMenuContext.Provider value={{ openId, close, open }}>
      <div className="relative flex items-center justify-end">{children}</div>
    </DropDownMenuContext.Provider>
  );
}

function Toggle({ id }: ToggleProps) {
  const context = useContext(DropDownMenuContext);
  if (!context) throw new Error('Toggle must be used within a DropDownMenu');
  const { openId, close, open } = context;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    openId === '' || openId !== id ? open(id) : close();
  }

  return (
    <div className="flex h-full flex-col p-1">
      <button
        className="group text-secondary hover:text-border-blue justify-start"
        onClick={handleClick}
      >
        <ThreeDotsIcon color="currentColor" />
      </button>
    </div>
  );
}

function List({ id, children }: ListProps) {
  const context = useContext(DropDownMenuContext);
  if (!context) throw new Error('List must be used within a DropDownMenu');

  const { openId, close } = context;
  const ref = useRef<HTMLUListElement>(null);

  useOutsideClick(ref, close, false);

  if (openId !== id) return null;

  return (
    <ul
      className="absolute top-8 z-10 w-[144px] rounded-lg bg-white drop-shadow-lg"
      ref={ref}
    >
      {children}
    </ul>
  );
}

function ListItem({ children, icon, onClick, disabled }: ListItemProps) {
  const context = useContext(DropDownMenuContext);
  if (!context) throw new Error('Button must be used within a DropDownMenu');

  const { close } = context;

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li className="hover:bg-blue-light">
      <button
        onClick={handleClick}
        disabled={disabled}
        className="flex w-full items-center gap-2 p-2 text-center"
      >
        <img src={icon} alt="" width={20} height={20} />
        <span>{children}</span>
      </button>
    </li>
  );
}

DropDownMenu.List = List;
DropDownMenu.Toggle = Toggle;
DropDownMenu.ListItem = ListItem;
