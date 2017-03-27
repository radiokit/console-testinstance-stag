import React from 'react';

export default React.createClass({
  propTypes: {
    record: React.PropTypes.object.isRequired,
    value: React.PropTypes.string,
  },


  contextTypes: {
    availableAccounts: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  },


  getInitialState() {
    return {
      loaded: false,
      clientUser: null,
    };
  },


  componentDidMount() {
    if (this.props.record.has('references') &&
       this.props.record.get('references') &&
       this.props.record.get('references').has('client_user_id')) {
      this.context.data
        .query('jungle', 'Client.User')
        .select('id', 'name', 'email')
        .where('id', 'eq', this.props.record.get('references').get('client_user_id'))
        .on('fetch', (_event, _query, data) => {
          if (this.isMounted()) {
            if (data.size !== 0) {
              this.setState({
                clientUser: data.first(),
                loaded: true,
              });
            } else {
              this.setState({
                loaded: true,
              });
            }
          }
        })
        .fetch();
    }
  },


  render() {
    if (this.props.record.has('references') &&
       this.props.record.get('references') &&
       this.props.record.get('references').has('client_user_id')) {
      if (this.state.loaded && this.state.clientUser) {
        const userInfo = this.state.clientUser.get('name') ?
          this.state.clientUser.get('name') : this.state.clientUser.get('email');

        return (<span>{userInfo}</span>);
      }

      return (<span />);
    }

    return (<span />);
  },
});
