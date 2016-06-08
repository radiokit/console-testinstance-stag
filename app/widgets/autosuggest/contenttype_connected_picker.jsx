import React from 'react';
import connect from 'immview-react-connect';
import ContentTypeDomain from '../../services/ContentTypesDomain';
import ContentTypePicker from './contenttype_picker.jsx';

const ContentTypeConnectedPicker = (props) => (
  <ContentTypePicker
    {...props}
  />
);

ContentTypeConnectedPicker.propTypes = {
  placeholder: React.PropTypes.string,
  value: React.PropTypes.object,
  onChange: React.PropTypes.func,
  onInputChange: React.PropTypes.func,
  pickDefaultIfSingle: React.PropTypes.bool,
  // connector input
  broadcastChannelId: React.PropTypes.string,
  // connector output
  items: React.PropTypes.object.isRequired,
};

export default connect(
  ContentTypeConnectedPicker,
  ContentTypeDomain,
  (data, { broadcastChannelId, value, onChange }) => {
    ContentTypeDomain.loadChannelPlans(broadcastChannelId);
    const items = data.get('entities').filter(
      plan => plan.get('broadcast_channel_id') === broadcastChannelId
    );

    if (items.size === 1 && !value) {
      onChange && onChange(items.first());
    }

    return {
      items,
    };
  }
);
