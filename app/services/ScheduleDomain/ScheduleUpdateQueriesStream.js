import RadioKitDomain from '../RadioKitDomain';

const ScheduleUpdateQueriesStream = RadioKitDomain.map(
  RKDData => RKDData.filter(
    (queryStatus, queryParams) => (
      queryParams.get('app') === 'plumber' &&
      queryParams.get('model') === 'Media.Input.File.Http' &&
      queryParams.get('action') &&
      queryStatus.get('status') === RadioKitDomain.STATUS.loading
    )
  )
);

export default ScheduleUpdateQueriesStream;
