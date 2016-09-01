function getEnv() {
  if (typeof(window.ENV) === 'object') {
    return window.ENV;
  }
  return {
    auth: {
      clientId: '123',
      baseUrl: 'https://auth.radiokitapp-stag.org',
    },
    apps: {
      jungle: { baseUrl: 'https://jungle.radiokitapp-stag.org' },
      medium: { baseUrl: 'https://medium.radiokitapp-stag.org' },
      auth: { baseUrl: 'https://auth.radiokitapp-stag.org' },
      agenda: { baseUrl: 'https://agenda.radiokitapp-stag.org' },
      plumber: { baseUrl: 'https://plumber.radiokitapp-stag.org' },
      vault: { baseUrl: 'https://vault.radiokitapp-stag.org' },
      journal: { baseUrl: 'https://journal.radiokitapp-stag.org' }
    },
    external: {
    },
    verbose: false,
  };
}

export default getEnv();
