export default {
  apps: {
    joint: {
      index: {
        loading: "Pobieranie listy dostępnych kanałów",
        none: "Nie masz uprawnień do ani jednego kanału"
      },

      partials: {
        mix: {
          returns: {
            header: "Zwrotna",
            none: "Brak źródeł dźwięku"
          },

          transmissions: {
            header: "Transmisje",
            none: "Brak źródeł dźwięku"
          }
        },

        medium: {
          return: {
            radio: {
              header: "Antena"
            },
            talkback: {
              header: "Interkom"
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