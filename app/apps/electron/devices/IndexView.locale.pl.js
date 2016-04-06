export default {
  apps: {
    electron: {
      devices: {
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
            }
          }
        }
      }
    }
  }
}
