import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Button } from 'react-odyssey';
import { Dropdown, Status, SafetyFirst } from '../src/index';

class StatusDemo extends SafetyFirst<{}, {error?: Error; loaded: boolean}> {
  state = {
    error: undefined,
    loaded: false,
  }

  componentDidMount () {
    super.componentDidMount();
    this.load();
  }

  load (error?: Error) {
    this.setState({
      error: undefined,
      loaded: false,
    });
    setTimeout(() => this.setState({ loaded: true, error }), 1000);
  }

  render () {
    const { error, loaded } = this.state;
    return <>
      <div style={{ minHeight: 150 }}>
        <Status error={error} loaded={loaded}>
          <p>
            Loaded content is here.
          </p>
        </Status>
      </div>
      <Button onClick={() => this.load()}>Load</Button>
      <Button isDanger onClick={() => this.load(new Error('Example error message.'))}>Load with error</Button>
    </>;
  }
}

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
  <StatusDemo />
</>;

ReactDom.render(<Demo />, document.body);
