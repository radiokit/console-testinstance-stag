export default {
  apps: {
    broadcast: {
      navigation: {
        title: "Emisja",
        playlist: {
          title: "Ramówka"
        },

        live: {
          title: "Nadawanie na żywo"
        },

        channels: {
          title: "Kanały"
        },
      },

      playlist: {
        header: "Ramówka",
      },


      channels: {
        index: {
          header: "Kanały",
          actions: {
            create: "Dodaj kanał",
            delete: "Usuń zaznaczone kanały",
          },

          table: {
            loading: "Pobieranie listy kanałów",
            header: {
              name: "Nazwa",
            },
          },

          modals: {
            delete: {
              header: "Usuwanie kanału",
              message: {
                confirmation: "Czy na pewno chcesz usunąć zaznaczone kanały (%(count)s szt.)?",
                acknowledgement: "Usunięto %(count)s kanałów.",
                progress: "Trwa usuwanie kanałów…",
              },
              action: {
                proceed: "Usuń",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            },

            create: {
              header: "Dodawanie kanału",
              form: {
                name: {
                  label: "Nazwa kanału",
                  hint: "Wybierz jakąkolwiek nazwę, która pozwoli Ci odróżnić ten kanał od innych",
                },
              },

              acknowledgement: {
                info: "Pomyślnie dodano kanał",
              },

              action: {
                proceed: "Dodaj kanał",
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
