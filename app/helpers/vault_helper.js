import RadioKit from '../services/RadioKit';

export default {
  loadRepository(context, role) {
    RadioKit
      .query('vault', 'Data.Record.Repository')
      .select('id', 'metadata_schemas')
      .joins('metadata_schemas')
      .where('references', 'deq', 'user_account_id', context.context.currentAccount.get('id'))
      .where('references', 'deq', 'role', role)
      .on(
        'error',
        () => {
          if (context.isMounted()) {
            context.setState({
              loadingError: true,
            });
          }
        }
      )
      .on(
        'fetch',
        (_event, _query, data) => {
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
        }
      )
      .fetch();
  },
};
