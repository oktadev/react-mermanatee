import React from 'react';

export class SafetyFirst<P, S> extends React.Component<P, S> {
  unMounted_: boolean;
  isMounted_: boolean;
  public setState: typeof React.Component.prototype.setState;

  constructor (props: P, ...args) {
    super(props, ...args);
    this.unMounted_ = false;
    this.isMounted_ = false;
    const setState_ = SafetyFirst.prototype.setState;
    this.setState = (...args) => {
      if (this.unMounted_ || !this.isMounted_) {
        return false;
      }

      setState_.call(this, ...args);
      return true;
    };
  }

  componentWillUnmount () {
    this.unMounted_ = true;
    this.isMounted_ = false;
  }

  componentDidMount () {
    this.isMounted_ = true;
  }
}
