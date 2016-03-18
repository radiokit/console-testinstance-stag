export default {
  apps: {
    electron: {
      navigation: {
        title: "Electron",
        subtitle: "Make audio transmissions",
        devices: {
          title: "Connected devices",
        },
        transmissions: {
          title: "Transmissions",
        },
      },

      transmissions: {
        loading: "Fetching list of transmissions",
        errors: {
          no_devices: "There are no audio devices associated with this account, please add some audio devices first.",
          no_transmissions: "Currently there are no ongoing transmissions.",
        },
      },

      devices: {
        show: {
          header: "Audio interfaces",
          tabs: {
            headers: {
              audio_interface: "Audio interfaces",
            },

            body: {
              audio_interface: {
                table: {
                  index: {
                    table: {
                      header: {
                        name: "Name",
                        os_name: "Name in the OS",
                        direction: "Direction",
                        transmission_enabled: "Transmission",
                      }
                    }
                  }
                }
              }
            }
          }
        },

        index: {
          header: "Audio Devices",
          actions: {
            create: "Add device",
            delete: "Remove selected devices",
          },

          table: {
            loading: "Fetching list of connected devices",
            header: {
              name: "Name",
            },
          },

          modals: {
            delete: {
              header: "Delete device",
              message: {
                confirmation: "Are you sure that you want to delete %(count)s selected device(s)?",
                acknowledgement: "Deleted %(count)s device(s).",
                progress: "Deleting in progress…",
              },
              action: {
                proceed: "Delete",
                cancel: "Cancel",
                close: "Close",
              }
            },

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
                    instructions: "Find the app in the Google Play store and install it.",
                    action_open: "Open Google Play",
                  },
                  windows: {
                    header: "Windows",
                    instructions: "Download application using button below and install it.",
                    action_open: "Download",
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
