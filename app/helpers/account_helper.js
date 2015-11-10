export default {
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