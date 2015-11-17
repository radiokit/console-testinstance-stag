import AccountHelper from './account_helper.js';

export default {
  loadMixGroup: function(context, role) {
    window.data
      .query("plumber", "Media.Routing.MixGroup")
      .select("id")
      .where("references", "deq", "user_account_id", AccountHelper.getCurrentAccountIdFromContext(context))
      .where("references", "deq", "role", role)
      .on("error", () => {
        if(context.isMounted()) {
          context.setState({
            loadingError: true
          })
        }
      }).on("update", (_, response) => {
        if(context.isMounted()) {

          if(response.getData().count() != 0) {
            context.setState({
              currentRepository: response.getData().first(),
              loadedRepository: true
            });

          } else {
            context.setState({
              loadingError: true
            })
          }
        }
      }).fetch();
  },

}
