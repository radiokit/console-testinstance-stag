import React from 'react';
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import Immutable from 'immutable';

import Table from '../../widgets/admin/table_widget.jsx';
import Toolbar from '../../widgets/admin/toolbar_widget.jsx';
import ToolbarButton from '../../widgets/admin/toolbar_button_widget.jsx';
import ToolbarGroup from '../../widgets/admin/toolbar_group_widget.jsx';
import Loading from '../../widgets/general/loading_widget.jsx';

export default React.createClass({
  propTypes: {
    attributes: React.PropTypes.object.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    selectable: React.PropTypes.bool,
    searchable: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    limit: React.PropTypes.number.isRequired,
    recordsQuery: React.PropTypes.object.isRequired,
    recordsLinkFunc: React.PropTypes.func,
    requestFullRecords: React.PropTypes.bool,
    selectAllOnMount: React.PropTypes.bool,
    onlyUpperPagination: React.PropTypes.bool,
    hidePaginationCounter: React.PropTypes.bool,
  },


  getDefaultProps: function() {
    return {
      selectable: false,
      searchable: false,
      limit: 100,
      hidePaginationCounter: false,
      onylUpperPagination: false,
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
      sortedAttribute: null,
      sortedDirection: null,
      selectAll: false,
      searchTerm: null,
    };
  },

  buildRecordsQuery() {
    this.recordsQueryFull = this.props.recordsQuery
      .clone()
      .offset(this.state.offset) // FIXME update this on component update
      .limit(this.props.limit)
      .countTotal()

    this.recordsQueryIds = this.props.recordsQuery
      .clone()
      .clearSelect()
      .select("id")

    if(this.state.searchTerm) {
      this.recordQueryFull = this.recordsQueryFull
        .scope("search", this.state.searchTerm);

      this.recordQueryIds = this.recordsQueryIds
        .scope("search", this.state.searchTerm);
    }

    if(this.state.sortedAttribute) {
      if(typeof(this.props.attributes[this.state.sortedAttribute].sortableFunc) === "function") {
        this.recordsQueryFull = this.props.attributes[this.state.sortedAttribute].sortableFunc(this.recordsQueryFull, this.state.sortedAttribute, this.state.sortedDirection);

      } else {
        this.recordsQueryFull = this.recordsQueryFull.order(this.state.sortedAttribute, this.state.sortedDirection)
      }
    }

    this.recordsQueryFull
      .on("fetch", this.onRecordsQueryFetch);
    this.recordsQueryIds
      .on("fetch", this.onRecordIdsQueryFetch);
  },

  componentWillMount: function() {
    if (this.props.selectAllOnMount) {
      this.props.recordsQuery
        .on('fetch', (_e, _z, data) => {
          const selectedRecordIds = data.map((record) => { return record.get("id");  });
          this.setState({
            selectedRecordIds: selectedRecordIds,
          });
          this.props.onSelect(selectedRecordIds, data);
        })
        .fetch();
    }
  },

  componentDidMount: function() {
    this.buildRecordsQuery();
    this.loadRecords();
  },

  componentWillUnmount: function() {
    this.recordsQueryFull.teardown();
    this.recordsQueryIds.teardown();
  },

  reloadData() {
    this.buildRecordsQuery();
    this.loadRecords();
  },

  componentDidUpdate: function(prevProps, prevState) {
    if(prevState.selectedRecordIds != this.state.selectedRecordIds && this.props.onSelect) {
      if(this.props.requestFullRecords && this.props.requestFullRecords === true && this.state.records){
         const selectedRecords = this.state.records.filter((record) => this.state.selectedRecordIds.includes(record.get('id')));
         this.props.onSelect(this.state.selectedRecordIds, selectedRecords);
      }
      else{
        this.props.onSelect(this.state.selectedRecordIds);
      }
    }
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

  onSort: function(attribute, direction) {
    this.setState({
      sortedAttribute: attribute,
      sortedDirection: direction
    }, () => {
      this.reloadData();
    });
  },


  onNextPageClick: function() {
    this.setState({
      offset: this.state.offset + this.props.limit
    }, () => {
      this.reloadData();
    });
  },

  onPreviousPageClick: function() {
    this.setState({
      offset: this.state.offset - this.props.limit
    }, () => {
      this.reloadData();
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


  onRefreshClick: function() {
    this.reloadData();
  },

  onSearchChange: function(e) {
    const term = e.target.value;

    if(term.length >= 3) {
      this.setState({
        searchTerm: term,
      }, () => {
        this.scheduleReloadDueToSearchChange();
      });

    } else {
      this.setState({
        searchTerm: null,
      }, () => {
        this.scheduleReloadDueToSearchChange();
      });
    }
  },

  scheduleReloadDueToSearchChange: function() {
    this.cancelReloadDueToSearchChange();

    const that = this;
    this.searchReloadTimeout = setTimeout(function() {
      delete that.searchReloadTimeout;
      that.reloadData();
    }, 500);
  },

  cancelReloadDueToSearchChange: function() {
    if(this.searchReloadTimeout) {
      clearTimeout(this.searchReloadTimeout);
      delete this.searchReloadTimeout;
    }
  },

  renderSearch: function() {
    if(this.props.searchable) {
      return (
        <ToolbarGroup position="right">
          <input type="text" className="form-control" placeholder={Counterpart.translate("widgets.admin.table_browser.search.title")} onChange={this.onSearchChange} />
        </ToolbarGroup>
      );
    }
  },

  renderPagination: function() {
    let counter;

    if (this.props.hidePaginationCounter) {
      counter = "";
    } else {
      counter = (<Translate className="btn" style={{cursor: "default"}} content="widgets.admin.table_browser.pagination.current.label" rangeStart={this.buildRangeStart()} rangeStop={this.buildRangeStop()} rangeTotal={this.state.recordsCount} component="div" />);
    }

    if(this.state.recordsCount !== 0) {
      return (
        <ToolbarGroup position="right">
          {counter}
          <button type="button" className="btn btn-default-light" onClick={this.onPreviousPageClick} disabled={this.state.offset === 0} title={Counterpart.translate("widgets.admin.table_browser.pagination.previous.title")}><i className="mdi mdi-chevron-left"/></button>
          <button type="button" className="btn btn-default-light" onClick={this.onNextPageClick} disabled={this.buildRangeStop() === this.state.recordsCount} title={Counterpart.translate("widgets.admin.table_browser.pagination.next.title")}><i className="mdi mdi-chevron-right"/></button>
        </ToolbarGroup>
      );
    }
  },

  renderRefresh: function() {
    return (
      <ToolbarGroup position="right">
        <ToolbarButton
          onClick={this.onRefreshClick}
          icon="reload"
          title={Counterpart.translate("widgets.admin.table_browser.refresh.title")}/>
      </ToolbarGroup>
    );
  },

  renderTable: function() {
      return (
        <Table
          linkFunc={this.props.recordsLinkFunc}
          selectedRecordIds={this.state.selectedRecordIds}
          onSelectRecord={this.onSelectRecord}
          onSelectAll={this.onSelectAll}
          onSort={this.onSort}
          selectable={this.props.selectable}
          attributes={this.props.attributes}
          sortedAttribute={this.state.sortedAttribute}
          sortedDirection={this.state.sortedDirection}
          contentPrefix={this.props.contentPrefix}
          records={this.state.records} />
      );
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
            <Toolbar>
              {this.props.children}

              {this.renderPagination()}
              {this.renderRefresh()}
              {this.renderSearch()}
            </Toolbar>

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

            {this.renderTable()}

            {() => {
              if(this.state.recordsCount > 10 && !this.props.onlyUpperPagination) {
                return (
                  <Toolbar>
                    {this.renderPagination()}
                    {this.renderRefresh()}
                  </Toolbar>
                );
              }
            }()}
          </div>
        );
      }
    }
  }
});
