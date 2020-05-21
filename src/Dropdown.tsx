import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

let dropdownId= 0;
const dropdowns: {
  [id: string]: {
    close: Function;
    maybeClose: Function;
  };
} = {};

if (typeof window !== 'undefined') {
  // only add one listener for all dropdowns
  document.addEventListener('keydown', e => {
    const { key } = e;
    if (key !== 'Escape') {
      return;
    }
    Object.keys(dropdowns).forEach(id => dropdowns[id].close());
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (e.which !== 1) {
      // Only care about left click
      return;
    }
    const target = e.target;
    // Not all EventTarget are HTMLElements!
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
    if (!(target instanceof Element)) {
      return;
    }

    Object.keys(dropdowns).forEach(id => dropdowns[id].maybeClose());
  });
}

type anyFunction = (...args: any[]) => any;
export interface DropdownProps extends React.ComponentProps<'div'> {
  renderButton: (onClick: anyFunction, title: React.ReactNode, disabled: boolean) => React.ReactNode;
  children (): React.ReactNode;
  disabled?: boolean;
  menuClassName?: string;
}

export const useDropdown = (): [boolean, () => void] => {
  const [ isOpen, setOpen ] = React.useState<boolean>(false);

  // a boolean in a closure won't work, so have React keep a Object up to date
  const isOpenRef = React.useRef(isOpen);
  React.useEffect(() => {
    isOpenRef.current = isOpen;
  }, [ isOpen ]);

  // register this dropdown with the global handler
  React.useEffect(() => {
    const id = dropdownId++;
    const close = () => {
      // can be called from a timeout (after unmmounting)
      if (!dropdowns[id]) {
        return;
      }
      setOpen(false);
    };

    dropdowns[id] = {
      close,
      maybeClose: () => {
        if (!isOpenRef.current) {
          return;
        }
        // 🦃🦃🦃🦃
        // Wait to close, otherwise our children probably won't exist anymore and their onclick handlers can't fire
        setTimeout(close, 0);
      }
    };
    // unregister after unmounting
    return () => {
      delete dropdowns[id];
    };
  }, []);
  // this function is redeclared for better or worse every render...
  return [ isOpen, () => setOpen(!isOpen)];
};

// A reference implementation for a dropdown...
export const Dropdown: FunctionComponent<DropdownProps> = ({ className="dropdown", menuClassName="dropdown-menu", children, disabled, renderButton, title, ...rest }) => {
  const [ isOpen, onClick ] =  useDropdown();

  return <div className={classNames(className, { isOpen, disabled })} {...rest}>
    { renderButton(onClick, title, !!disabled) }
    { isOpen && <ul className={classNames(menuClassName, { isOpen, disabled })}>
      { children() }
    </ul> }
  </div>;
};