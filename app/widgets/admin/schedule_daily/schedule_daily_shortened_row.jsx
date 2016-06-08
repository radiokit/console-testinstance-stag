import React from 'react';

import { shouldComponentUpdate } from '../../../helpers/immutable_component';

const ShortenedRow = React.createClass({
  propTypes: {
    items: React.PropTypes.object.isRequired,
    className: React.PropTypes.string.isRequired,
  },

  shouldComponentUpdate,

  render() {
    const { props } = this;
    return (
      <div className={props.className}>
        {
          props
            .items
            .toArray()
            .sort((a, b) => new Date(a.get('start_at')) - new Date(b.get('start_at')))
            .map((item, i) => (
              <span key={i}>
                {`${item.get('name') || item.get('id')}`}
              </span>
            ))
        }
      </div>
    );
  },
});

export default ShortenedRow;
