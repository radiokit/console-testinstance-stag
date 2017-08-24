export default {
  apps: {
    broadcast: {
      navigation: {
        title: 'Emisja',
        subtitle: 'Wszystko związane ze emisją w strumieniu',
        playlist: {
          title: 'Ramówka',
        },
        royalties: {
          title: 'Tantiemy',
        },
        stats: {
          title: 'Statystyki',
        },
      },
      playlist: {
        header: 'Ramówka',
        week: '%(count)s Tydzień',
        filter_hours: 'Filtrowanie godzin',
        toolbar: {
          add_button: 'Dodaj utwór',
          update_button: 'Edytuj utwór',
          delete_button: 'Usuń utwór',
        },
        tabs: {
          headers: {
            day: 'Dzienna',
          },
        },
        browser: {
          loading: 'Ładowanie',
          header: {
            name: 'Nazwa',
            cue_in_at: 'Czas rozpoczęcia',
            cue_out_at: 'Czas zakończenia',
          },
        },
        add_modal: {
          header: 'Dodaj utwór',
          loading: 'Ładowanie...',
          close_button: 'Zamknij',
          success_info: 'Plik został dodany do ramówki.',
          account: {
            header: 'Wybierz konto',
          },
          repository: {
            header: 'Wybierz repozytorium',
          },
        },
        form: {
          file_name: 'Nazwa pliku',
          start_at: 'Czas rozpoczęcia',
          end_at: 'Czas zakończenia',
          type_and_desc: 'Typ i opis',
          name: 'Nazwa utworu',
          cancel_button: 'Anuluj',
          save_button: 'Dodaj do ramówki',
        },
        delete: {
          header: 'Usuwanie utworów',
          message: {
            progress: 'Usuwanie...',
            confirmation: {
              one: 'Utwór zostanie za chwilę usunięty',
              otherRegular: '%(count)s utworów zostanie za chwilę usuniętych',
              otherIrregular: '%(count)s utwory zostaną za chwilę usunięte',
            },
            acknowledgement: 'Wybrane utwory zostały usunięte',
          },
          action: {
            cancel: 'Anuluj',
            proceed: 'Usuń',
            close: 'Zamknij',
          },
        },
      },
    },
  },
};
