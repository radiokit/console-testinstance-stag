export default {
  apps: {
    administration: {
      stats: {
        charts: {
          statuses: {
            upToDate: "Statystyki są aktualne",
            loading: "Pobieranie danych...",
            error: "Nie można pobrać danych",
          },
          labels: {
            connections: " (Odsłuchania)",
            listeners: " (Słuchacze)",
            xAxisLabel: "Czas (UTC)",
            over_one_minute: "Ponad 1 minuta",
            over_five_minutes: "Ponad 5 minut",
            over_fifteen_minutes: "Ponad 15 minut",
            over_thirty_minutes: "Ponad 30 minut",
            over_one_hour: "Ponad 1 godzina",
            over_three_hours: "Ponad 3 godziny",
            over_twelve_hours: "Ponad 12 godzin"
          },
        },
        index: {
          show : {
            header: "Statystyki",
          },
          actions: {
            create: "Dodaj użytkownika",
            delete: "Usuń zaznaczonych użytkowników",
          },

          targetTable: {
            loading: "Ładowanie grup docelowych",
            header: {
              name: "Grupy docelowe"
            },
          },

          channelTable: {
            loading: "Ładowanie kanałów",
            header: {
              channel_id: "Kanały"
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
                    administration: "Infrastruktura",
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
