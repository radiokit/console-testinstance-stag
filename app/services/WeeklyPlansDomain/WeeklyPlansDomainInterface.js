import RadioKitDomain from '../RadioKitDomain';
import {
  app,
  model,
  key,
  readFields,
} from './WeeklyPlansConfig';

export function loadChannelPlans(broadcastChannelId, requestOptions) {
  RadioKitDomain.query(
    {
      [key]: true,
      app,
      model,
      select: readFields,
      conditions: [
        {
          field: 'broadcast_channel_id',
          comparison: 'eq',
          value: broadcastChannelId,
        },
      ],
    },
    requestOptions
  );
}
