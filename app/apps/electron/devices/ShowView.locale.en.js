export default {
  apps: {
    electron: {
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
        }
      }
    }
  }
}
