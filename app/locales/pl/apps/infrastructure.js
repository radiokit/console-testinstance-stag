export default {
  apps: {
    infrastructure: {
      navigation: {
        title: "Infrastruktura",
        subtitle: "Konfiguracja i monitoring sieci",
        broadcast_channels: {
          title: "Kanały"
        },

      },

      patchbay: {
        index: {
          header: "Krosownica",
        }
      },

      external_inputs: {
        index: {
          header: "Zewnętrzne źrodła dźwięku",
          actions: {
            create: "Dodaj źródło dźwięku",
            delete: "Usuń zaznaczone źródła dźwięku",
          },

          table: {
            loading: "Pobieranie listy zewnętrznych źródeł dźwięku",
            header: {
              name: "Nazwa",
              location: "Adres",
              level: "Poziom",
            },
          },

          modals: {
            delete: {
              title: "Usuwanie zewnętrznych źródeł dźwięku",
              message: {
                confirmation: "Czy na pewno chcesz usunąć zaznaczone źródła dźwięku (%(count)s szt.)?",
                acknowledgement: "Usunięto %(count)s źródeł dźwięku.",
                progress: "Trwa usuwanie źródeł dźwięku…",
              },
              action: {
                proceed: "Usuń",
                cancel: "Anuluj",
                cancel: "Zamknij",
              }
            },

            create: {
              header: "Dodawanie źródła dźwięku",
              form: {
                location: {
                  label: "Nazwa",
                  hint: "Wybierz jakąkolwiek nazwę, która pozwoli Ci odróżnić to źródło dźwięku od innych.",
                },
                location: {
                  label: "Adres strumienia",
                  hint: "To musi być poprawny adres http:// lub https://",
                },
              },

              acknowledgement: {
                info: "Pomyślnie dodano zewnętrzne źródło dźwięku.",
              },

              action: {
                proceed: "Dodaj źródło dźwięku",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            }
          }
        },
      },

      transmissions: {
        index: {
          header: "Transmisje",
          table: {
            loading: "Pobieranie listy transmisji",
            header: {
              device_name: "Urządzenie",
              audio_interface_name: "Interfejs Audio",
              level: "Poziom",
            },
          },
        },
      },
    }
  }
}
