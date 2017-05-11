import React from 'react';
import _ from 'lodash';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.string,
    attribute: React.PropTypes.string.isRequired,
    selectable: React.PropTypes.bool.isRequired,
    truncateLength: React.PropTypes.number.isRequired,
  },


  getDefaultProps: function() {
    return {
      truncateLength: 60,
      selectable: false,
    };
  },


  render: function() {
    let channelName = this.props.value;

    window.data.query('agenda', 'Broadcast.Channel')
      .where('id', 'eq', this.props.value)
      .select('name')
      .on('fetch', (_e, _z, data) => {
        const name = data.first();

        if (name) this.channelName = name.get('name');
      })
      .fetch();

    const truncatedValue = _.truncate(channelName, {
      length: this.props.truncateLength,
      separator: /\.,? +/,
      omission: '…',
    });

    let titleValue = null;
    if(channelName !== truncatedValue) {
      titleValue = channelName;
    }

    if(this.props.selectable) {
      return (<span className="selectable" title={titleValue}>{truncatedValue}</span>);
    } else {
      return (<span title={titleValue}>{truncatedValue}</span>);
    }
  }
});
