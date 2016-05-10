import RadioKitDomain from '../RadioKitDomain';

const ScheduleQueries = RadioKitDomain.map(
  RKDData => RKDData.filter((queryStatus, queryParams) => queryParams.get('key') === 'schedule')
);

export default ScheduleQueries;
