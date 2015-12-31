import React from 'react';
import Immutable from 'immutable';
import Counterpart from 'counterpart';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import TableBrowser from '../../../widgets/admin/table_browser_widget.jsx';
import ListBrowser from '../../../widgets/admin/list_browser_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import CardBody from '../../../widgets/admin/card_body_widget.jsx';
import CardHeader from '../../../widgets/admin/card_header_widget.jsx';
import ToolBar from '../../../widgets/admin/toolbar_widget.jsx';
import ToolBarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolBarButton from '../../../widgets/admin/toolbar_button_widget.jsx';
import ToolBarButtonModal from '../../../widgets/admin/toolbar_button_modal_widget.jsx';

import IndexTableBrowser from './index_table_browser_widget.jsx';
import IndexListBrowser from './index_list_browser_widget.jsx';


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    indexQueryFunc: React.PropTypes.func,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    form: React.PropTypes.object.isRequired,
    type: React.PropTypes.oneOf(['tableBrowser', 'list']).isRequired,
    attributes: React.PropTypes.object.isRequired,
    readEnabled: React.PropTypes.bool.isRequired,
    createEnabled: React.PropTypes.bool.isRequired,
    deleteEnabled: React.PropTypes.bool.isRequired,
  },


  getDefaultProps: function() {
    return {
      readEnabled: true,
      createEnabled: true,
      deleteEnabled: true,
      type: "tableBrowser",
    }
  },


  render: function() {
    let contentElement;

    switch(this.props.type) {
      case "tableBrowser":
        return (
          <Section>
            <GridRow>
              <GridCell size="large" center={true}>
                <Card contentPrefix={`${this.props.contentPrefix}.index`} cardPadding={false} contentElement={IndexTableBrowser} contentProps={{attributes: this.props.attributes, contentPrefix: this.props.contentPrefix, readEnabled: this.props.readEnabled, deleteEnabled: this.props.deleteEnabled, createEnabled: this.props.createEnabled, form: this.props.form, app: this.props.app, model: this.props.model}} />
              </GridCell>
            </GridRow>
          </Section>
        );
      break;

      case "list":
        return (
          <Section>
            <GridRow>
              <GridCell size="small" center={true}>
                <Card contentPrefix={`${this.props.contentPrefix}.index`} cardPadding={false} contentElement={IndexListBrowser} contentProps={{attributes: this.props.attributes, contentPrefix: this.props.contentPrefix, readEnabled: this.props.readEnabled, deleteEnabled: this.props.deleteEnabled, createEnabled: this.props.createEnabled, form: this.props.form, app: this.props.app, model: this.props.model}}/>
              </GridCell>
            </GridRow>
          </Section>
        );
        break;
    }
  }
});
