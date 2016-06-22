import React from 'react';
import { List } from 'immutable';

import DeleteModal from '../../../../widgets/admin/crud/delete_modal.jsx';
import UpdateModal from '../../../../widgets/admin/crud/update_modal.jsx';

const TagList = React.createClass({

  propTypes: {
    tag: React.PropTypes.object.isRequired,
    contentPrefix: React.PropTypes.string.isRequired,
    onDataChanged: React.PropTypes.func.isRequired,
  },

  buildEditTagForm() {
    return {
      name: {
        type: 'string',
        hint: true,
        value: this.props.tag.get('name'),
        validators: {
          presence: true,
        },
      },
    };
  },

  render() {
    const deleteModalRef = `deleteTagModal-${this.props.tag.get('id')}`;
    const editModalRef = `editTagModal-${this.props.tag.get('id')}`;
    return (
      <li>
        <DeleteModal
          ref={ deleteModalRef }
          contentPrefix={ `${this.props.contentPrefix}.modals.delete_tag` }
          app="vault" model="Data.Tag.Item"
          selectedRecordIds={ List.of(this.props.tag.get('id')) }
          onDismiss={ this.props.onDataChanged }
        />
        <UpdateModal
          ref={ editModalRef }
          contentPrefix={ `${this.props.contentPrefix}.modals.edit_tag` }
          app="vault"
          model="Data.Tag.Item"
          recordId={ this.props.tag.get('id') }
          form={ this.buildEditTagForm() }
          onDismiss={ this.props.onDataChanged }
        />
        <div className="ShowTagsSchemaPartial__tagName card-head card-head-sm">
          <header className="ShowTagsSchemaPartial__listHeader">
            { this.props.tag.get('name') }
          </header>
          <div className="tools">
            <a className="btn btn-icon" onClick={ () => this.refs[editModalRef].show() }>
              <i className="mdi mdi-border-color" />
            </a>
            <a
              className="btn btn-flat ink-reaction btn-default"
              onClick={ () => this.refs[deleteModalRef].show() }
            >
              <i className="mdi mdi-delete" />
            </a>
          </div>
        </div>
      </li>
    );
  },
});

export default TagList;
