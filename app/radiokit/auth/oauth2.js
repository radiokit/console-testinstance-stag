export default class OAuth2 {
  constructor(role) {
    this.role = role;

    this.baseUrl = "http://localhost:4000"; // FIXME
    this.clientId = "123"; // FIXME
  }


  authenticate() { 
    if(window.location.hash !== "") {
      let hashAsDict = window.location.hash.substr(1).split("&").reduce(function(previous, current) {
        let splitted = current.split("=", 2);
        previous[splitted[0]] = splitted[1];
        return previous;
      }, {});

      if(hashAsDict.hasOwnProperty("access_token")) {
        this.accessToken = hashAsDict["access_token"];
        this.cleanupLocationHash(hashAsDict, "access_token")

      } else if(hashAsDict.hasOwnProperty("error")) {
        alert("Authentication failed"); // TODO
        this.cleanupLocationHash(hashAsDict, "error")

      } else {
        this.redirectToAuthGateway();
      }

    } else {
      this.redirectToAuthGateway();
    }
  }


  cleanupLocationHash(hashAsDict, keyToDelete) {
    delete hashAsDict[keyToDelete];
    window.location.hash = Object.keys(hashAsDict).map(x => encodeURIComponent(x) + "=" + encodeURIComponent(hashAsDict[x])).join("&")
  }


  redirectToAuthGateway() {
    if(window.location.hash !== "") {
      var redirectUrl = window.location.href.slice(0, window.location.hash.length * -1);
    } else {
      var redirectUrl = window.location.href;
    }

    window.location.assign(this.baseUrl + "/oauth2/authorize/" + encodeURIComponent(this.role) + "?response_type=token&client_id=" + encodeURIComponent(this.clientId) + "&redirect_uri=" + encodeURIComponent(redirectUrl));
  }
}