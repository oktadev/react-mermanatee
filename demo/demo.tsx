import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Dropdown } from '../src/index';

const children = () => <>
  <div onClick={() => window.alert('foo')}>foo</div>
  <div onClick={() => window.alert('bar')}>bar</div>
</>;

const renderButton = (onClick, title, disabled) => <button onClick={onClick} title={title} disabled={disabled}>
  { disabled
    ? "A disabled dropdown"
    : "A dropdown"
  }
</button>;

const Demo = () => <>
  <Dropdown renderButton={renderButton}>
    { children }
  </Dropdown>
  <Dropdown disabled renderButton={renderButton}>
    { children }
  </Dropdown>
</>;


ReactDom.render(<Demo />, document.body);