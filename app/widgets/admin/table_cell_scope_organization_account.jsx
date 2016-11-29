import React from 'react';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.string,
  },


  // FIXME
  contextTypes: {
    availableUserAccounts: React.PropTypes.object.isRequired,
  },


  render: function() {
    if(this.props.record.has('references') && this.props.record.get('references') && this.props.record.get('references').has('organization_account_id')) {
      return (<span>{this.context.availableUserAccounts.find((userAccount) => { return userAccount.get('id') === this.props.record.get('references').get('organization_account_id'); }).get('name')}</span>);
    } else {
      return (<span/>);
    }
  }
});
