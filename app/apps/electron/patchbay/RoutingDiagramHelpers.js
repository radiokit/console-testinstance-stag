import { Data } from 'radiokit-api';

export default {
  getAudioInterfacesOfClient: function(client, audioInterfaces) {
    let clientGlobalID = Data.buildRecordGlobalID("auth", "Client.Standalone", client.get("id"));

    return audioInterfaces.filter((audioInterface) => {
      return (
        audioInterface.has("references") && audioInterface.get("references") !== null &&
        audioInterface.get("references").has("owner") && audioInterface.get("references").has("owner") !== null &&
        audioInterface.get("references").get("owner") === clientGlobalID
      );
    });
  }
}
