import React from 'react';

export default React.createClass({

// contextTypes: {
//   currentUser: React.PropTypes.object.isRequired,
//
// },

childContextTypes: {
  currentTagItemId: React.PropTypes.object,
},

getInitialState() {
  return {
    currentTagItemId: null,
  }
},

  componentDidMount() {
    this.queryTagItemId();
  },

  queryTagItemId() {
    RadioKit
      .query('vault', 'Data.Metadata.Item')
      .select('id', 'tag_item.id')
      .where('value_string', 'eq', this.context.currentUser)
      .on('fetch', (data) => {
        this.setState({
          currentTagItemId: this.currentTagItemId,
          loaded: true,
        });
      })
      .on('error', () => {
        this.setState({
          loaded: true,
          error: true,
        });
      })
      .fetch();
  },




  render: function() {
return
    if (this.state = null){
       <div></div>
    }else{(<div>{this.props.children}</div>);

  }
}

  // getChildContext() {
  //   return {
  //     currentTagItemId: this.state.currentTagItemId,
  //   }
  // }
});
