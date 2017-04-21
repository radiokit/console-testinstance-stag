import React from 'react';
import Counterpart from 'counterpart';
import { Data } from 'radiokit-api';
import moment from 'moment';

import Form from '../../../widgets/admin/form_widget.jsx';
import Button from '../../../widgets/admin/button_widget.jsx';


Counterpart.registerTranslations('en', require('./IndexReportsPartial.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexReportsPartial.locale.pl.js'));


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
  },


  contextTypes: {
    currentBroadcastChannel: React.PropTypes.object.isRequired,
    apps: React.PropTypes.object.isRequired,
  },


  buildForm() {
    return {
      month: {
        type: 'number',
        validators: {
          presence: true,
        },
        min: 1,
        max: 12,
        value: moment().month() + 1,
      },
      year: {
        type: 'number',
        validators: {
          presence: true,
        },
        value: moment().year(),
      },
      template: {
        type: 'enum',
        validators: {
          presence: true,
        },
        values: ["stoart"],
      }
    };
  },


  onFormSubmit(values) {
    window.location.href = `${this.context.apps.agenda.baseUrl}/api/royalties/v1.0/report/fetch?channel_id=${encodeURIComponent(this.context.currentBroadcastChannel.get('id'))}&template=${encodeURIComponent(values.template)}&month=${encodeURIComponent(values.month)}&year=${encodeURIComponent(values.year)}`;
  },


  render() {
    return (
      <div>
        <Form ref="form" form={this.buildForm()} contentPrefix={`${this.props.contentPrefix}.form`} onSubmit={this.onFormSubmit} />
        <Button onClick={() => this.refs.form.submit()} label={Counterpart.translate(`${this.props.contentPrefix}.submit`)} />
      </div>
    );
  },
});
