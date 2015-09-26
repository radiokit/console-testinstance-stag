export default class DataModel {
  constructor(auth, appName, modelName) {
    this.__auth = auth;
    this.__appName = appName;
    this.__modelName = modelName;
  }


  find(id) {
    console.log("Data.Model#find " + this.__appName + " / " + this.modelName + " # " + id);
    // TODO
  }


  
}