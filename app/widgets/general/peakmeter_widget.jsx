import React from 'react';
import ReactAddons from 'react/addons';

import '../../assets/stylesheets/widgets/general/peakmeter.scss';


export default React.createClass({
  mixins: [ReactAddons.addons.PureRenderMixin],

  propTypes: {
    peakValues: React.PropTypes.array.isRequired,
    rmsValues: React.PropTypes.array.isRequired,
    thresholdHigh: React.PropTypes.number,
    thresholdMedium: React.PropTypes.number,
    thresholdLow: React.PropTypes.number,
    barWidth: React.PropTypes.number,
    barMargin: React.PropTypes.number
  },


  getDefaultProps: function() {
    return { 
      thresholdHigh: -6,
      thresholdMedium: -20,
      thresholdLow: -80,
      barWidth: 16,
      barMargin: 1
    };
  },


  renderChannel: function(index, peak, rms) {
    if(peak <= this.props.thresholdLow) {
      var lowHeight = 0;
      var mediumHeight = 0;
      var highHeight = 0;
    
    } else if(peak <= this.props.thresholdMedium) {
      var lowHeight = 100 - (peak / this.props.thresholdLow) * 100;
      var mediumHeight = 0;
      var highHeight = 0;

    } else if(peak <= this.props.thresholdHigh) {
      var lowHeight = 100 - (this.props.thresholdMedium / this.props.thresholdLow) * 100;
      var mediumHeight = 100 - (peak / this.props.thresholdLow) * 100;
      var highHeight = 0;
    
    } else {
      var lowHeight = 100 - (this.props.thresholdMedium / this.props.thresholdLow) * 100;
      var mediumHeight = 100 - (this.props.thresholdHigh / this.props.thresholdLow) * 100;
      var highHeight = 100 - (peak / this.props.thresholdLow) * 100;
    }


    return (
      <div key={"peakmeter-bar-" + index} className="bar" style={{left: (((this.props.barWidth + this.props.barMargin) * index) - this.props.barMargin) + "px", width: this.props.barWidth + "px"}}>
        <div className="high" style={{height: highHeight + "%"}} />
        <div className="medium" style={{height: mediumHeight + "%"}} />
        <div className="low" style={{height: lowHeight + "%"}} />
      </div>
    );
  },


  render: function() {
    if(this.props.peakValues.length !== this.props.rmsValues.length) {
      throw "Amount of peak values must be equal to amount of RMS values";
    } 
    
    return (
      <div className="widgets-general-peakmeter--container">
        <div className="bars" style={{marginLeft: ((this.props.barWidth + this.props.barMargin) * this.props.peakValues.length - this.props.barMargin) / -2 + "px"}}>
          {this.props.peakValues.map((_, i) => { return this.renderChannel(i, this.props.peakValues[i], this.props.rmsValues[i]); })}
          <div className="label low" style={{bottom: 0, left: ((this.props.barWidth + this.props.barMargin) * this.props.peakValues.length - this.props.barMargin) + "px"}}><div>{this.props.thresholdLow}</div></div>
          <div className="label medium" style={{bottom: 100 - (this.props.thresholdMedium / this.props.thresholdLow) * 100 + "%", left: ((this.props.barWidth + this.props.barMargin) * this.props.peakValues.length - this.props.barMargin) + "px"}}><div>{this.props.thresholdMedium}</div></div>
          <div className="label high" style={{bottom: 100 - (this.props.thresholdHigh / this.props.thresholdLow) * 100 + "%", left: ((this.props.barWidth + this.props.barMargin) * this.props.peakValues.length - this.props.barMargin) + "px"}}><div>{this.props.thresholdHigh}</div></div>
          <div className="label over" style={{bottom: "100%", left: ((this.props.barWidth + this.props.barMargin) * this.props.peakValues.length - this.props.barMargin) + "px"}}><div>0</div></div>
        </div>
      </div>
    );
  }
});
