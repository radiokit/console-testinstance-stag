export default {
  apps: {
    almanac: {
      announcements: {
        index: {
          header: 'Ogłoszenia',
          actions: {
            create: 'Dodaj ogłoszenie',
            delete: 'Usuń zaznaczone ogłoszenia',
          },

          table: {
            loading: 'Pobieranie listy ogłoszeń',
            header: {
              name: 'Temat',
              body: 'Treść',
              organization_account: 'Konto',
              inserted_at: 'Data utworzenia',
            },
          },

          modals: {
            delete: {
              header: 'Usuwanie ogłoszenia',
              message: {
                confirmation: 'Czy na pewno chcesz usunąć zaznaczone ogłoszenia (%(count)s szt.)?',
                acknowledgement: 'Usunięto %(count)s ogłoszeń.',
                progress: 'Trwa usuwanie ogłoszeń…',
              },
              action: {
                proceed: 'Usuń',
                cancel: 'Anuluj',
                close: 'Zamknij',
              },
            },

            create: {
              header: 'Dodawanie ogłoszenia',
              form: {
                name: {
                  label: 'Temat',
                },
                body: {
                  label: 'Treść',
                },
                organization_account: {
                  label: 'Konto',
                },
              },

              message: {
                acknowledgement: 'Pomyślnie dodano ogłoszenie',
              },

              action: {
                proceed: 'Dodaj ogłoszenie',
                cancel: 'Anuluj',
                close: 'Zamknij',
              },
            },
          },
        },
      },
    },
  },
};
