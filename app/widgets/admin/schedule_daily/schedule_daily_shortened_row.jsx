import React from 'react';
import moment from 'moment';

function getTimestamp(item) {
  return moment(item.get('start_at')).format();
}

const ShortenedRow = (props) => (
  <div className={props.className}>
    {props.items.sortBy(item => item.toJS().start_at).map(item => (
      `${item.get('name') || item.get('id')} [${getTimestamp(item)}], `
    ))}
  </div>
);

ShortenedRow.propTypes = {
  items: React.PropTypes.object.isRequired,
  className: React.PropTypes.string.isRequired,
};

export default ShortenedRow;
