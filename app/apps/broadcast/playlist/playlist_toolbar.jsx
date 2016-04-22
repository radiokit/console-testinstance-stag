import React from 'react';

const PlaylistToolbar = ({
  children,
}) => (
  <div>toolbar{children}</div>
);

PlaylistToolbar.propTypes = {
  children: React.PropTypes.any,
};

export default PlaylistToolbar;
