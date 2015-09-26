import DataApp from "./data/app.js";


export default class Data {
  constructor(auth) {
    this.__auth = auth;
  }


  app(appName) {
    return new DataApp(this.__auth, appName);
  }
}