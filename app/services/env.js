function getEnv() {
  if (typeof(ENV) === "object") {
    return ENV;
  } else {
    return {
      auth: {clientId: "123", baseUrl: "https://radiokit-auth-stag.herokuapp.com"},
      apps: {
        "plumber": {baseUrl: "https://radiokit-plumber-stag.herokuapp.com"},
        "auth": {baseUrl: "https://radiokit-auth-stag.herokuapp.com"},
        "vault": {baseUrl: "https://radiokit-vault-stag.herokuapp.com"},
        "agenda": {baseUrl: "https://radiokit-agenda-stag.herokuapp.com"},
        "diffusor": {baseUrl: "https://radiokit-diffusor-stag.herokuapp.com"},
      },
      verbose: false
    };
  }
}

export default getEnv();
