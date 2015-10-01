import React from 'react';
import Translate from 'react-translate-component';

import Card from '../../../widgets/admin/card_widget.jsx';

import '../../../assets/stylesheets/apps/joint/partials/mix.scss';

import Medium from './medium_partial.jsx';


export default React.createClass({
  propTypes: {
    role: React.PropTypes.string.isRequired, 
    inputs: React.PropTypes.object.isRequired 
  },


  renderMedia: function() {
    if(this.props.inputs.count() === 0) {
      return <Translate content={"apps.joint.partials.mix." + this.props.role + ".none"} className="none" component="div"/>;

    } else {
      return this.props.inputs.map((x) => { return <Medium key={"joint-mix-" + x.get("kind") + "-" + x.get("input").get("id")} kind={x.get("kind")} role={x.get("role")} input={x.get("input")} totalCount={this.props.inputs.count()} />; })
    }
  },


  render: function() {
    return (
      <Card header={true} className="apps-joint-partial-mix--container" headerTextKey={"apps.joint.partials.mix." + this.props.role + ".header"}>
        {this.renderMedia()}
      </Card>
    );
  }
});
