import React from 'react';
import Translate from 'react-translate-component';


export default React.createClass({
  propTypes: {
    contentPrefix: React.PropTypes.string.isRequired,
    record: React.PropTypes.object.isRequired,
  },


  render: function() {
    return (
      <div>
        <div>
          <Translate component="p" className="text-center" content={`${this.props.contentPrefix}.acknowledgement.instructions.header`} />
        </div>

        <p className="text-xxxl text-center selectable">{this.props.record.get("authorization_code")}</p>

        <div>
          <Translate component="p" className="text-center" content={`${this.props.contentPrefix}.acknowledgement.instructions.os`} />

          <div className="row style-accent">
            <div className="col-md-6 text-center">
              <Translate component="h2" content={`${this.props.contentPrefix}.acknowledgement.instructions.android.header`} />
              <i className="mdi mdi-android text-xxxxl small-padding"/>
              <Translate component="p" content={`${this.props.contentPrefix}.acknowledgement.instructions.android.instructions`} />
              <div className="btn-group btn-group-justified small-padding" role="group">
                <a className="btn btn-default-bright">
                  <Translate component="span" content={`${this.props.contentPrefix}.acknowledgement.instructions.android.action_open`} />
                </a>
              </div>
            </div>

            <div className="col-md-6 text-center">
              <Translate component="h2" content={`${this.props.contentPrefix}.acknowledgement.instructions.windows.header`} />
              <i className="mdi mdi-windows text-xxxxl small-padding"/>
              <Translate component="p" content={`${this.props.contentPrefix}.acknowledgement.instructions.windows.instructions`} />
              <div className="btn-group btn-group-justified small-padding" role="group">
                <a className="btn btn-default-bright">
                  <Translate component="span" content={`${this.props.contentPrefix}.acknowledgement.instructions.windows.action_open`} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
