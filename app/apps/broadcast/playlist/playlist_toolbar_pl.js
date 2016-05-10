export default {
  apps: {
    broadcast: {
      playlist: {
        header: 'Ramówka',
        add_button: 'Dodaj utwór',
        update_button: 'Edytuj utwór',
        delete_button: 'Usuń utwór',
        add: {
          header: 'Dodawanie nowego utworu',
          form: {
            file: {
              label: 'Nazwa pliku',
            },
            name: {
              label: 'Nazwa utworu',
            },
            start_at: {
              label: 'Czas rozpoczęcia',
            },
            stop_at: {
              label: 'Czas zakończenia',
            },
          },
          action: {
            cancel: 'Anuluj',
            proceed: 'Kontynuuj',
            close: 'Zamknij',
          },
          message: {
            acknowledgement: 'Plik został pomyślnie dodany.',
          },
        },
        update: {
          header: 'Edycja utworu',
          form: {
            name: {
              label: 'Nazwa utworu',
            },
            start_at: {
              label: 'Czas rozpoczęcia',
            },
            stop_at: {
              label: 'Czas zakończenia',
            },
          },
          action: {
            cancel: 'Anuluj',
            proceed: 'Kontynuuj',
            close: 'Zamknij',
          },
        },
        delete: {
          header: 'Usuwanie utworu',
          message: {
            confirmation: 'Utwór zostanie za chwilę usunięty',
            progress: 'Trwa usuwanie...',
          },
          action: {
            cancel: 'Anuluj',
            proceed: 'Kontynuuj',
            close: 'Zamknij',
          },
        },
      },
    },
  },
};
