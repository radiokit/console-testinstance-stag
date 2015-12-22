import React from 'react';
import Immutable from 'immutable';

import TableBody from './table_body_widget.jsx';
import TableHeader from './table_header_widget.jsx';


export default React.createClass({
  propTypes: {
    attributes: React.PropTypes.object.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    records: React.PropTypes.object.isRequired,
    linkFunc: React.PropTypes.func,
    selectable: React.PropTypes.bool,
    selectedRecordIds: React.PropTypes.object,
    onSelectRecord: React.PropTypes.func,
    onSelectAll: React.PropTypes.func,
  },


  getDefaultProps: function() {
    return {
      selectable: false,
      selectedRecordIds: new Immutable.Seq().toIndexedSeq(),
    }
  },


  getInitialState: function() {
    return {
      selectedRecordIds: this.props.selectedRecordIds,
    }
  },


  componentWillReceiveProps: function(nextProps) {
    if(nextProps.records !== this.props.records) {
      this.setState({
        selectedRecordIds: new Immutable.Seq().toIndexedSeq(),
      });
    }

    if(nextProps.selectedRecordIds !== this.props.selectedRecordIds) {
      this.setState({
        selectedRecordIds: nextProps.selectedRecordIds,
      });
    }
  },


  componentDidUpdate: function(prevProps, prevState) {
    let wasHeaderSelected = prevState.selectedRecordIds.count() >= this.props.records.count();
    let isHeaderSelected = this.state.selectedRecordIds.count() >= this.props.records.count();
    if(wasHeaderSelected !== isHeaderSelected && this.props.onSelectAll) {
      this.props.onSelectAll(isHeaderSelected, this.state.selectedRecordIds);
    }

    if(prevState.selectedRecordIds !== this.state.selectedRecordIds && this.props.onSelectRecord) {
      this.state.selectedRecordIds.filterNot((recordId) => { return prevState.selectedRecordIds.includes(recordId); }).forEach((selectedRecordId) => {
        this.props.onSelectRecord(true, selectedRecordId, this.state.selectedRecordIds);
      });

      prevState.selectedRecordIds.filterNot((recordId) => { return this.state.selectedRecordIds.includes(recordId); }).forEach((deselectedRecordId) => {
        this.props.onSelectRecord(false, deselectedRecordId, this.state.selectedRecordIds);
      });
    }
  },


  onSelectAll: function(state) {
    if(state === true) {
      this.setState({
        selectedRecordIds: this.props.records.map((record) => { return record.get("id"); }),
      });

    } else {
      this.setState({
        selectedRecordIds: new Immutable.Seq().toIndexedSeq(),
      });
    }
  },


  onSelectRecord: function(state, record) {
    if(state === true) {
      let newSelectedRowIds = this.state.selectedRecordIds.concat(Immutable.Seq.of(record.get("id")));

      this.setState({
        selectedRecordIds: newSelectedRowIds,
      });

    } else {
      this.setState({
        selectedRecordIds: this.state.selectedRecordIds.filterNot((id) => { return id === record.get("id"); }),
      });
    }
  },


  render: function() {
    return (<table className="table table-hover">
      <TableHeader attributes={this.props.attributes} records={this.props.records} contentPrefix={this.props.contentPrefix} selectable={this.props.selectable} headerSelected={this.state.selectedRecordIds.count() >= this.props.records.count()} onSelectAll={this.onSelectAll} />
      <TableBody linkFunc={this.props.linkFunc} attributes={this.props.attributes} records={this.props.records} selectable={this.props.selectable} selectedRecordIds={this.state.selectedRecordIds} onSelectRecord={this.onSelectRecord} />
    </table>);
  }
});
