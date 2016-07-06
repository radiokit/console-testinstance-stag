import React from 'react';
import Counterpart from 'counterpart';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import RoutingHelper from '../../../helpers/routing_helper.js';

Counterpart.registerTranslations('en', require('./IndexView.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexView.locale.pl.js'));

export default React.createClass({
  contextTypes: {
    availableUserAccounts: React.PropTypes.object.isRequired,
    currentBroadcastChannel: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      loadedStreams: null,
      loadedRoutingLinks: null,
    };
  },

  loadStreams() {
    if (!this.streamsQuery) {
      const streamsRoles = ['loopcast'];
      const streamsCondition = ['references', 'din', 'role'].concat(streamsRoles);

      this.streamsQuery = window.data
        .query('plumber', 'Media.Input.Stream.RTP')
        .select('id', 'references')
        .order('id', 'asc')
        // .where.apply(this, streamsCondition)
        .on('fetch', (_event, _query, data) => {
          if (this.isMounted()) {
            this.setState({
              loadedStreams: data,
            });
          }
        })
        .enableAutoUpdate();
    }
  },

  loadRoutingLinks() {
    if (!this.routingLinksQuery) {
      this.routingLinksQuery = window.data
        .query('plumber', 'Media.Routing.Link')
        .select('id', 'input_media_routing_group_id')
        .order('id', 'asc')
        .where('output_media_routing_group_id', 'eq', this.context.currentBroadcastChannel.get('id'))
        .on('fetch', (_event, _query, data) => {
          if (this.isMounted()) {
            this.setState({
              loadedRoutingLinks: data,
            });
          }
        })
        .enableAutoUpdate();
    }
  },

  renderStreams() {
    if (this.state.loadedStreams) {
      const streamsList = [];
      const streams = this.state.loadedStreams.toJS();

      streams.forEach((stream) => {

        const streamElement = (
          <div className="col-md-4">
            <Card cardPadding={false} headerVisible={false}>
              <a className="btn btn-block btn-default text-center small-padding">
                <i className={`text-xxxxl mdi mdi-${RoutingHelper.apps.electron.icon}`} />
                <span style={{ position: 'relative', bottom: '18px' }}>
                  {stream.id}
                </span>
              </a>
            </Card>
          </div>
        );

        streamsList.push(streamElement);
      });

      return streamsList;
    }

    return (
      <div></div>
    );
  },

  componentDidMount() {
    this.loadStreams();
    this.loadRoutingLinks();
  },

  componentWillUnmount() {
    if (this.streamsQuery) {
      this.streamsQuery.teardown();
      delete this.streamsQuery;
    }

    if (this.routingLinksQuery) {
      this.routingLinksQuery.teardown();
      delete this.routingLinksQuery;
    }
  },


  render() {
    return (
      <Section className="dashboard">
        <GridRow>
          {this.renderStreams()}
        </GridRow>
      </Section>
    );
  },
});
