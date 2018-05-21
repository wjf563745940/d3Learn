import React from 'react';
import CheckPermissions from './CheckPermissions';

class Authorized extends React.Component {
  render() {
    const { children, authority, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    console.log("childrenRender=",childrenRender)
    return CheckPermissions(authority, childrenRender, noMatch);
  }
}

export default Authorized;
