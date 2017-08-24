export default {
  apps: {
    administration: {
      users: {
        index: {
          header: "Użytkownikcy",
          actions: {
            create: "Dodaj użytkownika",
            delete: "Usuń zaznaczonych użytkowników",
          },

          table: {
            loading: "Ładowanie listy użytkowników",
            header: {
              name: "Imię i nazwisko",
              email: "e-mail",
            },
          },

          modals: {
            delete: {
              header: "Usuń użytkownika",
              message: {
                confirmation: "Czy na pewno chcesz usunąć zaznaczonych użytkowników (%(count)s szt.)?",
                acknowledgement: "Usunięto %(count)s użytkowników.",
                progress: "Trwa usuwanie użytkowników…",
              },
              action: {
                proceed: "Usuń",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            },

            create: {
              header: "Dodaj użytkownika",
              form: {
                name: {
                  label: "Imię i nazwisko",
                },
                email: {
                  label: "e-mail",
                  hint: "Podaj e-mail użytkownika.",
                },
                organization_account_associations: {
                  label: "Konta",
                  hint: "Wybierz konta do których należy ten użytkownik. Przytrzymaj Ctrl podczas klikania by zaznaczyć/odznaczyć wiele kont.",
                },
                apps_available: {
                  label: "Dostępne aplikacje",
                  values: {
                    electron: "Electron",
                    library: "Biblioteka",
                    library_limited: "Biblioteka (tylko upload)",
                    administration: "Administracja",
                    broadcast: "Emisja",
                    freezer: "Freezer",
                    administration: "Infrastruktura",
                    almanac: "Almanac",
                    stream_metadata: 'Metadane strumienia',
                    dj: 'DJ',
                  },
                  hint: "Wybierz aplikacje dostępne dla tego użytkownika. Przytrzymaj Ctrl podczas klikania by zaznaczyć/odznaczyć wiele aplikacji.",
                },
                locale: {
                  label: "Język interfejsu użytkownika",
                  values: {
                    en: "Angielski",
                    pl: "Polski",
                  }
                },
              },

              message: {
                acknowledgement: "Pomyślnie dodano użytkownika. Na jego/jej skrzynkę e-mail została wysłana wiadomość z linkiem potwierdzającym.",
              },

              action: {
                proceed: "Dodaj konto",
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
