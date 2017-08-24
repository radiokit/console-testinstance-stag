import React, { PropTypes } from 'react';

const StreamMetadataApp = ({ children }) => (<div>{children}</div>);

StreamMetadataApp.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StreamMetadataApp;
