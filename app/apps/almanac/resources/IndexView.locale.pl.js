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
          },
        },
      },
    },
  },
};
