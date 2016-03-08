export default {
  apps: {
    electron: {
      navigation: {
        title: "Electron",
        client_nodes: {
          title: "Podłączone urządzenia",
        },
      },

      client_nodes: {
        index: {
          header: "Podłączone urządzenia",
          actions: {
            create: "Dodaj urządzenie",
            delete: "Usuń zaznaczone urządzenia",
          },

          table: {
            loading: "Ładowanie listy podłączonych urządzeń",
            header: {
              name: "Nazwa",

            },
          },

          modals: {
            delete: {
              title: "Usuwanie podłączonych urządzeń",
              message: {
                confirmation: "Czy na pewno chcesz usunąć zaznaczone urządzenia (%(count)s szt.)?",
                acknowledgement: "Usunięto %(count)s urządzeń.",
                progress: "Trwa usuwanie urządzeń…",
              },
              action: {
                proceed: "Usuń",
                cancel: "Anuluj",
                cancel: "Zamknij",
              }
            },

            create: {
              header: "Dodawanie urządzenia",
              form: {
                name: {
                  label: "Nazwa urządzenia",
                  hint: "Wybierz jakąkolwiek nazwę, która pozwoli Ci odróżnić to urządzenie od innych.",
                },
              },

              acknowledgement: {
                header: "Pomyślnie dodano urządzenie",
                instructions: {
                  header: "Teraz zainstaluj na swoim urządzeniu aplikację, która połączy się z systemem. Podczas instalacji aplikacja poprosi Cię o podanie poniższego kodu. Jest on ważny 15 minut. Jak to zrobisz, będziesz mieć możliwość przesyłania dźwięku z oraz do systemu za pomocą tego urządzenia.",
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
                }
              },

              action: {
                proceed: "Dodaj urządzenie",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            }
          }
        },
      },

    }
  }
}
