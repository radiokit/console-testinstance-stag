export default {
  apps: {
    administration: {
      file_repositories: {
        show: {
          tabs: {
            body: {
              metadata_schema: {
                table: {
                  index: {
                    actions: {
                      create: 'Dodaj pole metadanych',
                    },

                    table: {
                      header: {
                        name: 'Nazwa pola',
                        key: 'Klucz',
                        kind: 'Typ danych',
                      },
                      loading: 'Ładowanie schematu metadanych...',
                    },

                    modals: {
                      create: {
                        header: 'Dodaj pole metadanych',
                        action: {
                          proceed: 'Dodaj',
                          close: 'Zamknij',
                          cancel: 'Anuluj',
                        },
                        message: {
                          acknowledgement: 'Dodano pole metadanych',
                          progress: 'Dodawanie pól metedanych...',
                        },
                        form: {
                          name: {
                            label: 'Nazwa pola',
                            hint: 'Wybierz nazwę, opisującącą zawartość kolumny, np. \'kompozytor\'.',
                          },
                          key: {
                            label: 'Klucz',
                            hint: 'Unikatowy klucz, określający rolę tego pola w systemie.',
                          },
                          kind: {
                            label: 'Typ danych',
                            values: {
                              string: 'Tekst (krótki)',
                              db: 'Decybele',
                              integer: 'Liczba (całkowita)',
                              text: 'Tekst (długi)',
                              float: 'Liczba (z ułamkami)',
                              date: 'Data',
                              time: 'Czas',
                              datetime: 'Data i godzina',
                              url: 'URL',
                              duration: 'Długość',
                              image: 'Obraz',
                              file: 'Plik',
                            },
                          },
                        },
                      },
                      delete: {
                        header: 'Usuń pola metadanych',
                        action: {
                          proceed: 'Usuń',
                          close: 'Zamknij',
                          cancel: 'Anuluj',
                        },
                        message: {
                          progress: 'Usuwanie pól metadanych...',
                          confirmation: 'Czy napewno chcesz usunąć te pola metadanych?',
                          acknowledgement: 'Usunięto pola metadanych.',
                        },
                      },
                      update: {
                        header: 'Edytuj pola metadanych',
                        action: {
                          proceed: 'Edytuj',
                          close: 'Zamknij',
                          cancel: 'Anuluj',
                        },
                        message: {
                          progress: 'Edytowanie pól metadanych...',
                          confirmation: 'Czy napewno chcesz edytować te pola metadanych?',
                          acknowledgement: 'Edytowano pola metadanych.',
                        },
                        form: {
                          name: {
                            label: 'Nazwa pola',
                            hint: 'Wybierz nazwę, opisującącą zawartość kolumny, np. \'kompozytor\'.',
                          },
                          key: {
                            label: 'Klucz',
                            hint: 'Unikatowy klucz, określający rolę tego pola w systemie.',
                          },
                          kind: {
                            label: 'Typ danych',
                            values: {
                              string: 'Tekst (krótki)',
                              db: 'Decybele',
                              integer: 'Liczba (całkowita)',
                              text: 'Tekst (długi)',
                              float: 'Liczba (z ułamkami)',
                              date: 'Data',
                              time: 'Czas',
                              datetime: 'Data i godzina',
                              url: 'URL',
                              duration: 'Długość',
                              image: 'Obraz',
                              file: 'Plik',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
