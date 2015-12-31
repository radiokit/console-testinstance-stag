import React from 'react';

import ListBrowser from '../../../widgets/admin/list_browser_widget.jsx';

export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    indexQueryFunc: React.PropTypes.func,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    readEnabled: React.PropTypes.bool.isRequired,
    createEnabled: React.PropTypes.bool.isRequired,
    deleteEnabled: React.PropTypes.bool.isRequired,
  },


  contextTypes: {
    history: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
  },


  getDefaultProps: function() {
    return {
      readEnabled: true,
      createEnabled: true,
      deleteEnabled: true,
    }
  },


  /**
   * Callback called when user clicked a row in the table.
   */
  onRecordClick: function(record) {
    let currentLocation = this.context.location.pathname.split("/");
    currentLocation.pop();
    let newLocation = currentLocation.join("/") + "/show/" + record.get("id");
    this.context.history.replaceState(null, newLocation);
  },


  /**
   * Builds default index query for app/model specified in props.
   *
   * To avoid necessity to manually pass select()ed fields in most cases
   * it will try to determine which fields should be queried. It always add "id" and "name".
   *
   * After all it calls `indexQueryFunc` passed to props (if it was defined).
   * It passes generic query mentioned before as the only argument and expects
   * that query will be returned. That gives chance to parent component to modify
   * query before it is passed further.
   */
  buildIndexQuery: function() {
    let query = window.data.query(this.props.app, this.props.model).select("id", "name");

    if(this.props.indexQueryFunc) {
      query = this.props.indexQueryFunc(query);
    }

    return query;
  },


  render: function() {
    return (
      <ListBrowser attributes={this.props.attributes} contentPrefix={`${this.props.contentPrefix}.index.table`} recordsQuery={this.buildIndexQuery()} recordsLinkFunc={this.props.readEnabled === true ? this.onRecordClick : undefined}/>
    );
  }
});
