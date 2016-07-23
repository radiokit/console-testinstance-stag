export default {
  apps: {
    electron: {
      patchbay: {
        index: {
          modals: {
            create: {
              header: "Add device",
              form: {
                name: {
                  label: "Name of the device",
                  hint: "Choose any name that will help you to distinguish this device from others.",
                },
              },

              acknowledgement: {
                header: "Device added succesfully",
                instructions: {
                  header: "Now please install an application on your device that will connect with the system. During installation the application will ask you for the following code. It is valid for 15 minutes. Once it's done, you will be able to use the device to transmit the sound from and to the system.",
                  os: "Choose instruction appropriate to the operating system installed on the device:",
                  android: {
                    header: "Android",
                    instructions: "Find the RadioKit Electron app in the Google Play store and install it.",
                    action_open: "Open Google Play",
                  },
                  windows: {
                    header: "Windows",
                    instructions: "Download application using button below and install it.",
                    action_open_32bit: "32-bit",
                    action_open_64bit: "64-bit",
                  },
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
      },
    }
  }
}
