export default {
  apps: {
    broadcast: {
      metadata: {
        override: {
          form: {
            nowPlaying: {
              label: "Now playing",
              hint: "Type text that should override current track information. Leave blank to use automatically generated information based on the playlist."
            },
          },
          submit: "Save",
          clear: "Clear",
        },
      },
    },
  },
};
