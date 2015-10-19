export default {
  apps: {
    joint: {
      index: {
        loading: "Fetching list of available channels",
        none: "You have no permissions to any channel"        
      },

      client_nodes: {
        create: {
          header: "Add new device",
          form: {
            name: {
              label: "Name of the device",
              hint: "Optionally, choose any name that will help you to later distinguish this device from others"
            },
            submit: "Add"
          }
        },
        index: {
          loading: "Fetching list of associated devices",
          none: "There are no associated devices"                  
        }
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
        }

      }
    }
  }
};