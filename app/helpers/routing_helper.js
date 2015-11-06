export default {
  apps: {
    joint: {
      devices: {
        index: function(context) {
          return "/apps/joint/" + this.getCurrentAccountIdFromContext(context) + "/devices/index";
        },

        create: function(context) {
          return "/apps/joint/" +  this.getCurrentAccountIdFromContext(context) + "/devices/create";
        },

        add: function(context, role) {
          return "/apps/joint/" +  this.getCurrentAccountIdFromContext(context) + "/devices/add/" + role;
        },


        getCurrentAccountIdFromContext: function(context) {
          if(context.props.hasOwnProperty("currentAccount")) {
            return context.props.currentAccount.get("id");

          } else if(context.props.hasOwnProperty("params")) {
            return context.props.params.userAccountId;

          } else {
            throw new Error("Unable to extract current account ID from context, context = " + context + ", context.props = " + context.props + ", context.params = " + context.params);
          }
        }
      }
    }
  }
}
