export default {
  apps: {
    almanac: {
      resources: {
        index: {
          header: 'Zasoby',
          actions: {
            create: 'Dodaj zasób',
            delete: 'Usuń zaznaczone zasoby',
          },

          table: {
            loading: 'Pobieranie listy zasobów',
            header: {
              name: 'Nazwa',
              notification_emails: 'Powiadamiani użytkownicy',
              organization_account: 'Konto',
            },
          },

          modals: {
            delete: {
              header: 'Usuwanie zasobu',
              message: {
                confirmation: 'Czy na pewno chcesz usunąć zaznaczone zasoby (%(count)s szt.)?',
                acknowledgement: 'Usunięto %(count)s zasobów.',
                progress: 'Trwa usuwanie zasobów…',
              },
              action: {
                proceed: 'Usuń',
                cancel: 'Anuluj',
                close: 'Zamknij',
              },
            },

            create: {
              header: 'Dodawanie zasobu',
              form: {
                name: {
                  label: 'Nazwa',
                  hint: 'Wybierz jakąkolwiek nazwę, która pozwoli Ci odróżnić ten zasób od innych.',
                },
                notification_emails: {
                  label: 'Powiadamiani użytkownicy',
                  hint: 'Oddzielona przecinkami lista adresów e-mail użytkowników, którzy mają być powiadamiani o rezerwacjach tego zasobu',
                },
                organization_account: {
                  label: 'Konto',
                },
              },

              message: {
                acknowledgement: 'Pomyślnie dodano zasób',
              },

              action: {
                proceed: 'Dodaj zasób',
                cancel: 'Anuluj',
                close: 'Zamknij',
              },
            },

            update: {
              header: 'Edycja zasobu',
              form: {
                name: {
                  label: 'Nazwa',
                  hint: 'Wybierz jakąkolwiek nazwę, która pozwoli Ci odróżnić ten zasób od innych.',
                },
                notification_emails: {
                  label: 'Powiadamiani użytkownicy',
                  hint: 'Oddzielona przecinkami lista adresów e-mail użytkowników, którzy mają być powiadamiani o rezerwacjach tego zasobu',
                },
                organization_account: {
                  label: 'Konto',
                },
              },

              message: {
                acknowledgement: 'Pomyślnie zapisano zasób',
              },

              action: {
                proceed: 'Zapisz zasób',
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
