import React from 'react';
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import Immutable from 'immutable';

import Table from '../../widgets/admin/table_widget.jsx';
import TableBrowserToolbar from '../../widgets/admin/table_browser_toolbar_widget.jsx';
import TableBrowserToolbarGroup from '../../widgets/admin/table_browser_toolbar_group_widget.jsx';
import Loading from '../../widgets/general/loading_widget.jsx';

export default React.createClass({
  propTypes: {
    attributes: React.PropTypes.object.isRequired,
    actions: React.PropTypes.arrayOf(React.PropTypes.element),
    contentPrefix: React.PropTypes.string.isRequired,
    selectable: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    limit: React.PropTypes.number.isRequired,
    recordsQuery: React.PropTypes.object.isRequired,
    recordIdsQuery: React.PropTypes.object.isRequired,
  },


  getDefaultProps: function() {
    return {
      actions: [],
      selectable: false,
      limit: 100,
    }
  },


  getInitialState: function() {
    return {
      loadingError: false,
      records: null,
      recordsLoaded: false,
      recordsCount: null,
      offset: 0,
      selectedRecordIds: new Immutable.Seq().toIndexedSeq(),
      loadingMatching: false,
      selectedMatching: false,
      selectedAll: false,
    };
  },


  componentDidMount: function() {
    this.props.recordsQuery
      .on("fetch", this.onRecordsQueryFetch);
    this.props.recordIdsQuery
      .on("fetch", this.onRecordIdsQueryFetch);

    this.loadRecords();
  },


  componentWillUnmount: function() {
    this.props.recordsQuery
      .off("fetch", this.onRecordsQueryFetch);
    this.props.recordIdsQuery
      .off("fetch", this.onRecordIdsQueryFetch);
  },


  componentDidUpdate: function(prevProps, prevState) {
    if(prevState.selectedRecordIds != this.state.selectedRecordIds && this.props.onSelect) {
      this.props.onSelect(this.state.selectedRecordIds);
    }
  },


  loadRecords: function() {
    this.props.recordsQuery
      .limit(this.state.offset, this.props.limit)
      .countTotal()
      .fetch();
  },


  loadRecordIds: function() {
    this.props.recordIdsQuery
      .fetch();
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


  onRecordIdsQueryFetch: function(_event, _query, data, meta) {
    if(this.isMounted()) {
      if(this.state.loadingMatching) { // Check if that wasn't cancelled in the meantime
        this.setState({
          selectedMatching: true,
          recordsCount: data.count(),
          selectedRecordIds: data.map((record) => { return record.get("id"); }),
          oldSelectedRecordIds: this.state.selectedRecordIds,
        });
      }
    }
  },


  buildRangeStart: function() {
    return this.state.offset+1;
  },


  buildRangeStop: function() {
    let rangeStop = this.state.offset + this.props.limit;
    if(rangeStop > this.state.recordsCount) {
      return this.state.recordsCount;
    } else {
      return rangeStop;
    }
  },


  onSelectRecord: function(state, recordId, selectedRecordIds) {
    if(this.state.oldSelectedRecordIds && state === false) {
      this.setState({
        loadingMatching: false,
        selectedMatching: false,
        selectedRecordIds: this.state.oldSelectedRecordIds.filterNot((x) => { return x === recordId }),
        oldSelectedRecordIds: undefined
      });

    } else {
      this.setState({
        selectedRecordIds: selectedRecordIds,
      });
    }
  },


  onSelectAll: function(state, selectedRecordIds) {
    this.setState({
      selectedMatching: false,
      selectedRecordIds: selectedRecordIds,
      selectedAll: state,
    });
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


  onOverSelectAllClick: function() {
    this.setState({
      selectedMatching: false,
      loadingMatching: true,
    }, () => {
      this.loadRecordIds();
    });
  },


  onOverClearClick: function() {
    this.setState({
      selectedRecordIds: new Immutable.Seq().toIndexedSeq(),
      selectedMatching: false,
      loadingMatching: false,
    });
  },


  render: function() {
    if(this.state.loadingError) {
      return (<Alert type="error" infoTextKey="general.errors.communication.general" />);

    } else {
      if(this.state.recordsLoaded === false) {
        return (<Loading info={true} infoTextKey={this.props.contentPrefix + ".loading"} />);

      } else {
        return (
          <div className="small-padding">
            <TableBrowserToolbar>
              {this.props.children}

              <TableBrowserToolbarGroup position="right">
                <Translate className="btn" style={{cursor: "default"}} content="widgets.admin.table_browser.pagination.current.label" rangeStart={this.buildRangeStart()} rangeStop={this.buildRangeStop()} rangeTotal={this.state.recordsCount} component="div" />
                <button type="button" className="btn btn-default-light" onClick={this.onPreviousPageClick} disabled={this.state.offset === 0} title={Counterpart.translate("widgets.admin.table_browser.pagination.next.title")}><i className="mdi mdi-chevron-left"/></button>
                <button type="button" className="btn btn-default-light" onClick={this.onNextPageClick} disabled={this.buildRangeStop() === this.state.recordsCount} title={Counterpart.translate("widgets.admin.table_browser.pagination.previous.title")}><i className="mdi mdi-chevron-right"/></button>
              </TableBrowserToolbarGroup>
            </TableBrowserToolbar>

            {() => {
              if(this.state.selectedAll && this.props.limit < this.state.recordsCount) {
                if(this.state.selectedMatching) {
                  return (
                    <div className="alert alert-slim alert-warning text-center">
                      <Translate component="span" content="widgets.admin.table_browser.selection.over.confirmation.message" count={this.state.recordsCount} />
                      <Translate component="a" content="widgets.admin.table_browser.selection.over.confirmation.action" onClick={this.onOverClearClick} />
                    </div>
                  );

                } else if(this.state.loadingMatching) {
                  return (
                    <div className="alert alert-slim alert-info text-center">
                      <Translate component="span" content="widgets.admin.table_browser.selection.over.loading.message" />
                    </div>
                  );

                } else {
                  return (
                    <div className="alert alert-slim alert-info text-center">
                      <Translate component="span" content="widgets.admin.table_browser.selection.over.warning.message" count={this.props.limit} />
                      <Translate component="a" content="widgets.admin.table_browser.selection.over.warning.action" onClick={this.onOverSelectAllClick} />
                    </div>
                  );
                }
              }
            }()}

            <Table selectedRecordIds={this.state.selectedRecordIds} onSelectRecord={this.onSelectRecord} onSelectAll={this.onSelectAll} selectable={this.props.selectable} attributes={this.props.attributes} actions={this.props.actions} contentPrefix={this.props.contentPrefix} records={this.state.records} />

            <TableBrowserToolbar>
              <TableBrowserToolbarGroup position="right">
                <Translate className="btn" style={{cursor: "default"}} content="widgets.admin.table_browser.pagination.current.label" rangeStart={this.buildRangeStart()} rangeStop={this.buildRangeStop()} rangeTotal={this.state.recordsCount} component="div" />
                <button type="button" className="btn btn-default-light" onClick={this.onPreviousPageClick} disabled={this.state.offset === 0} title={Counterpart.translate("widgets.admin.table_browser.pagination.previous.title")}><i className="mdi mdi-chevron-left"/></button>
                <button type="button" className="btn btn-default-light" onClick={this.onNextPageClick} disabled={this.buildRangeStop() === this.state.recordsCount} title={Counterpart.translate("widgets.admin.table_browser.pagination.next.title")}><i className="mdi mdi-chevron-right"/></button>
              </TableBrowserToolbarGroup>
            </TableBrowserToolbar>
          </div>
        );
      }
    }
  }
});
