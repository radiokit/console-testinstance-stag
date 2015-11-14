import React from 'react';

export default React.createClass({
  propTypes: {
    currentFile: React.PropTypes.object.isRequired,
  },


  getInitialState: function() {
    return {
      currentVariantWaveform: null,
      loadedVariantWaveform: false,
      loadingError: false,
    };
  },


  componentDidMount: function() {
    this.loadVariantWaveform();
  },


  loadVariantWaveform: function() {
    window.data
      .query("vault", "Record.Variant")
      .select("public_url")
      .where("record_file_id", "eq", this.props.currentFile.get("id"))
      .where("filter", "eq", "visualisation.waveform")
      .on("error", () => {
        if(this.isMounted()) {
          this.setState({
            loadingError: true
          })
        }
      }).on("update", (_, response) => {
        if(this.isMounted()) {

          if(response.getData().count() != 0) {
            this.setState({
              currentVariantWaveform: response.getData().first(),
              loadedVariantWaveform: true
            });

          } else {
            this.setState({
              loadedVariantWaveform: true,
            })
          }
        }
      }).fetch();
  },

  render: function() {
    if(this.state.loadedVariantWaveform) {
      if(this.state.currentVariantWaveform) {
        return (
          <div style={{background: "#666" }}>
            <img src={this.state.currentVariantWaveform.get("public_url")} style={{width: "100%"}} />
          </div>
        );
      } else {
        return <div/>;
      }

    } else {
      return (
        <div>
          Loading...
        </div>
      );
    }

  }
});
