export default {
  getAudioInterfacesOfClient: (client, audioInterfaces) =>
    audioInterfaces.filter((audioInterface) =>
      audioInterface.get('device_client_id') === client.get('id')
    ),
};
