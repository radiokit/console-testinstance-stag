import RadioKit from '../services/RadioKit';
import AccountHelper from './account_helper.js';

export default {
  loadMixGroup(context, role) {
    RadioKit
      .query('plumber', 'Media.Routing.MixGroup')
      .select('id')
      .where(
        'references',
        'deq',
        'user_account_id',
        AccountHelper.getCurrentAccountIdFromContext(context)
      )
      .where('references', 'deq', 'role', role)
      .on('error', () => {
        if (context.isMounted()) {
          context.setState({
            loadingError: true,
          });
        }
      })
      .on('fetch', (_event, _query, data) => {
        if (context.isMounted()) {
          if (data.count() !== 0) {
            context.setState({
              currentRepository: data.first(),
              loadedRepository: true,
            });
          } else {
            context.setState({
              loadingError: true,
            });
          }
        }
      })
      .fetch();
  },
};
