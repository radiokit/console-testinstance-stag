import React from 'react';

const PlaylistSidebar = ({
  children,
}) => (
  <div>sidebar{children}</div>
);

PlaylistSidebar.propTypes = {
  children: React.PropTypes.any,
};

export default PlaylistSidebar;
