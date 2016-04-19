export default {
  getCurrentAccountIdFromContext(context) {
    if (context.props.hasOwnProperty('currentUserAccountId')) {
      return context.props.currentUserAccountId;
    } else if (context.props.hasOwnProperty('params')) {
      return context.props.params.userAccountId;
    } else if (context.props.hasOwnProperty('currentUserAccount')) {
      return context.props.currentUserAccount.get('id');
    } else if (context.context.hasOwnProperty('scopeUserAccountId')) {
      return context.context.scopeUserAccountId;
    }
    throw new Error([
      'Unable to extract current account ID from context, context = \'',
      context,
      '\', context.props = \'',
      context.props,
      '\', context.params = ',
      context.params,
    ].join(''));
  },
};
