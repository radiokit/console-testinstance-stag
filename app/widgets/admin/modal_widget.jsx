import React from 'react';
import Translate from 'react-translate-component';

// FIXME do not use jquery
import $ from 'jquery';
import Bootstrap from 'bootstrap-sass';

export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    size: React.PropTypes.oneOf(['normal', 'large']),
    onShow: React.PropTypes.func,
    onHide: React.PropTypes.func,
  },


  getDefaultProps: function() {
    return {
      size: "normal",
    }
  },


  show: function() {
    $(this.refs.modal).modal("show");
  },


  onShow: function() {
    if(this.props.onShow) {
      this.props.onHide(this);
    }
  },


  componentDidMount: function() {
    $(this.refs.modal).on("hide.bs.modal", this.onHide);
  },


  componentWillUnmount: function() {
    $(this.refs.modal).off("hide.bs.modal", this.onHide);
  },


  onShow: function() {
    if(this.props.onShow) {
      this.props.onShow(this);
    }
  },


  componentDidMount: function() {
    $(this.refs.modal).on("show.bs.modal", this.onShow);
  },


  componentWillUnmount: function() {
    $(this.refs.modal).off("show.bs.modal", this.onShow);
  },


  render: function() {
    let klass;
    if(this.props.size === "large") {
      klass = "modal-dialog modal-lg";
    } else {
      klass = "modal-dialog";
    }

    return (<div ref="modal" className="modal fade in" role="dialog">
      <div className={klass}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
            <Translate component="h4" content={this.props.contentPrefix + ".header"} className="modal-title" />
          </div>

          {this.props.children}

        </div>
      </div>
    </div>);
  }
});
