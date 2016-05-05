import React from 'react';
import ReactDOM from 'react-dom';

const styles = {
  root: {
    position: 'relative',
  },
  children: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
};

const DetectWidth = React.createClass({

  propTypes: {
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.node,
    ]),
    onWidth: React.PropTypes.func,
  },

  getInitialState() {
    return {
      width: 0,
      offsetStart: 0,
      offsetLength: 0,
    };
  },

  componentDidMount() {
    this.interval = window.setInterval(() => {
      this.setWidth(this.refs.root.offsetWidth || ReactDOM.findDOMNode(this.refs.root).offsetWidth);
    }, 150);
  },

  componentWillUnmount() {
    window.clearInterval(this.interval);
  },

  setWidth(width) {
    if (this.state.width !== width) {
      this.setState({ width });
      this.props.onWidth && this.props.onWidth(width);
    }
  },

  renderChildren() {
    const childStyle = [
      styles.children,
      { width: this.state.width },
    ];
    return (
      <div style={childStyle}>{
        (typeof this.props.children === 'function')
          ? this.props.children(this.state.width)
          : this.props.children
      }</div>
    );
  },

  render() {
    const rootStyle = [
      styles.root,
      this.props.style,
    ];
    return (
      <div className={this.props.className} style={rootStyle} ref="root">
        {this.state.width && this.renderChildren()}
      </div>
    );
  },
});
export default DetectWidth;
