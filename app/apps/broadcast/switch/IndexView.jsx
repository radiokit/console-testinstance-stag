import React from 'react';
import Counterpart from 'counterpart';

import GridRow from '../../../widgets/admin/grid_row_widget.jsx';
import Section from '../../../widgets/admin/section_widget.jsx';
import Card from '../../../widgets/admin/card_widget.jsx';
import RoutingHelper from '../../../helpers/routing_helper.js';
import RadioKit from '../../../services/RadioKit.js';

Counterpart.registerTranslations('en', require('./IndexView.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexView.locale.pl.js'));

import './IndexView.scss';

export default React.createClass({
  contextTypes: {
    availableAccounts: React.PropTypes.object.isRequired,
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

      this.streamsQuery = RadioKit
        .query('plumber', 'Media.Input.Stream.RTP')
        .select('id', 'references')
        .order('id', 'asc')
        // .where.apply(this, streamsCondition)
        .on('fetch', (_event, _query, data) => {
          if (this.isMounted()) {
            this.setState({
              loadedStreams: data,
            }, () => {
              this.loadRoutingLinks();
            });
          }
        })
        .enableAutoUpdate();
    }
  },

  loadRoutingLinks() {
    if (!this.routingLinksQuery) {
      const streamsIds = this.state.loadedStreams.toJS().map((stream) => {
        return stream.id;
      });

      this.routingLinksQuery = RadioKit
        .query('plumber', 'Media.Routing.Link')
        .select('id', 'input_stream_rtp_id', 'output_media_routing_group_id')
        .order('id', 'asc')
        .where('output_media_routing_group_id', 'eq', this.context.currentBroadcastChannel.get('media_routing_group_id'))
        .where('input_stream_rtp_id', 'in', streamsIds)
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

  createRoutingLink(stream) {
    const routingLinkParams = {
      input_stream_rtp_id: stream.id,
      output_media_routing_group_id: this.context.currentBroadcastChannel.get('media_routing_group_id'),
    };

    RadioKit
      .record('plumber', 'Media.Routing.Link')
      .create(routingLinkParams);
  },

  deleteRoutingLink(routingLink) {
    RadioKit
      .record('plumber', 'Media.Routing.Link', routingLink.id)
      .destroy();
  },

  toggleRoutingLink(routingLink, stream) {
    if (routingLink) {
      this.deleteRoutingLink(routingLink);
    } else {
      this.createRoutingLink(stream);
    }
  },

  renderStreams() {
    if (this.state.loadedStreams) {
      const streamsList = [];
      const streams = this.state.loadedStreams.toJS();

      streams.forEach((stream) => {
        let className = 'btn btn-block btn-default text-center small-padding';
        let iconClassName = 'text-xxxxl mdi'
        let onAirInfo;
        const routingLink = this.getRoutingLinkForStream(stream);

        if (routingLink) {
          className = `${className} playing`;
          iconClassName = `${iconClassName} mdi-radio-tower`;
          onAirInfo = (<span className="on-air">{Counterpart.translate('apps.broadcast.switch.stream.on_air')}</span>);
        } else {
          iconClassName = `${iconClassName} mdi-power`;
        }

        const streamElement = (
          <div className="col-md-4" key={stream.id}>
            {onAirInfo}
            <Card cardPadding={false} headerVisible={false}>
              <a className={className} onClick={() => this.toggleRoutingLink(routingLink, stream)}>
                <i className={iconClassName} />
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

  getRoutingLinkForStream(stream) {
    let routingLink;

    if (this.state.loadedRoutingLinks) {
      routingLink = this.state.loadedRoutingLinks.toJS().find((link) => {
        return link.input_stream_rtp_id === stream.id;
      });
    }

    return routingLink;
  },

  componentDidMount() {
    this.loadStreams();
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
