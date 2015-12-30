import React from 'react';
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import Immutable from 'immutable';

import Loading from '../../widgets/general/loading_widget.jsx';

export default React.createClass({
  propTypes: {
    attributes: React.PropTypes.object.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    recordsQuery: React.PropTypes.object.isRequired,
    recordsLinkFunc: React.PropTypes.func,
  },


  getInitialState: function() {
    return {
      loadingError: false,
      records: null,
      recordsLoaded: false,
    };
  },


  componentDidMount: function() {
    this.recordsQueryFull = this.props.recordsQuery
      .clone()

    this.recordsQueryFull
      .on("fetch", this.onRecordsQueryFetch);

    this.loadRecords();
  },


  componentWillUnmount: function() {
    this.recordsQueryFull.teardown();
  },


  loadRecords: function() {
    this.recordsQueryFull.fetch();
  },


  loadRecordIds: function() {
    this.recordsQueryIds.fetch();
  },


  onRecordsQueryFetch: function(_event, _query, data, meta) {
    if(this.isMounted()) {
      this.setState({
        recordsLoaded: true,
        records: data,
        recordsCount: meta.get("count_total")
      });
    }
  },


  onRecordClick: function(record) {
    if(this.props.recordsLinkFunc) {
      this.props.recordsLinkFunc(record);
    }
  },


  render: function() {
    if(this.state.loadingError) {
      return (<Alert type="error" infoTextKey="general.errors.communication.general" />);

    } else {
      if(this.state.recordsLoaded === false) {
        return (<Loading info={true} infoTextKey={this.props.contentPrefix + ".loading"} />);

      } else {
        return (
          <ul className="list divider-full-bleed">
            {this.state.records.map((record) => {
              return (
                <li key={record.get("id")} className="tile">
                  <a onClick={this.onRecordClick.bind(this, record)} className="tile-content">
                    <div className="tile-text">
                      {record.get("name")}
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
        );
      }
    }
  }
});
