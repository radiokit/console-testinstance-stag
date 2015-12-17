import React from 'react';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.string,
  },


  contextTypes: {
    availableUserAccounts: React.PropTypes.object.isRequired,
  },


  render: function() {
    if(this.props.record.has("references") && this.props.record.get("references") && this.props.record.get("references").has("user_account_id")) {
      return (<span>{this.context.availableUserAccounts.find((userAccount) => { return userAccount.get("id") === this.props.record.get("references").get("user_account_id"); }).get("name_custom")}</span>);
    } else {
      return (<span/>);
    }
  }
});
