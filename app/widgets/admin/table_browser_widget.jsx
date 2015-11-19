import React from 'react';
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';

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
      availableRecords: null,
      loadedRecords: false,
      countRecords: null,
      offset: 0,
      headerSelected: false,
      overSelected: false,
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
    console.log("LOAD!");
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


  onSelectRecord: function(state, record, selected) {
    if(this.props.onSelect) {
      this.props.onSelect(selected);
    }
  },


  onSelectAll: function(state, selected) {
    this.setState({
      headerSelected: state,
      overSelected: false,
    }, () => { // FIXME move callbacks to componentDidUpdate
      if(this.props.onSelect) {
        this.props.onSelect(selected);
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
      overSelected: true,
    });
  },


  onOverClearClick: function() {
    this.setState({
      headerSelected: false,
      overSelected: false,
    });
  },


  render: function() {
    if(this.state.loadingError) {
      return (<Alert type="error" infoTextKey="general.errors.communication.general" />);

    } else {
      if(this.state.loadedRecords === false) {
        return (<Loading info={true} infoTextKey={this.props.contentPrefix + ".loading"} />);

      } else {
        return (
          <div className="small-padding">
            <TableBrowserToolbar>
              {this.props.children}

              <TableBrowserToolbarGroup position="right">
                <Translate className="btn" style={{cursor: "default"}} content="widgets.admin.table_browser.pagination.current.label" rangeStart={this.buildRangeStart()} rangeStop={this.buildRangeStop()} rangeTotal={this.state.countRecords} component="div" />
                <button type="button" className="btn btn-default-light" onClick={this.onPreviousPageClick} disabled={this.state.offset === 0} title={Counterpart.translate("widgets.admin.table_browser.pagination.next.title")}><i className="mdi mdi-chevron-left"/></button>
                <button type="button" className="btn btn-default-light" onClick={this.onNextPageClick} disabled={this.buildRangeStop() === this.state.countRecords} title={Counterpart.translate("widgets.admin.table_browser.pagination.previous.title")}><i className="mdi mdi-chevron-right"/></button>
              </TableBrowserToolbarGroup>
            </TableBrowserToolbar>

            {() => {
              if(this.state.headerSelected && this.props.limit < this.state.countRecords) {
                if(this.state.overSelected) {
                  return (
                    <div className="alert alert-slim alert-warning text-center">
                      <Translate component="span" content="widgets.admin.table_browser.selection.over.confirmation.message" count={this.state.countRecords} />
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

            <Table onSelectRecord={this.onSelectRecord} onSelectAll={this.onSelectAll} selectable={this.props.selectable} attributes={this.props.attributes} actions={this.props.actions} contentPrefix={this.props.contentPrefix} records={this.state.availableRecords} />

            <TableBrowserToolbar>
              <TableBrowserToolbarGroup position="right">
                <Translate className="btn" style={{cursor: "default"}} content="widgets.admin.table_browser.pagination.current.label" rangeStart={this.buildRangeStart()} rangeStop={this.buildRangeStop()} rangeTotal={this.state.countRecords} component="div" />
                <button type="button" className="btn btn-default-light" onClick={this.onPreviousPageClick} disabled={this.state.offset === 0} title={Counterpart.translate("widgets.admin.table_browser.pagination.previous.title")}><i className="mdi mdi-chevron-left"/></button>
                <button type="button" className="btn btn-default-light" onClick={this.onNextPageClick} disabled={this.buildRangeStop() === this.state.countRecords} title={Counterpart.translate("widgets.admin.table_browser.pagination.next.title")}><i className="mdi mdi-chevron-right"/></button>
              </TableBrowserToolbarGroup>
            </TableBrowserToolbar>
          </div>
        );
      }
    }
  }
});
