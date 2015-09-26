import DataModel from "./model.js";

export default class DataApp {
  constructor(auth, appName) {
    this.__auth = auth;
    this.__appName = appName;
  }


  model(modelName) {
    return new DataModel(this.__auth, this.__appName, modelName);
  }
}