import React from 'react';

import Loading from '../../../widgets/general/loading_widget.jsx';
import Alert from '../../../widgets/admin/alert_widget.jsx';
import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import GridCell from '../../../widgets/admin/grid_cell_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import ToolBarGroup from '../../../widgets/admin/toolbar_group_widget.jsx';
import ToolBarButton from '../../../widgets/admin/toolbar_button_widget.jsx';


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    app: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    showQueryFunc: React.PropTypes.func,
    deleteEnabled: React.PropTypes.bool.isRequired,
    contentElement: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func, React.PropTypes.element]).isRequired,
    sidebarElement: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func, React.PropTypes.element]),
  },


  contextTypes: {
    history: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
  },


  getDefaultProps: function() {
    return {
      deleteEnabled: true,
    }
  },


  getInitialState: function() {
    return {
      record: null,
      loaded: false,
      error: false,
    }
  },


  onBackClick: function(e) {
    e.preventDefault();
    let currentLocation = this.context.location.pathname.split("/");
    currentLocation.pop();
    currentLocation.pop();
    let newLocation = currentLocation.join("/") + "/index";
    this.context.history.replaceState(null, newLocation);
  },


  buildShowQuery: function() {
    let query = window.data
      .query(this.props.app, this.props.model)
      .select("id", "name")
      .where("id", "eq", this.context.params.id);

    if(this.props.showQueryFunc) {
      query = this.props.showQueryFunc(query);
    }

    return query;
  },


  componentDidMount: function() {
    this.recordQuery = this.buildShowQuery()
      .on("fetch", (_eventName, _record, data) => {
        if(this.isMounted()) {
          this.setState({
            record: data.first(),
            loaded: true,
          });
        }
      })
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loaded: true,
            error: true,
          });
        }
      })
      .fetch();
  },


  componentWillUnmount: function() {
    this.recordQuery.teardown();
  },


  render: function() {
    if(this.state.loaded === false) {
      return <Loading />;

    } else {
      if(this.state.error === false) {
        return (
          <Section>
            <GridRow>
              <GridCell size="large" center={true}>
                <Card contentPrefix={`${this.props.contentPrefix}.show`} headerText={this.state.record.get("name")} sidebarElement={this.props.sidebarElement} sidebarProps={{ contentPrefix: this.props.contentPrefix + ".show", app: this.props.app, model: this.props.model, record: this.state.record }} contentElement={this.props.contentElement} contentProps={{ contentPrefix: this.props.contentPrefix + ".show", app: this.props.app, model: this.props.model, record: this.state.record }} />
              </GridCell>
            </GridRow>
          </Section>
        );
      } else {
        return <Alert type="error" infoTextKey="general.errors.communication.general" />;
      }
    }
  }
});
