import React, { FunctionComponent, HTMLAttributes }  from 'react';
import { Callout } from 'react-odyssey';


export const Spinner: FunctionComponent<HTMLAttributes<HTMLElement>> = () => <i className="fas fa-lg fa-spin fa-circle-notch sft-loading-spinner" />;

export const Loading: FunctionComponent<{what: string}> = ({ what }) => <h4 className="sft-title text-center">
  <Spinner /> Loading {what}…
</h4>;


export const LoadingPanel: FunctionComponent<{what?: string}> = ({ what="" }) => <div className="col-sm-12 sft-loading">
  <Loading what={what} />
</div>;


export type ErrorMsgProps = {
  error?: Error;
  default?: string;
};

export class ErrorMsg extends React.Component<ErrorMsgProps> {
  render () {
    const { children, error } = this.props;
    if (!error) {
      if (children) {
        return <div>{children}</div>;
      }
      return null;
    }
    return <Callout kind="error">
      { error.message ? error.message : this.props.default }
    </Callout>;
  }
}


export type StatusProps = {
  error?: Error;
  loaded: boolean;
  what?: string;
  defaultError?: string;
  children?: any;
};

export const Status: FunctionComponent<StatusProps> = ({ error, loaded, children, what="", defaultError="" }) => {
  if (!loaded) {
    return <LoadingPanel what={what} />;
  }
  if (error) {
    return <ErrorMsg error={error} default={defaultError} />;
  }
  return children;
};
