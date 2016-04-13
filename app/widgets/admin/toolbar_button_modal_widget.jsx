import React from 'react';
import clone from 'clone';

import ToolbarButton from './toolbar_button_widget.jsx';


export default React.createClass({
  propTypes: {
    icon: React.PropTypes.string.isRequired,
    labelTextKey: React.PropTypes.string,
    hintTooltipKey: React.PropTypes.string,
    contentPrefix: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    modalElement: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.instanceOf(React.Component)]).isRequired,
    modalProps: React.PropTypes.object,
  },


  onClick: function(e) {
    e.preventDefault();
    //some modalElement's components may have unimplemented show function and only hold ref to modal
    (this.refs.modal.show && this.refs.modal.show()) || this.refs.modal.refs.modal.show();
  },


  render: function() {
    let modalPropsMerged = clone(this.props.modalProps);
    modalPropsMerged.ref = "modal";

    return (
      <span>
        {React.createElement(this.props.modalElement, modalPropsMerged)}
        <ToolbarButton icon={this.props.icon} labelTextKey={this.props.labelTextKey} hintTooltipKey={this.props.hintTooltipKey} disabled={this.props.disabled} onClick={this.onClick}/>
      </span>
    );
  }
});
