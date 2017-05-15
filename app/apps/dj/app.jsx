import React from 'react';
import RadioKitAPI from 'radiokit-api';

export default React.createClass({


childContextTypes: {
  currentTagItemId: React.PropTypes.object,
  currentUser: React.PropTypes.object,
  },


  getInitialState() {
    return {
      currentTagItemId: null,
      currentUser: null,
    }
  },

getChildContext() {
  return {
    currentTagItemId: this.context.currentTagItemId,
    currentUser: this.context.currentUser,

  };
},

initializeCurrentUser (currentUser) {
    const currentUserEmail = currentUser.get('email');

},



  // componentDidMount() {
  //   this.queryTagItemId();
  // },

  queryTagItemId() {
    this.state.data
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
