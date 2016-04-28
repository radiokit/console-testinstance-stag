import React from 'react';
import ReactDOM from 'react-dom';
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
    $(this.getNode()).modal("show");
  },

  onHide: function() {
    if(this.props.onHide) {
      this.props.onHide(this);
    }
  },

  componentWillUnmount: function() {
    $(this.getNode()).off("hide.bs.modal", this.onHide);
  },

  onShow: function() {
    if(this.props.onShow) {
      this.props.onShow(this);
    }
  },

  componentDidMount: function() {
    $(this.getNode()).on("show.bs.modal", this.onShow);
  },

  getNode() {
    return ReactDOM.findDOMNode(this.refs.modal);
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
            <button type="button" className="close" data-dismiss="modal" onClick={this.onHide} aria-hidden="true">×</button>
            <Translate component="h4" content={this.props.contentPrefix + ".header"} className="modal-title" />
          </div>

          {this.props.children}

        </div>
      </div>
    </div>);
  }
});
