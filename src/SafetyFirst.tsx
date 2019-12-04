import React from 'react';

export class SafetyFirst<P, S, SS=any> extends React.Component<P, S, SS> {
  unMounted_: boolean = false;
  isMounted_: boolean = false;
  public setState: typeof React.Component.prototype.setState;

  constructor (props: P, ...args) {
    super(props, ...args);
    const setState_ = SafetyFirst.prototype.setState;
    this.setState = (...args2) => {
      const [ state, cb ] = args2;
      if (!this.isMounted_ && !this.unMounted_) {
        this.state = Object.assign({}, this.state, state);
      }
      if (this.unMounted_ || !this.isMounted_) {
        if (typeof cb === 'function') {
          cb();
        }
        return false;
      }

      setState_.call(this, ...args2);
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
