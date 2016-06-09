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
          map(
            map(
              map(
                props.items,
                item => [new Date(item.get('start_at')), item]
              )
                .sort(([a], [b]) => a - b),
              ([, item]) => item
            ),
            itemToSpan
          )
        }
      </div>
    );
  },
});

export default ShortenedRow;

function map(collection, processor) {
  const result = [];
  collection
    .forEach((item, i) => {
      result.push(processor(item, i));
    });
  return result;
}

function itemToSpan(item, i) {
  return (
    <span key={i}>
      {`${item.get('name') || item.get('id')}`}
    </span>
  );
}
