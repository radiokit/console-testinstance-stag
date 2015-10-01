export default {
  apps: {
    joint: {
      index: {
        loading: "Pobieranie listy dostępnych kanałów",
        none: "Nie masz uprawnień do ani jednego kanału"
      },

      partials: {
        channel: {
          return: {
            header: "Zwrotna",
            radio: {
              header: "Radio"
            },
            talkback: {
              header: "Talkback"
            }
          },

          transmissions: {
            header: "Transmisje"
          }
        }
      }
    }
  }
};