import React from 'react';

import RenderHelper from '../../helpers/render_helper.js';

import CardSidebar from './card_sidebar_widget.jsx';
import CardHeader from './card_header_widget.jsx';
import CardToolBar from './card_tool_bar_widget.jsx';
import CardBody from './card_body_widget.jsx';



export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string,
    cardPadding: React.PropTypes.bool,
    headerVisible: React.PropTypes.bool,
    headerText: React.PropTypes.string,
    contentElement: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func, React.PropTypes.element]),
    sidebarElement: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func, React.PropTypes.element]),
    toolbarElement: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func, React.PropTypes.element]),
    contentProps: React.PropTypes.object,
    sidebarProps: React.PropTypes.object,
    toolbarProps: React.PropTypes.object,
  },


  getDefaultProps: function() {
    return {
      cardPadding: true,
      headerVisible: true,
    }
  },


  getInitialState: function() {
    if(this.hasTabs()) {
      return {
        selectedTab: Object.keys(this.props.contentElement)[0]
      };
    } else {
      return {};
    }
  },


  hasTabs: function() {
    return RenderHelper.containsNestedElements(this.props.contentElement);
  },


  buildTabHeaders: function() {
    if(this.hasTabs()) {
      return Object.keys(this.props.contentElement);
    } else {
      return null;
    }
  },


  onTabClick: function(tab) {
    this.setState({
      selectedTab: tab
    });
  },


  renderContentPartial: function() {
    if(this.props.toolbarElement) {
      return (
        <div>
          <CardToolBar>
            {RenderHelper.renderDelegatedComponent(this.props.toolbarElement, this.props.toolbarProps)}
          </CardToolBar>

          {this.renderContentElement()}
        </div>
      );
    } else {
      return this.renderContentElement();
    }
  },


  onPostRenderNestedContentElement: function(key, element, props) {
    if(key !== this.state.selectedTab) {
      return (<div key={key} style={{display: "none"}}>{element}</div>);
    } else {
      return element;
    }
  },


  renderContentElement: function() {
    if(this.props.children && this.props.children.length !== 0) {
      return this.props.children;

    } else {
      return RenderHelper.renderDelegatedComponent(this.props.contentElement, this.props.contentProps, null, this.onPostRenderNestedContentElement);
    }
  },


  renderSidebarElement: function() {
    return RenderHelper.renderDelegatedComponent(this.props.sidebarElement, this.props.sidebarProps);
  },


  render: function() {
    return (
      <div className="card card-underline style-gray-dark2">
        {() => {
          if(this.props.headerVisible === true) {
            return <CardHeader contentPrefix={this.props.contentPrefix} headerText={this.props.headerText} tabs={this.buildTabHeaders()} selectedTab={this.state.selectedTab} onTabClick={this.onTabClick} />
          }
        }()}
        <CardBody cardPadding={this.props.cardPadding && (this.props.sidebarElement || this.props.sidebarElement)}>
          {() => {
            if(this.props.sidebarElement || this.props.sidebarElement) {
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
});
