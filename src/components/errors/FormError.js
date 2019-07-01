import React from './node_modules/react';

export function FormError(props) {
  if (props.isHidden) { return null; }
  return <div>{props.errorMessage}</div>;
}
