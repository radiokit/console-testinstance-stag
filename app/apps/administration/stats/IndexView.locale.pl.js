export default {
  apps: {
    administration: {
      stats: {
        charts: {
          statuses: {
            upToDate: "Statystyki są aktualne",
            loading: "Pobieranie danych...",
            error: "Nie można pobrać danych",
          }
        },
        index: {
          show : {
            header: "Statystyki",
          },
          actions: {
            create: "Dodaj użytkownika",
            delete: "Usuń zaznaczonych użytkowników",
          },

          table: {
            loading: "Ładowanie listy użytkowników",
            header: {
              email: "e-mail",
              name: "Grupy docelowe",
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
                email: {
                  label: "e-mail",
                  hint: "Podaj e-mail użytkownika.",
                },
                account_ids: {
                  label: "Konta",
                  hint: "Wybierz konta do których należy ten użytkownik. Przytrzymaj Ctrl podczas klikania by zaznaczyć/odznaczyć wiele kont.",
                },
                apps_available: {
                  label: "Dostępne aplikacje",
                  values: {
                    electron: "Electron",
                    library: "Biblioteka",
                    administration: "Administracja",
                    broadcast: "Emisja",
                    freezer: "Freezer",
                    infrastructure: "Infrastruktura",
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
