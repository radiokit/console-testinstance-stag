
import React from 'react';
import Counterpart from 'counterpart';

import RadioKit from '../../services/RadioKit.js';

import Form from '../../../widgets/admin/form_widget.jsx';
import Button from '../../../widgets/admin/button_widget.jsx';


Counterpart.registerTranslations('en', require('./IndexProfilePartial.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexProfilePartial.locale.pl.js'));


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
  },

  contextTypes: {
    currentTagItemId: React.PropTypes.object.isRequired,
  },


  getInitialState() {
    return {
      loading: true,
      error: false,
    };
  },


  componentDidMount() {
    RadioKit
      .query('vault', 'Metadata.Item')
      .select('id', 'value_string', 'metadata_schema.key')
      .joins('metadata_schema')
      .where('tag_item_id', 'eq', this.context.currentTagItemId)

      // [
      //   { //metadata item
      //     id: "123",
      //     value_string: "dupa",
      //     metadata_schema: { // metadata schema
      //       key: "whatever",
      //     }
      //   },
      //   { //metadata item
      //     id: "123",
      //     value_string: "andaloop",
      //     metadata_schema: { // metadata schema
      //       key: "djname",
      //     }
      //   },
      //   { //metadata item
      //     id: "123",
      //     value_string: "http://fb.com/dupa",
      //     metadata_schema: { // metadata schema
      //       key: "facebook",
      //     }
      //   },
      // ]
    }
  },

  buildForm() {
    return {
      about: {
        type: 'string',
        validators: {
          presence: true,
        },
        value: ["zassane z tagitem"],
      },
      facebook: {
        type: 'string',
        validators: {
          presence: false,
        },
        value: ["zassane z tagitem"],
      },
      twitter: {
        type: 'string',
        validators: {
          presence: false,
        },
        value: ["zassane z tagitem"],
      },
      cover: {
        type: 'string',
        validators: {
          presence: true,
        },
        value: ["zassane z tagitem"],
      }
    };
  },


  onFormSubmit(values) {
    window.location.href = `${this.context.apps.vault.baseUrl}/api/royalties/v1.0/report/fetch?channel_id=${encodeURIComponent(this.context.currentBroadcastChannel.get('id'))}&template=${encodeURIComponent(values.template)}&month=${encodeURIComponent(values.month)}&year=${encodeURIComponent(values.year)}`;
  },




  render() {
    if(this.state.error) {
      return (<div>DUPA</div>); //FIXME
    }

    if(this.state.loaded === false) {
      return (<div>LOŁDING</div>); //FIXME
    }

    return (
      <div>
        <Form ref="form" form={this.buildForm()} contentPrefix={`${this.props.contentPrefix}.form`} onSubmit={this.onFormSubmit} />
        <Button onClick={() => this.refs.form.submit()} label={Counterpart.translate(`${this.props.contentPrefix}.submit`)} />
      </div>
    );
  }
});
