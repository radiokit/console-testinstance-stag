import React from 'react';
import Immutable from 'immutable';

import TableBody from './table_body_widget.jsx';
import TableHeader from './table_header_widget.jsx';


export default React.createClass({
  propTypes: {
    attributes: React.PropTypes.object.isRequired,
    actions: React.PropTypes.arrayOf(React.PropTypes.element),
    contentPrefix: React.PropTypes.string.isRequired,
    records: React.PropTypes.object.isRequired,
    selectable: React.PropTypes.bool,
    headerSelected: React.PropTypes.bool,
    onRowSelect: React.PropTypes.func,
    onHeaderSelect: React.PropTypes.func,
    selectedRecordIds: React.PropTypes.object,
  },


  getDefaultProps: function() {
    return {
      actions: [],
      selectable: false
    }
  },


  getInitialState: function() {
    return {
      headerSelected: this.props.headerSelected,
      selectedRecordIds: this.props.headerSelected ? this.getAllRecordIds() : new Immutable.Seq().toIndexedSeq(),
    }
  },


  componentWillReceiveProps: function(nextProps) {
    if(nextProps.records !== this.props.records) {
      this.setState({
        selectedRecordIds: new Immutable.Seq().toIndexedSeq(),
        headerSelected: false,
      });
    }
  },


  componentDidUpdate: function(prevProps, prevState) {
    if(prevState.headerSelected !== this.state.headerSelected && this.props.onHeaderSelect) {
      this.props.onHeaderSelect(this.state.headerSelected, this.state.selectedRecordIds);
    }

    if(prevState.selectedRecordIds !== this.state.selectedRecordIds && this.props.onRowSelect) {
      this.state.selectedRecordIds.filterNot((recordId) => { return prevState.selectedRecordIds.includes(recordId); }).forEach((selectedRecordId) => {
        this.props.onRowSelect(true, selectedRecordId, this.state.selectedRecordIds);
      });

      prevState.selectedRecordIds.filterNot((recordId) => { return this.state.selectedRecordIds.includes(recordId); }).forEach((deselectedRecordId) => {
        this.props.onRowSelect(false, deselectedRecordId, this.state.selectedRecordIds);
      });
    }
  },


  getAllRecordIds: function() {
    return this.props.records.map((record) => { return record.get("id"); });
  },


  onHeaderSelect: function(state) {
    if(state === true) {
      this.setState({
        selectedRecordIds: this.getAllRecordIds(),
        headerSelected: true
      });

    } else {
      this.setState({
        selectedRecordIds: new Immutable.Seq().toIndexedSeq(),
        headerSelected: false
      });
    }
  },


  onRowSelect: function(state, record) {
    if(state === true) {
      let newSelectedRowIds = this.state.selectedRecordIds.concat(Immutable.Seq.of(record.get("id")));
      let allRecordIds = this.getAllRecordIds();

      this.setState({
        selectedRecordIds: newSelectedRowIds,
        headerSelected: allRecordIds.sort().equals(newSelectedRowIds.sort())
      });

    } else {
      this.setState({
        selectedRecordIds: this.state.selectedRecordIds.filterNot((id) => { return id === record.get("id"); }),
        headerSelected: false
      });
    }
  },


  render: function() {
    return (<table className="table table-hover">
      <TableHeader attributes={this.props.attributes} contentPrefix={this.props.contentPrefix} selectable={this.props.selectable} headerSelected={this.state.headerSelected} onHeaderSelect={this.onHeaderSelect} />
      <TableBody attributes={this.props.attributes} records={this.props.records} selectable={this.props.selectable} selectedRecordIds={this.state.selectedRecordIds} onRowSelect={this.onRowSelect} />
    </table>);
  }
});
