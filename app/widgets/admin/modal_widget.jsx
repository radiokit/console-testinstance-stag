import React from 'react';
import ReactDOM from 'react-dom';
import Translate from 'react-translate-component';

// FIXME do not use jquery
import $ from 'jquery';
import 'bootstrap-sass';

export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    size: React.PropTypes.oneOf(['normal', 'large']),
    children: React.PropTypes.any,
    onShow: React.PropTypes.func,
    onHide: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      size: 'normal',
    };
  },

  componentDidMount() {
    $(this.getNode()).on('show.bs.modal', this.handleShow);
  },

  componentWillUnmount() {
    $(this.getNode()).off('hide.bs.modal', this.handleHide);
  },

  getNode() {
    return ReactDOM.findDOMNode(this.refs.modal);
  },

  show() {
    $(this.getNode()).modal('show');
  },

  hide() {
    $(this.getNode()).modal('hide');
  },

  handleHide() {
    if (this.props.onHide) {
      this.props.onHide(this);
    }
  },

  handleShow() {
    if (this.props.onShow) {
      this.props.onShow(this);
    }
  },

  render() {
    let containerClassName;
    if (this.props.size === 'large') {
      containerClassName = 'modal-dialog modal-lg';
    } else {
      containerClassName = 'modal-dialog';
    }

    return (<div ref="modal" className="modal fade in" role="dialog">
      <div className={containerClassName}>
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={this.handleHide}
              aria-hidden="true"
              children="×"
            />
            <Translate
              component="h4"
              content={`${this.props.contentPrefix}.header`}
              className="modal-title"
            />
          </div>

          {this.props.children}

        </div>
      </div>
    </div>);
  },
});
