import React from 'react';
import Counterpart from 'counterpart';

import IndexTableBrowser from '../../../widgets/admin/crud/index_table_browser_widget.jsx';

Counterpart.registerTranslations('en', require('./ShowMetadataSchemaPartial.locale.en.js'));
Counterpart.registerTranslations('pl', require('./ShowMetadataSchemaPartial.locale.pl.js'));

const ShowMetadataSchema = React.createClass({

  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
  },

  modifyIndexQuery(query) {
    return query
      .where('record_repository_id', 'eq', this.props.record.get('id'))
      .order('name', 'asc');
  },

  buildAttributes() {
    return {
      name: { renderer: 'string' },
      key: { renderer: 'string' },
      kind: { renderer: 'string' },
    };
  },

  buildForm() {
    return {
      name: {
        type: 'string',
        hint: true,
        validators: {
          presence: true,
        },
      },
      key: {
        type: 'string',
        hint: true,
        validators: {
          presence: true,
        },
      },
      kind: {
        type: 'enum',
        values: [
          'string', 'db', 'integer', 'text', 'float', 'date', 'time',
          'datetime', 'url', 'duration', 'waveform', 'image', 'file',
        ],
        hint: false,
        validators: {
          presence: true,
        },
      },
      record_repository_id: {
        type: 'hidden',
        value: this.props.record.get('id'),
      },
    };
  },

  render() {
    return (
      <IndexTableBrowser
        contentPrefix = { this.props.contentPrefix + '.table' }
        app = "vault"
        model = "Data.Metadata.Schema"
        updateEnabled
        updateForm = {{
          name: {
            type: 'string',
            hint: true,
            validators: {
              presence: true,
            },
          },
        }}
        form = { this.buildForm() }
        attributes = { this.buildAttributes() }
        indexQueryFunc = { this.modifyIndexQuery }
      />
    );
  },
});

export default ShowMetadataSchema;
