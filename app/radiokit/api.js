import Data from "./data.js";
import OAuth2 from "./auth/oauth2.js";


export default class ĄPI {
  constructor(options = {}) {
    this.options = options;
    
    if(!this.options.hasOwnProperty("auth") && this.options.hasOwnProperty("role")) {
      this.options.auth = new OAuth2(this.options.role).authenticate();      
    }
  }


  data() {
    return new Data({ parentOptions: this.options });
  }
}