function getEnv() {
  if (typeof(window.ENV) === 'object') {
    return window.ENV;
  }
  return {
    auth: {
      clientId: '123',
      baseUrl: 'https://auth.radiokitapp.org',
    },
    apps: {
      auth: { baseUrl: 'https://auth.radiokitapp.org' },
      agenda: { baseUrl: 'https://agenda.radiokitapp.org' },
      plumber: { baseUrl: 'https://plumber.radiokitapp.org' },
      vault: { baseUrl: 'https://vault.radiokitapp.org' },
    },
    external: {
    },
    verbose: false,
  };
}

export default getEnv();
