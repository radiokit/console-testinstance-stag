import Immutable from 'immutable';

import mockData from './MOCK_DATA';


export default {
  formatDateRange({ start, end }) {
    const format = 'YYYY-MM-DD';
    return { start: start.format(format), end: end.format(format) };
  },
  users(dateRange) {
    const { start /* , end */ } = this.formatDateRange(dateRange);
    return Immutable.fromJS(
      start === '2016-07-01' ? mockData.users_july : mockData.users_august).toIndexedSeq();
  },
  watched(watcherId, dateRange) {
    return {
      name: mockData.users_july.filter(u => u.id === watcherId + 1)[0].name,
      data: dateRange.toArray('days').map(() => Math.floor(Math.random() * 100)),
    };
  },
};
