function getEnv() {
  if (typeof(window.ENV) === 'object') {
    return window.ENV;
  }
  return {
    auth: {
      clientId: "123",
      baseUrl: "https://auth.radiokitapp-stag.org"
    },
    apps: {
      "auth"     : { baseUrl: "https://auth.radiokitapp-stag.org" },
      "agenda"   : { baseUrl: "https://agenda.radiokitapp-stag.org" },
      "plumber"  : { baseUrl: "https://plumber.radiokitapp-stag.org" },
      "vault"    : { baseUrl: "https://vault.radiokitapp-stag.org" },
    },
    external: {
    },
    verbose: false,
  };
}

export default getEnv();
