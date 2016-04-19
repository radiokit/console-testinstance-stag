import React from 'react';

const AppIndex = props => (<div>{props.children}</div>);

AppIndex.propTypes = {
  children: React.PropTypes.any,
};

export default AppIndex;
