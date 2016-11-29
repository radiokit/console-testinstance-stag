export default {
  apps: {
    almanac: {
      resources: {
        show: {
          tabs: {
            body: {
              events: {
                table: {
                  index: {
                    actions: {
                      create: 'Dodaj rezerwację',
                      delete: 'Usuń zaznaczone rezerwacje',
                    },

                    modals: {
                      delete: {
                        header: 'Usuwanie rezerwacjia',
                        action: {
                          proceed: 'Usuń',
                          cancel: 'Anuluj',
                          close: 'Zamknij',
                        },
                        message: {
                          confirmation: 'Czy na pewno chcesz usunąć zaznaczone rezerwacje (%(count)s szt.)?',
                          acknowledgement: 'Usunięto %(count)s rezerwacji.',
                          progress: 'Trwa usuwanie rezerwacji…',
                        },
                      },
                      create: {
                        header: 'Dodawanie rezerwacjia',
                        action: {
                          proceed: 'Dodaj rezerwację',
                          cancel: 'Anuluj',
                          close: 'Zamknij',
                        },
                        message: {
                          acknowledgement: 'Pomyślnie utworzono rezerwację.',
                        },
                        form: {
                          description: {
                            label: 'Opis',
                          },
                          start_at: {
                            label: 'Start',
                          },
                          stop_at: {
                            label: 'Stop',
                          },
                        },
                      },
                    },

                    table: {
                      loading: 'Ładowanie rezerwacji...',

                      header: {
                        description: 'Opis',
                        start_at: 'Start',
                        stop_at: 'Stop',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }
  }
}
