import React from 'react';

import CardSidebar from './card_sidebar_widget.jsx';
import CardHeader from './card_header_widget.jsx';
import CardToolBar from './card_tool_bar_widget.jsx';
import CardBody from './card_body_widget.jsx';



export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    cardPadding: React.PropTypes.bool,
    headerText: React.PropTypes.string,
    contentElementClass: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func]),
    sidebarElementClass: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func]),
    contentElement: React.PropTypes.element,
    sidebarElement: React.PropTypes.element,
    toolbarElement: React.PropTypes.element,
    contentProps: React.PropTypes.object,
    sidebarProps: React.PropTypes.object,
  },



  getDefaultProps: function() {
    return {
      cardPadding: true
    }
  },


  renderContentPartial: function() {
    if(this.props.toolbarElement) {
      return (
        <div>
          <CardToolBar>
            {this.props.toolbarElement}
          </CardToolBar>

          {this.renderContentElement()}
        </div>
      );
    } else {
      return this.renderContentElement();
    }
  },


  renderContentElement: function() {
    if(this.props.contentElement) {
      return this.props.contentElement;
    } else if(this.props.contentElementClass){
      return React.createElement(this.props.contentElementClass, this.props.contentProps);
    } else {
      throw new Error("Neither contentElement nor contentElementClass was passed.");
    }
  },


  renderSidebarElement: function() {
    if(this.props.sidebarElement) {
      return this.props.sidebarElement;
    } else if(this.props.sidebarElementClass){
      return React.createElement(this.props.sidebarElementClass, this.props.sidebarProps);
    } else {
      throw new Error("Neither sidebarElement nor sidebarElementClass was passed.");
    }
  },


  render: function() {
    if(!this.props.contentElement && !this.props.contentElementClass) {
      // FIXME deprecated usage
      throw new Error("Deprecated usage of CardWidget, pass contentElementClass props instead of setting children manually");

    } else {
      return (
        <div className="card card-underline style-gray-dark2">
          <CardHeader contentPrefix={this.props.contentPrefix} headerText={this.props.headerText} />
          <CardBody cardPadding={this.props.cardPadding && (this.props.sidebarElement || this.props.sidebarElementClass)}>
            {() => {
              if(this.props.sidebarElement || this.props.sidebarElementClass) {
                return (
                  <CardSidebar>
                    {this.renderSidebarElement()}
                    {this.renderContentElement()}
                  </CardSidebar>
                )
              } else {
                return this.renderContentPartial();
              }
            }()}
          </CardBody>
        </div>
      );
    }
  }
});
