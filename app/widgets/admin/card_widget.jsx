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
    contentElement: React.PropTypes.element, // FIXME should be mandatory
    sidebarElement: React.PropTypes.element,
    toolbarPrimaryElement: React.PropTypes.element,
  },


  // FIXME deprecated
  childContextTypes: {
    contentPrefix: React.PropTypes.string,
    cardPadding: React.PropTypes.bool,
  },


  // FIXME deprecated
  getChildContext: function() {
    return {
      contentPrefix: this.props.contentPrefix,
      cardPadding: this.props.cardPadding
    };
  },


  getDefaultProps: function() {
    return {
      cardPadding: true
    }
  },


  renderContent: function() {
    if(this.props.toolbarPrimaryElement) {
      return (
        <div>
          <CardToolBar>
            {this.props.toolbarPrimaryElement}
          </CardToolBar>

          {this.props.contentElement}
        </div>
      );
    } else {
      return this.props.contentElement;
    }
  },


  render: function() {
    if(!this.props.contentElement) {
      // FIXME deprecated usage
      console.warn("Deprecated usage of CardWidget, pass contentElement props instead of setting children manually");
      return (
        <div className="card card-underline style-gray-dark2">
          {this.props.children}
        </div>
      );

    } else {
      return (
        <div className="card card-underline style-gray-dark2">
          <CardHeader contentPrefix={this.props.contentPrefix} headerText={this.props.headerText} />
          <CardBody cardPadding={this.props.sidebarElement ? false : true}>
            {() => {
              if(this.props.sidebarElement) {
                return (
                  <CardSidebar>
                    {this.props.sidebarElement}
                    {this.renderContent()}
                  </CardSidebar>
                )
              } else {
                return this.renderContent();
              }
            }()}
          </CardBody>
        </div>
      );
    }
  }
});
