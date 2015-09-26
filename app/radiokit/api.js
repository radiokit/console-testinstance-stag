import Data from "./data.js";
import OAuth2 from "./auth/oauth2.js";


export default class ĄPI {
  constructor(options = {}) {
    if(!options.hasOwnProperty("auth") && options.hasOwnProperty("role")) {
      this.__auth = new OAuth2(options.role).authenticate();      
    }
  }


  data() {
    return new Data(this.__auth);
  }
}