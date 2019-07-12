import React from 'react';
import classNames from 'classnames';

import { SafetyFirst } from './SafetyFirst';

let dropdownId= 0;
const dropdowns: {[s: string]: Dropdown} = {};

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
  Object.keys(dropdowns).forEach(id => dropdowns[id].onDocumentClick(e));
});

export type DropdownProps = {
  button?: React.ReactElement<any>;
  children (): React.ReactNode;
  className?: string;
  menuClassName?: string;
  disabled?: boolean;
  id?: string;
  title: string;
  style?: React.CSSProperties;
};

export class Dropdown extends SafetyFirst<DropdownProps, {isOpen: boolean}> {
  id: number = dropdownId++;
  button = React.createRef<HTMLDivElement>();
  state = {
    isOpen: false,
  };

  toggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  }

  close () {
    this.state.isOpen && this.setState({ isOpen: false });
  }

  onDocumentClick (e: MouseEvent) {
    const { current } = this.button;
    if (!current) {
      return;
    }
    const { target } = e;
    // Not all EventTarget are HTMLElements!
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
    if (!(target instanceof HTMLElement)) {
      return;
    }
    // Don't close if click is in our dropdown
    if (current.contains(target) || current === target) {
      return;
    }
    // 🦃🦃🦃🦃
    // Wait to close, otherwise the items won't exist anymore and their onclick handlers won't fire
    setTimeout(() => this.close(), 0);
  }

  componentDidMount () {
    super.componentDidMount();
    dropdowns[this.id] = this;
  }

  componentWillUnmount () {
    super.componentWillUnmount();
    delete dropdowns[this.id];
  }

  render () {
    const { isOpen } = this.state;
    const { className, menuClassName, id, children, disabled, style } = this.props;

    const title = this.props.title || (disabled ? 'No available actions.' : undefined);
    const firstChild = this.props.button
      ? React.cloneElement(this.props.button, { title, disabled, 'data-toggle': 'dropdown' })
      : <button data-toggle="dropdown" disabled={disabled}>
        { title }
      </button>;

    return <div id={id} className={classNames(className || 'dropdown', { isOpen, disabled })} style={style}>
      <div ref={this.button} onClick={disabled ? undefined : this.toggle}>{ firstChild }</div>
      { isOpen && <ul className={classNames(menuClassName || 'dropdown-menu', { isOpen, disabled })}>
        { children() }
      </ul> }
    </div>;
  }
}
