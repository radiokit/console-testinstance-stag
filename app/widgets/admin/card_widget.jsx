import React from 'react';

import RenderHelper from '../../helpers/render_helper.js';

import CardSidebar from './card_sidebar_widget.jsx';
import CardHeader from './card_header_widget.jsx';
import CardToolBar from './card_tool_bar_widget.jsx';
import CardBody from './card_body_widget.jsx';

const ObjectFuncElementValidator = React.PropTypes.oneOfType([
  React.PropTypes.object,
  React.PropTypes.func,
  React.PropTypes.element,
]);

export default React.createClass({
  propTypes: {
    children: React.PropTypes.any,
    contentPrefix: React.PropTypes.string,
    cardPadding: React.PropTypes.bool,
    headerVisible: React.PropTypes.bool,
    headerText: React.PropTypes.string,
    contentElement: ObjectFuncElementValidator,
    contentElementSelected: React.PropTypes.string,
    sidebarElement: ObjectFuncElementValidator,
    toolbarElement: ObjectFuncElementValidator,
    contentProps: React.PropTypes.object,
    sidebarProps: React.PropTypes.object,
    toolbarProps: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      cardPadding: true,
      headerVisible: true,
    };
  },

  getInitialState() {
    if (this.hasTabs()) {
      return {
        selectedTab: this.props.contentElementSelected || Object.keys(this.props.contentElement)[0],
      };
    }
    return {};
  },

  onTabClick(tab) {
    this.setState({
      selectedTab: tab,
    });
  },

  onPostRenderNestedContentElement(key, element) {
    if (key !== this.state.selectedTab) {
      return (<div key={key} style={{ display: 'none' }}>{element}</div>);
    }
    return element;
  },

  hasTabs() {
    return RenderHelper.containsNestedElements(this.props.contentElement);
  },

  buildTabHeaders() {
    if (this.hasTabs()) {
      return Object.keys(this.props.contentElement);
    }
    return null;
  },

  renderContentPartial() {
    if (this.props.toolbarElement) {
      return (
        <div>
          <CardToolBar>
            {RenderHelper.renderDelegatedComponent(
              this.props.toolbarElement,
              this.props.toolbarProps
            )}
          </CardToolBar>

          {this.renderContentElement()}
        </div>
      );
    }
    return this.renderContentElement();
  },


  renderContentElement() {
    if (this.props.children && React.Children.count(this.props.children) !== 0) {
      return this.props.children;
    }
    return RenderHelper.renderDelegatedComponent(
      this.props.contentElement,
      this.props.contentProps,
      null,
      this.onPostRenderNestedContentElement
    );
  },

  renderSidebarElement() {
    return RenderHelper.renderDelegatedComponent(
      this.props.sidebarElement,
      this.props.sidebarProps
    );
  },

  render() {
    return (
      <div className="card card-underline style-gray-dark2">

        {(this.props.headerVisible)
        ? (
              <CardHeader
                contentPrefix={this.props.contentPrefix}
                headerText={this.props.headerText}
                tabs={this.buildTabHeaders()}
                selectedTab={this.state.selectedTab}
                onTabClick={this.onTabClick}
              />
            )
        : null
        }

        <CardBody cardPadding={this.props.cardPadding && this.props.sidebarElement}>
          {(this.props.sidebarElement)
          ? (
                <CardSidebar>
                  {this.renderSidebarElement()}
                  {this.renderContentPartial()}
                </CardSidebar>
              )
           : this.renderContentPartial()
          }
        </CardBody>
      </div>
    );
  },
});
