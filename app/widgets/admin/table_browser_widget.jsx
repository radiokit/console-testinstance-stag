import React from 'react';
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';

import Table from '../../widgets/admin/table_widget.jsx';
import Loading from '../../widgets/general/loading_widget.jsx';

export default React.createClass({
  propTypes: {
    attributes: React.PropTypes.object.isRequired,
    actions: React.PropTypes.arrayOf(React.PropTypes.element),
    contentPrefix: React.PropTypes.string.isRequired,
    selectable: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    limit: React.PropTypes.number.isRequired,
    query: React.PropTypes.object.isRequired,
  },


  getDefaultProps: function() {
    return {
      actions: [],
      selectable: false,
      limit: 100
    }
  },


  getInitialState: function() {
    return {
      loadingError: false,
      availableRecords: null,
      loadedRecords: false,
      countRecords: null,
      offset: 0,
    };
  },


  componentDidMount: function() {
    this.props.query
      .on("fetch", this.onQueryFetch);

    this.loadRecords();
  },


  componentWillUnmount: function() {
    this.props.query
      .off("fetch", this.onQueryFetch);
  },


  loadRecords: function() {
    this.props.query
      .limit(this.state.offset, this.props.limit)
      .countTotal()
      .fetch();
  },


  onQueryFetch: function(_event, _query, data, meta) {
    if(this.isMounted()) {
      this.setState({
        loadedRecords: true,
        availableRecords: data,
        countRecords: meta.get("count_total")
      });
    }
  },


  buildRangeStart: function() {
    return this.state.offset+1;
  },


  buildRangeStop: function() {
    let rangeStop = this.state.offset + this.props.limit;
    if(rangeStop > this.state.countRecords) {
      return this.state.countRecords;
    } else {
      return rangeStop;
    }
  },


  onSelect: function(selected) {
    if(this.props.onSelect) {
      this.props.onSelect(selected);
    }
  },


  onNextPageClick: function() {
    this.setState({
      offset: this.state.offset + this.props.limit
    }, () => {
      this.loadRecords();
    });
  },


  onPreviousPageClick: function() {
    this.setState({
      offset: this.state.offset - this.props.limit
    }, () => {
      this.loadRecords();
    });
  },


  render: function() {
    if(this.state.loadingError) {
      return (<Alert type="error" infoTextKey="general.errors.communication.general" />);

    } else {
      if(this.state.loadedRecords === false) {
        return (<Loading info={true} infoTextKey="apps.shows.files.index.loading"/>);

      } else {
        return (
          <div className="small-padding">
            <div className="btn-toolbar margin-bottom-xl">
              {this.props.children}

              <div className="btn-group pull-right">
                <Translate className="btn" style={{cursor: "default"}} content="widgets.admin.table_browser.pagination.current.label" rangeStart={this.buildRangeStart()} rangeStop={this.buildRangeStop()} rangeTotal={this.state.countRecords} component="div" />
                <button type="button" className="btn btn-default-light" onClick={this.onPreviousPageClick} disabled={this.state.offset === 0} title={Counterpart.translate("widgets.admin.table_browser.pagination.next.title")}><i className="mdi mdi-chevron-left"/></button>
                <button type="button" className="btn btn-default-light" onClick={this.onNextPageClick} disabled={this.buildRangeStop() === this.state.countRecords} title={Counterpart.translate("widgets.admin.table_browser.pagination.previous.title")}><i className="mdi mdi-chevron-right"/></button>
              </div>
            </div>

            <Table onSelect={this.onSelect} selectable={this.props.selectable} attributes={this.props.attributes} actions={this.props.actions} contentPrefix={this.props.contentPrefix} records={this.state.availableRecords} />

            <div className="btn-toolbar margin-bottom-xl">
              <div className="btn-group pull-right">
                <Translate className="btn" style={{cursor: "default"}} content="widgets.admin.table_browser.pagination.current.label" rangeStart={this.buildRangeStart()} rangeStop={this.buildRangeStop()} rangeTotal={this.state.countRecords} component="div" />
                <button type="button" className="btn btn-default-light" onClick={this.onPreviousPageClick} disabled={this.state.offset === 0} title={Counterpart.translate("widgets.admin.table_browser.pagination.next.title")}><i className="mdi mdi-chevron-left"/></button>
                <button type="button" className="btn btn-default-light" onClick={this.onNextPageClick} disabled={this.buildRangeStop() === this.state.countRecords} title={Counterpart.translate("widgets.admin.table_browser.pagination.previous.title")}><i className="mdi mdi-chevron-right"/></button>
              </div>
            </div>
          </div>
        );
      }
    }
  }
});
