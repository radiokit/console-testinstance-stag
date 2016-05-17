import React from 'react';

import AutoDJForm from './autodj_form.jsx';
import Modal from '../../../../widgets/admin/modal_widget.jsx';

// import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import localePL from './autodj_modal_pl';
import localeEN from './autodj_modal_en';

Counterpart.registerTranslations('en', localeEN);
Counterpart.registerTranslations('pl', localePL);

const AutoDJModal = React.createClass({
  propTypes: {
    ...AutoDJForm.propTypes,
  },

  getDefaultProps() {
    return {
      defaultTimePeriod: 3600000, // 1h in ms
    };
  },

  show() {
    this.refs.modal.show();
  },

  hide() {
    this.refs.modal.hide();
  },

  handleFormAccept() {
    const { afterFormAccept } = this.props;
    afterFormAccept && afterFormAccept();
    this.hide();
  },

  render() {
    const formProps = {
      ...this.props,
      afterFormAccept: this.handleFormAccept,
    };

    return (
      <Modal contentPrefix="AutoDJModal.modal" ref="modal">
        <AutoDJForm {...formProps} />
      </Modal>
    );
  },
});

export default AutoDJModal;
