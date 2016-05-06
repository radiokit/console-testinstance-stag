import React from 'react';
import ReactDOM from 'react-dom';

const IndeterminateCheckboxWidget = React.createClass({

  propTypes: {
    checked: React.PropTypes.bool,
    indeterminate: React.PropTypes.bool,
    onSelected: React.PropTypes.func,
    onDeselected: React.PropTypes.func,
    onRestore: React.PropTypes.func,
  },

  getInitialState() {
    return {
      checked: this.props.checked,
      indeterminate: this.props.indeterminate,
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      checked: nextProps.checked,
      indeterminate: nextProps.indeterminate,
    });
  },

  onChange() {
    if (this.state.checked) {
      this.props.onDeselected();
      this.setState({
        checked: false,
        indeterminate: false,
      });
    } else {
      if (this.props.indeterminate && !this.state.indeterminate) {
        this.props.onRestore();
        this.setState({
          checked: false,
          indeterminate: true,
        });
      } else {
        this.props.onSelected();
        this.setState({
          checked: true,
          indeterminate: false,
        });
      }
    }
  },

  componentDidMount() {
    if (this.state.indeterminate) {
      this.setIndeterminate(true);
    }
  },

  componentDidUpdate(previousProps) {
    this.setIndeterminate(this.state.indeterminate);
  },

  setIndeterminate(indeterminate) {
    const node = ReactDOM.findDOMNode(this);
    node.indeterminate = indeterminate;
  },

  render() {
    return <input type="checkbox" checked={this.state.checked} onChange={this.onChange} />;
  },
});

export default IndeterminateCheckboxWidget;
