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
    onContentElementSelect: React.PropTypes.func,
    sidebarElement: ObjectFuncElementValidator,
    toolbarElement: ObjectFuncElementValidator,
    contentProps: React.PropTypes.object,
    sidebarProps: React.PropTypes.object,
    toolbarProps: React.PropTypes.object,
    sidebarColumnClasses: React.PropTypes.string,
    contentColumnClasses: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      cardPadding: false,
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
    if (this.props.onContentElementSelect) {
      this.props.onContentElementSelect(tab);
    } else {
      this.setState({
        selectedTab: tab,
      });
    }
  },

  onPostRenderNestedContentElement(key, element) {
    if (key !== this.getSelectedTab()) {
      return (<div key={key} style={{ display: 'none' }}></div>);
    }
    return element;
  },

  getSelectedTab() {
    return this.props.onContentElementSelect
      ? this.props.contentElementSelected
      : this.state.selectedTab
    ;
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
                selectedTab={this.getSelectedTab()}
                onTabClick={this.onTabClick}
              />
            )
        : null
        }

        <CardBody cardPadding={this.props.cardPadding} >
          {(this.props.sidebarElement)
          ? (
                <CardSidebar
                  sidebarColumnClasses={this.props.sidebarColumnClasses}
                  contentColumnClasses={this.props.contentColumnClasses}
                >
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
