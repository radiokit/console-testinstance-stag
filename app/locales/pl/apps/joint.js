export default {
  apps: {
    joint: {
      navigation: {
        title: "Transmisje"
      },

      control_room: {
        talkbacks: {
          header: "Talkback",
        },
        transmissions: {
          header: "Transmisje",
        },
        broadcast: {
          header: "Antena",
        },
      },

      devices: {
        create: {
          form: {
            header: "Dodawanie urządzenia",
            name: {
              label: "Nazwa urządzenia",
              hint: "Jeśli chcesz, wybierz jakąś nazwę urządzenia, która pozwoli Ci odróżnić je później od innych, np. „Laptop Adama”"
            },
            submit: "Dodaj"
          },

          pending: {
            header: "Trwa dodawanie urządzenia"
          },

          created: {
            header: "Pomyślnie dodano urządzenie",
            instructions: {
              header: "Teraz zainstaluj na swoim urządzeniu aplikację, która połączy się z systemem. Jak to zrobisz, będziesz mieć możliwość przesyłania dźwięku z oraz do systemu za pomocą tego urządzenia.",
              os: "Wybierz instrukcję zgodną z systemem operacyjnym zainstalowanym na urządzeniu:",
              android: {
                header: "Android",
                instructions: "Znajdź aplikację Joint.FM w sklepie Google Play i zainstaluj ją.",
                action_open: "Otwórz Google Play",
              },
              windows: {
                header: "Windows",
                instructions: "Pobierz aplikację z używając przycisku znajdującego się poniżej i zainstaluj ją.",
                action_open: "Pobierz",
              },
              code: "Podczas instalacji aplikacja poprosi Cię o podanie poniższego kodu. Jest on ważny 15 minut."
            }
          }
        },
        index: {
          loading: "Pobieranie listy zarejestrowanych urządzeń",
          none: "Nie zarejestrowano dotychczas żadnych urządzeń",
          header: "Lista zarejestrowanych urządzeń",
          table: {
            headers: {
              name: "Nazwa",
              os_type: "System"
            }
          }
        }
      },
    }
  }
};
