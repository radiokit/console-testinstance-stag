export default {
  apps: {
    joint: {
      index: {
        loading: "Fetching list of available channels",
        none: "You have no permissions to any channel"        
      },

      partials: {
        channel: {
          return: {
            header: "Return",
            radio: {
              header: "Radio"
            },
            talkback: {
              header: "Talkback"
            }
          },

          transmissions: {
            header: "Transmissions"
          }
        }
      }
    }
  }
};