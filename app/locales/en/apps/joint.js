export default {
  apps: {
    joint: {
      index: {
        loading: "Fetching list of available channels",
        none: "You have no permissions to any channel"        
      },

      partials: {
        mix: {
          returns: {
            header: "Return",
            none: "No inputs available"
          },

          transmissions: {
            header: "Transmissions",
            none: "No inputs available"
          }
        },

        medium: {
          return: {
            radio: {
              header: "Broadcast"
            },
            talkback: {
              header: "Talkback"
            }
          },
          transmission: {
            studio: {
              header: "Studio"
            },
            reporter: {
              header: "Reporter"
            }
          }
        }
      }
    }
  }
};