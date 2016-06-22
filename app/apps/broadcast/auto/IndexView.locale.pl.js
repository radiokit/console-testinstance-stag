export default {
  apps: {
    broadcast: {
      auto: {
        index: {
          header: 'Automatyczne wypełnianie ramówki',
          table: {
            header: {
              name: 'Nazwa',
              broadcast_content_type_name: 'Rodzaj treści',
              time_start: 'Godzina od',
              time_stop: 'Godzina do',
              on_monday: 'Pon',
              on_tuesday: 'Wt',
              on_wednesday: 'Śr',
              on_thursday: 'Czw',
              on_friday: 'Pt',
              on_saturday: 'Sob',
              on_sunday: 'Nd',
            },
          },

          actions: {
            create: 'Dodaj automat',
            delete: 'Usuń zaznaczone automaty',
          },

          modals: {
            delete: {
              header: 'Usuń automat',
              message: {
                confirmation: 'Czy na pewno chcesz usunąć zaznaczone automaty (%(count)s szt.)?',
                acknowledgement: 'Usunięto automaty.',
                progress: 'Usuwanie automatów…',
              },
              action: {
                proceed: 'Usuń',
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
