import React from 'react';

import ToolbarButton from './toolbar_button_widget.jsx';

export default React.createClass({
  propTypes: {
    icon: React.PropTypes.string.isRequired,
    labelTextKey: React.PropTypes.string,
    hintTooltipKey: React.PropTypes.string,
    contentPrefix: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    modalElement: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.instanceOf(React.Component),
    ]).isRequired,
    modalProps: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      modalProps: {},
      modalElement: () => (<noscript />),
    };
  },

  onClick(e) {
    e.preventDefault();
    // some modalElement's components may have unimplemented show function
    // and only hold ref to modal
    (this.refs.modal.show && this.refs.modal.show()) || this.refs.modal.refs.modal.show();
  },

  render() {
    const {
      modalProps,
      modalElement: Element,
    } = this.props;
    const modalPropsMerged = {
      ...modalProps,
      ref: 'modal',
    };
    return (
      <span>
        <Element {...modalPropsMerged} />
        <ToolbarButton
          icon={this.props.icon}
          labelTextKey={this.props.labelTextKey}
          hintTooltipKey={this.props.hintTooltipKey}
          disabled={this.props.disabled}
          onClick={this.onClick}
        />
     </span>
    );
  },
});
