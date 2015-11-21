export default {
  apps: {
    joint: {
      navigation: {
        title: "Transmissions"
      },

      control_room: {
        talkbacks: {
          header: "Talkbacks",
        },
        transmissions: {
          header: "Transmissions",
        },
        broadcast: {
          header: "On air",
        },
      },

      devices: {
        create: {
          form: {
            header: "Add new device",
            name: {
              label: "Name of the device",
              hint: "Optionally, choose any name that will help you to later distinguish this device from others, e.g. \"Adam's laptop\""
            },
            submit: "Add"
          },

          pending: {
            header: "Adding new device…"
          },

          created: {
            header: "Device added succesfully",
            instructions: {
              header: "Now please install an application on your device that will connect with the system. Once it's done, you will be able to use the device to transmit the sound from and to the system.",
              os: "Choose instruction appropriate to the operating system installed on the device:",
              android: {
                header: "Android",
                instructions: "Find Joint.FM app in the Google Play store and install it.",
                action_open: "Open Google Play",
              },
              windows: {
                header: "Windows",
                instructions: "Download application using button below and install it.",
                action_open: "Download",
              },
              code: "During installation the application will ask you for the following code. It is valid for 15 minutes."
            }
          }
        },
        index: {
          loading: "Fetching list of associated devices",
          none: "There are no associated devices",
          header: "List of associated devices",
          table: {
            header: {
              name: "Name",
              os_type: "OS"
            }
          }
        }
      },
    }
  }
};
