export default {
  header: 'Ramówka',
  add_button: 'Dodaj utwór',
  add_dj_button: 'Dodaj Automat',
  update_button: 'Edytuj utwór',
  delete_button: 'Usuń utwór',
  add: {
    header: 'Dodawanie nowego utworu',
    form: {
      file: {
        label: 'Nazwa pliku',
        hint: 'Szukaj pliku',
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
      proceed: 'Dodaj do ramówki',
      close: 'Zamknij',
    },
    message: {
      progress: 'Dodawanie pliku...',
      acknowledgement: 'Plik został pomyślnie dodany.',
    },
    info: {
      type_and_desc: 'Typ i opis',
    },
  },
  update: {
    header: 'Edycja utworu',
    form: {
      file: {
        label: 'Nazwa pliku',
      },
      start_at: {
        label: 'Czas rozpoczęcia',
      },
      stop_at: {
        label: 'Czas zakończenia',
      },
      name: {
        label: 'Nazwa',
      },
    },
    info: {
      type_and_desc: 'Typ i opis',
    },
    message: {
      progress: 'Edytowanie pliku...',
      acknowledgement: 'Plik został pomyślnie edytowany.',
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
      proceed: 'Usuń',
      close: 'Zamknij',
    },
  },
};
