export default class DataCollection {
  constructor(auth, appName, modelName, conditions = {}) {
    this.__auth = auth;
    this.__appName = appName;
    this.__modelName = modelName;
    this.__conditions = conditions;
  }


    
}