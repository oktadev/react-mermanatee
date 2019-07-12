import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Dropdown } from '../src/index';

const children = () => <>
  <div onClick={() => window.alert('foo')}>foo</div>
  <div onClick={() => window.alert('bar')}>bar</div>
 </>;

const Demo = () => <>
  <Dropdown title="Dropdown">
    { children }
  </Dropdown>
</>;


ReactDom.render(<Demo />, document.body);