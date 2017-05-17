import React from 'react';
import RadioKit from '../../services/RadioKit.js';

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object.isRequired,
  },


  childContextTypes: {
    currentTagItemId: React.PropTypes.object,
  },


  getInitialState() {
    return {
      currentTagItemId: null,
      loaded: false,
      error: false,
    }
  },

  getChildContext() {
    return {
      currentTagItemId: this.state.currentTagItemId,
    };
  },

  componentDidMount() {
    this.queryTagItemId();
  },


  queryTagItemId() {
    RadioKit
      .query('vault', 'Data.Metadata.Item')
      .select('id', 'tag_item.id')
      .joins('tag_item')
      .where('value_string', 'eq', this.context.currentUser.get('email')) // FIXME make better condition
      .on('fetch', (_a, _b, data) => {
        if(data.size === 1) {
          // fajnie
          this.setState({
            currentTagItemId: data.first().get('tag_item').get('id'),
            loaded: true,
            error: false,
          });

        } else {
          // niefajnie
          this.setState({
            loaded: true,
            error: true,
          });
        }
      })
      .on('error', () => {
        this.setState({
          error: true,
        });
      })
      .fetch();
  },


  render: function() {
    if(this.state.error) {
      return (<div>DUPA</div>); //FIXME
    }

    if(this.state.loaded === false) {
      return (<div>LOŁDING</div>); //FIXME
    }

    return (<div>{this.props.children}</div>);
  }
});
