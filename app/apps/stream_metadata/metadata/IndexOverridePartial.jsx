import React from 'react';
import Counterpart from 'counterpart';
import moment from 'moment';


import LoadingWidget from '../../../widgets/general/loading_widget.jsx';
import Form from '../../../widgets/admin/form_widget.jsx';
import Button from '../../../widgets/admin/button_widget.jsx';
import RadioKit from '../../../services/RadioKit';


Counterpart.registerTranslations('en', require('./IndexOverridePartial.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexOverridePartial.locale.pl.js'));


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
  },


  getInitialState() {
    return {
      loaded: false,
      nowPlaying: null,
    };
  },


  contextTypes: {
    currentBroadcastChannel: React.PropTypes.object.isRequired,
  },


  componentDidMount() {
    RadioKit
      .query('agenda', 'Broadcast.Channel')
      .select('metadata_override')
      .where('id', 'eq', this.context.currentBroadcastChannel.get('id'))
      .on('fetch', (_eventName, _record, data) => {
        this.setState({
          loaded: true,
          nowPlaying: data.first().get('metadata_override'),
        });
      })
      .fetch();      
  },



  buildForm() {
    return {
      nowPlaying: {
        type: 'string',
        hint: true,
        value: this.state.nowPlaying,
      },
    };
  },


  onFormSubmit(values) {
    let nowPlaying;
    if(values.nowPlaying.trim() === '') {
      nowPlaying = null;  
    } else {
      nowPlaying = values.nowPlaying.trim();
    }

    RadioKit
      .record('agenda', 'Broadcast.Channel', this.context.currentBroadcastChannel.get('id'))
      .update({
        metadata_override: nowPlaying,
        metadata_updated_at: moment().utc().toISOString(),
      });
  },


  clearForm() {
    this.setState({
      nowPlaying: null,
    }, () => {
      RadioKit
        .record('agenda', 'Broadcast.Channel', this.context.currentBroadcastChannel.get('id'))
        .update({
          metadata_override: null,
          metadata_updated_at: moment().utc().toISOString(),
        });
    });
  },


  render() {
    if(!this.state.loaded) {
      return <LoadingWidget />;
    }

    return (
      <div>
        <Form ref="form" form={this.buildForm()} contentPrefix={`${this.props.contentPrefix}.form`} onSubmit={this.onFormSubmit} />
        <Button onClick={() => this.refs.form.submit()} label={Counterpart.translate(`${this.props.contentPrefix}.submit`)} />
        <Button onClick={() => this.clearForm()} label={Counterpart.translate(`${this.props.contentPrefix}.clear`)} className="btn btn-default" />
      </div>
    );
  },
});
