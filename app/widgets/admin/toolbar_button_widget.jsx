import React from 'react';
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';

export default React.createClass({
  propTypes: {
    icon: React.PropTypes.string.isRequired,
    labelTextKey: React.PropTypes.string,
    hintTooltipKey: React.PropTypes.string,
    disabled: React.PropTypes.bool,
  },


  render: function() {
    return (
      <button type="button" className="btn btn-default-light" title={(this.props.hintTooltipKey ? Counterpart.translate(this.props.hintTooltipKey) : "")} {...this.props}>
        <i className={"mdi mdi-" + this.props.icon}/>
        {() => {
          if(this.props.labelTextKey) {
            return <Translate component="span" content={this.props.labelTextKey} />
          }
        }()}
      </button>
    );
  }
});
