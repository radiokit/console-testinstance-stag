import React from 'react';
// import { Data } from 'radiokit-api';

export default React.createClass({

  contextTypes: {
    currentUser: React.PropTypes.object.isRequired,

  },

// childContextTypes: {
//   currentTagItemId: React.PropTypes.object,
//   },
//
// getChildContext() {
//   return {
//   currentUser: this.state.currentUser,
//   };
// },

initializeCurrentUser (currentUser) {
    const currentUserEmail = currentUser.get('email');
},

getInitialState() {
  return {
    currentTagItemId: null,
    currentUser: null,
  }
},

  componentDidMount() {
    this.queryTagItemId();
  },

  queryTagItemId() {
    RadioKit
      .query('vault', 'Data.Metadata.Item')
      .select('id', 'tag_item.id')
      .where('value_string', 'eq', this.context.currentUserEmail)
      .on('fetch', (data) => {
        this.setState({
          currentTagItemId: this.currentTagItemId,
          loaded: true,
        });
      })
      .on('error', () => {
        this.setState({
          error: true,
        });
      })
      .fetch();
  },


  render: function() {
    return (<div>{this.props.children}</div>);
  }





//   render: function() {
// return
//     if (this.queryTagItemId = null){
//        <div></div>
//     }else{
//       (<div>{this.props.children}</div>)}
// }

  // getChildContext() {
  //   return {
  //     currentTagItemId: this.state.currentTagItemId,
  //   }
  // }
});
