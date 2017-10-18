window.ENV = {
  auth: {
    clientId: "5ae8ec19f68ad074a212053b1550c96e497a6fd559e01b4c1c1708386153951b",
    baseUrl: "https://auth.radiokitapp-stag.org"
  },
  apps: {
    "jungle"        : { baseUrl: "https://jungle-testinstance.radiokitapp-stag.org" },
    "medium"        : { baseUrl: "https://medium-testinstance.radiokitapp-stag.org" },
    "auth"          : { baseUrl: "https://auth-testinstance.radiokitapp-stag.org" },
    "agenda"        : { baseUrl: "https://agenda-testinstance.radiokitapp-stag.org" },
    "vault"         : { baseUrl: "https://vault-testinstance.radiokitapp-stag.org" },
    "circumstances" : { baseUrl: 'https://circumstances-testinstance.radiokitapp-stag.org' },
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
  verbose: true,
  env: "stag"
};
