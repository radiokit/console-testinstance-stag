function getEnv() {
  if (typeof(window.ENV) === 'object') {
    return window.ENV;
  }
  return {
    auth: {
      accessToken: '123'
    },
    apps: {
      jungle: { baseUrl: 'https://jungle.radiokitapp-stag.org' },
      medium: { baseUrl: 'https://medium.radiokitapp-stag.org' },
      auth: { baseUrl: 'https://auth.radiokitapp-stag.org' },
      agenda: { baseUrl: 'https://agenda.radiokitapp-stag.org' },
      plumber: { baseUrl: 'https://plumber.radiokitapp-stag.org' },
      vault: { baseUrl: 'https://vault.radiokitapp-stag.org' },
      circumstances: { baseUrl: 'https://circumstances.radiokitapp-stag.org' },
      default: function(appName) {
        // That is called only if we're passing full lineup base URL instead
        // of app name in the broadcast view.
        return {
          baseUrl: appName,
        };
      }
    },
    external: {
    },
    verbose: false,
  };
}

export default getEnv();
