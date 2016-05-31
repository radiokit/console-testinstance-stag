import React from 'react';
import connect from 'immview-react-connect';
import WeeklyPlanDomain from '../../services/WeeklyPlansDomain';
import WeeklyPlanPicker from './weeklyplan_picker.jsx';

const WeeklyPlanConnectedPicker = React.createClass({
  propTypes: {
    placeholder: React.PropTypes.string,
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
    onInputChange: React.PropTypes.func,
    // connector input
    broadcastChannelId: React.PropTypes.string,
    // connector output
    items: React.PropTypes.object.isRequired,
  },

  render() {
    return (
      <WeeklyPlanPicker
        {...this.props}
      />
    );
  },
});

export default connect(
  WeeklyPlanConnectedPicker,
  WeeklyPlanDomain,
  (data, props) => {
    WeeklyPlanDomain.loadChannelPlans(props.broadcastChannelId);
    return {
      items: data.get('entities').filter(
        plan => plan.get('broadcast_channel_id') === props.broadcastChannelId
      ),
    };
  }
);
