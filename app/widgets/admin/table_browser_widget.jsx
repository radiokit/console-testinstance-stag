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
    query: React.PropTypes.object.isRequired,
  },


  getDefaultProps: function() {
    return {
      actions: [],
      selectable: false,
      limit: 3,
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
      selectedAllMatchingCriteria: false,
      selectedAll: false,
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
        recordsLoaded: true,
        records: data,
        recordsCount: meta.get("count_total")
      });
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


  onSelectRecord: function(state, record, selectedRecordIds) {
    this.setState({
      selectedRecordIds: selectedRecordIds,
    }, () => { // FIXME move callbacks to componentDidUpdate
      if(this.props.onSelect) {
        this.props.onSelect(selectedRecordIds);
      }
    });
  },


  onSelectAll: function(state, selectedRecordIds) {
    this.setState({
      selectedAllMatchingCriteria: false,
      selectedRecordIds: selectedRecordIds,
      selectedAll: state,
    }, () => { // FIXME move callbacks to componentDidUpdate
      if(this.props.onSelect) {
        this.props.onSelect(selectedRecordIds);
      }
    })
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
      selectedAllMatchingCriteria: true,
    });
  },


  onOverClearClick: function() {
    this.setState({
      selectedRecordIds: new Immutable.Seq().toIndexedSeq(),
      selectedAllMatchingCriteria: false,
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
                if(this.state.selectedAllMatchingCriteria) {
                  return (
                    <div className="alert alert-slim alert-warning text-center">
                      <Translate component="span" content="widgets.admin.table_browser.selection.over.confirmation.message" count={this.state.recordsCount} />
                      <Translate component="a" content="widgets.admin.table_browser.selection.over.confirmation.action" onClick={this.onOverClearClick} />
                    </div>
                  );

                } else {
                  return (
                    <div className="alert alert-slim alert-warning text-center">
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
