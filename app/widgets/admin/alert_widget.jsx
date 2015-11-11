import React from 'react';

import Translate from 'react-translate-component';

import Section from './section_widget.jsx';


export default React.createClass({
  

  propTypes: {
    type: React.PropTypes.string.isRequired,
    infoTextKey: React.PropTypes.string.isRequired,
    fullscreen: React.PropTypes.bool
  },


  getDetaultProps: function() {
    return { fullscreen: false }
  },


  render: function() {
    if(this.props.fullscreen) {
      return (
        <Section>
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              {this.renderAlert()}
            </div>
          </div>
        </Section>
      );

    } else {
      return this.renderAlert();
    }
  },


  renderAlert: function() {
    return (
      <div>
        <Translate content={this.props.infoTextKey} component="div" className={"alert alert-callout alert-" + this.props.type} role="alert" />
      </div>
    );
  }
});
