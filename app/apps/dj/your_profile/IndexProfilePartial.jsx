
import React from 'react';
import Counterpart from 'counterpart';
import { Data } from 'radiokit-api';


import Form from '../../../widgets/admin/form_widget.jsx';
import Button from '../../../widgets/admin/button_widget.jsx';


Counterpart.registerTranslations('en', require('./IndexProfilePartial.locale.en.js'));
Counterpart.registerTranslations('pl', require('./IndexProfilePartial.locale.pl.js'));


export default React.createClass({
  // propTypes: {
  //   contentPrefix: React.PropTypes.string.isRequired,
  // },
  //
  //
  // contextTypes: {
  //   currentBroadcastChannel: React.PropTypes.object.isRequired,
  //   apps: React.PropTypes.object.isRequired,
  // },


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



  fetchMetadataItems(tag) {
    RadioKit
      .query('vault', 'Data.Tag.Item')
      .select(
        'id', 'name', 'tag_category_id', 'metadata_items.id', 'metadata_items.value_string',
        'metadata_items.value_db', 'metadata_items.value_url', 'metadata_items.value_text',
        'metadata_items.value_date', 'metadata_items.value_datetime', 'metadata_items.value_time',
        'metadata_items.value_file', 'metadata_items.value_image',
        'metadata_items.value_float', 'metadata_items.value_integer',
        'metadata_items.metadata_schema_id', 'metadata_items.value_duration',
      )
      .joins('metadata_items')
      .where('id', 'eq', tag.get('id'))
      .on('error', () => {
      })
      .on('fetch', (_event, _query, data) => {
        const tagIndex = this.state.selectedTagItems.indexOf(tag);
        if (tagIndex > -1) {
          this.setState({
            selectedTagItems: this.state.selectedTagItems.remove(tagIndex).push(data.first()),
          });
        }
      })
      .fetch();
  },

  componentDidMount() {
    RadioKit
      .query('vault', 'Data.Tag.Category')
      .select(
        'id', 'name', 'tag_items.id', 'tag_items.name', 'tag_items.tag_category_id',
        'metadata_schemas.id', 'metadata_schemas.key', 'metadata_schemas.kind',
        'metadata_schemas.name',
      )
      .joins('metadata_schemas')
      .joins('tag_items')
      .where('record_repository_id', 'eq', this.props.record.get('id'))
      .on('fetch', (_event, _query, data) => {
        this.setState({
          categories: data.filterNot(category => category.get('tag_items').isEmpty()),
        });
      })
      .fetch();
  },




  onFormSubmit(values) {
    window.location.href = `${this.context.apps.vault.baseUrl}/api/royalties/v1.0/report/fetch?channel_id=${encodeURIComponent(this.context.currentBroadcastChannel.get('id'))}&template=${encodeURIComponent(values.template)}&month=${encodeURIComponent(values.month)}&year=${encodeURIComponent(values.year)}`;
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
