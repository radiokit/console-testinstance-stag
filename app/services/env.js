function getEnv() {
    if (typeof(window.ENV) === "object") {
        return window.ENV;
    } else {
        return {
            auth: { clientId: "123", baseUrl: "https://radiokit-auth-stag.herokuapp.com" },
            apps: {
                "plumber" : { baseUrl: "https://radiokit-plumber-stag.herokuapp.com" },
                "auth" : { baseUrl: "https://radiokit-auth-stag.herokuapp.com" },
                "vault" : { baseUrl: "https://radiokit-vault-stag.herokuapp.com" },
                "agenda": { baseUrl: "https://radiokit-agenda-stag.herokuapp.com" },
                "diffusor": { baseUrl: "https://radiokit-diffusor-stag.herokuapp.com" },
            },
            verbose: true
        };
    }
}

export default getEnv();
