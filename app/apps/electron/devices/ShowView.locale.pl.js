export default {
  apps: {
    electron: {
      devices: {
        show: {
          header: "Interfejsy audio",
          tabs: {
            headers: {
              audio_interface: "Interfejsy audio",
            },

            body: {
              audio_interface: {
                table: {
                  index: {
                    table: {
                      header: {
                        name: "Nazwa",
                        os_name: "Nazwa w systemie",
                        direction: "Rodzaj",
                        transmission_enabled: "Transmisja",
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
