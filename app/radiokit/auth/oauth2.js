export default class OAuth2 {
  constructor(role) {
    this.__role = role;
    this.__baseUrl = "http://localhost:4000"; // FIXME
    this.__clientId = "123"; // FIXME
  }


  authenticate() { 
    if(window.location.hash !== "") {
      let hashAsDict = window.location.hash.substr(1).split("&").reduce(function(previous, current) {
        let splitted = current.split("=", 2);
        previous[splitted[0]] = splitted[1];
        return previous;
      }, {});

      if(hashAsDict.hasOwnProperty("access_token")) {
        console.log("Authenticated");
        this.__accessToken = hashAsDict["access_token"];
        this.__cleanupLocationHash(hashAsDict, "access_token")
        return this;

      } else if(hashAsDict.hasOwnProperty("error")) {
        console.warn("Authentication failed"); // TODO
        this.__cleanupLocationHash(hashAsDict, "error")

      } else {
        this.__redirectToAuthGateway();
      }

    } else {
      this.__redirectToAuthGateway();
    }
  }


  __cleanupLocationHash(hashAsDict, keyToDelete) {
    delete hashAsDict[keyToDelete];
    window.location.hash = Object.keys(hashAsDict).map(x => encodeURIComponent(x) + "=" + encodeURIComponent(hashAsDict[x])).join("&")
  }


  __redirectToAuthGateway() {
    let redirectUrl = window.location.origin + window.location.pathname + window.location.search;
    let authGatewayUrl = this.__baseUrl + "/oauth2/authorize/" + encodeURIComponent(this.__role) + "?response_type=token&client_id=" + encodeURIComponent(this.__clientId) + "&redirect_uri=" + encodeURIComponent(redirectUrl);

    console.log("Redirecting to auth gateway: " + authGatewayUrl);
    window.location.assign(authGatewayUrl);
  }
}