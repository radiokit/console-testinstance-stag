import React from 'react';

const styles = {
  root: {
    position: 'relative',
  },
  children: {
    position: 'absolute',
    top: 0,
    left: 0,
  }
};

export default class DetectWidth extends React.Component {

  static get propTypes() {
    return {
      onWidth: React.PropTypes.func,
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      offsetStart: 0,
      offsetLength: 0
    };
  }

  componentDidMount() {
    const width = React.findDOMNode(this.refs.root).innerWidth
    this.setState({width});
    this.props.onWidth && this.props.onWidth(width);
  }

  renderChildren() {
    const childStyle = [
      styles.children,
      {width: this.state.width}
    ];
    return (
      <div style={childStyle}>{this.state.children}</div>
    )
  }

  render() {
    const rootStyle = [
      styles.root,
      this.props.style,
    ];
    return (
      <div className={this.prop.className} style={rootStyle} ref="root">
        {this.state.width && this.renderChildren()}
      </div>
    )
  }
}
