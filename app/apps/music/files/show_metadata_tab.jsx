import React from 'react';

export default React.createClass({
  propTypes: {
    currentFile: React.PropTypes.object.isRequired,
    currentRepository: React.PropTypes.object.isRequired,
  },


  render: function() {
    return (
      <div>
        {this.props.currentRepository.get("metadata_schemas").map((metadataSchema) => {
          return (<div className="row">
            <div className="col-md-6">
              {metadataSchema.get("key")}
            </div>
            <div className="col-md-6">
              <input type="text" />
            </div>
          </div>);
        })}
      </div>
    );
  }
});
