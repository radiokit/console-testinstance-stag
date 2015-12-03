export default {
  apps: {
    infrastructure: {
      navigation: {
        title: "Infrastructure",
        client_nodes: {
          title: "Audio Devices",
        },

        diagram: {
          title: "Diagram",
        },
      },

      client_nodes: {
        index: {
          loading: "Fetching list of audio devices",
          header: "Audio Devices",
          actions: {
            create: "Add new device",
            delete: "Remove selected devices",
          },

          modals: {
            create: {
              header: "Add new device",
              form: {
                name: {
                  label: "Name of the device",
                  hint: "Choose any name that will help you to distinguish this device from others",
                },
              },

              acknowledgement: {
                header: "Device added succesfully",
                instructions: {
                  header: "Now please install an application on your device that will connect with the system. Once it's done, you will be able to use the device to transmit the sound from and to the system.",
                  os: "Choose instruction appropriate to the operating system installed on the device:",
                  android: {
                    header: "Android",
                    instructions: "Find the app in the Google Play store and install it.",
                    action_open: "Open Google Play",
                  },
                  windows: {
                    header: "Windows",
                    instructions: "Download application using button below and install it.",
                    action_open: "Download",
                  },
                  code: "During installation the application will ask you for the following code. It is valid for 15 minutes."
                }
              },

              action: {
                proceed: "Add device",
                cancel: "Cancel",
                close: "Close",
              }
            }
          }
        },
      }
    }
  }
}
