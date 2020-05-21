
// Hello.jsx
import React from 'react';

import { Dropdown } from '../src/Dropdown';


const renderButton = (onClick, title, disabled) => <button disabled={disabled} onClick={onClick} style={{ border: '1px solid black' }}>
  Dropdown
</button>;

const Dropdown_ = () => <Dropdown renderButton={renderButton}>
  {
    () => <div style={{ border: '1px solid grey', width: 150 }}>
      <div style={{ width: 150, padding: 7 }}>one</div>
      <div style={{ width: 150, padding: 7 }}>two</div>
      <div style={{ width: 150, padding: 7 }}>three</div>
    </div>
  }
</Dropdown>;

export default {
  Dropdown: <>
    <Dropdown_ />
    <br/>
    <Dropdown_ />
  </>,
};


