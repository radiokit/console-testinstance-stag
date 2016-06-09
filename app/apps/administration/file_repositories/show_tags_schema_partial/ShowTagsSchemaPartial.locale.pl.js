export default {
  apps: {
    administration: {
      file_repositories: {
        show: {
          tabs: {
            body: {
              tags_schema: {
                actions: {
                  add_category: 'Dodaj grupę kategorii',
                },
                empty_metadata_schemas: 'Dodaj pola metadanych',
                modals: {
                  edit_category: {
                    header: 'Edycja grupy kategorii',
                    form: {
                      name: {
                        label: 'Nazwa grupy kategorii',
                        hint: 'Zmień nazwę grupy kategorii',
                      },
                      key: {
                        label: "Klucz",
                        hint: "Klucz używany do integracji z innymi systemami"
                      },
                    },
                    message: {
                      confirmation: 'Czy na pewno chcesz edytować wybraną grupę kategorii?',
                      acknowledgement: 'Edytowano grupę kategorii.',
                      progress: 'Trwa edytowanie grupy kategorii…',
                    },
                    action: {
                      proceed: 'Edytuj',
                      cancel: 'Anuluj',
                      close: 'Zamknij',
                    },
                  },
                  edit_tag: {
                    header: 'Edycja kategorii',
                    form: {
                      name: {
                        label: 'Nazwa kategorii',
                        hint: 'Zmień nazwę kategorii',
                      },
                    },
                    message: {
                      confirmation: 'Czy na pewno chcesz edytować wybraną kategorię?',
                      acknowledgement: 'Edytowano kategorię.',
                      progress: 'Trwa edytowanie kategorii…',
                    },
                    action: {
                      proceed: 'Edytuj',
                      cancel: 'Anuluj',
                      close: 'Zamknij',
                    },
                  },

                  delete_category: {
                    header: 'Usuwanie grupy kategorii',
                    message: {
                      confirmation: 'Czy na pewno chcesz usunąć wybraną grupę kategorii?',
                      acknowledgement: 'Usunięto grupę kategorii.',
                      progress: 'Trwa usuwanie  grupy kategorii…',
                    },
                    action: {
                      proceed: 'Usuń',
                      cancel: 'Anuluj',
                      close: 'Zamknij',
                    },
                  },

                  delete_tag: {
                    header: 'Usuwanie kategorii',
                    message: {
                      confirmation: 'Czy na pewno chcesz usunąć wybraną kategorię?',
                      acknowledgement: 'Usunięto kategorię.',
                      progress: 'Trwa usuwanie kategorii…',
                    },
                    action: {
                      proceed: 'Usuń',
                      cancel: 'Anuluj',
                      close: 'Zamknij',
                    },
                  },

                  create_category: {
                    header: 'Tworzenie grupy kategorii',
                    form: {
                      name: {
                        label: 'Nazwa grupy kategorii',
                        hint: 'Wpisz nazwę nowej grupy kategorii',
                      },
                      key: {
                        label: "Klucz",
                        hint: "Klucz używany do integracji z innymi systemami"
                      },
                    },
                    message: {
                      acknowledgement: 'Utworzono grupę kategorii.',
                      progress: 'Trwa tworzenie grupy kategorii…',
                    },
                    action: {
                      proceed: 'Dodaj',
                      cancel: 'Anuluj',
                      close: 'Zamknij',
                    },
                    empty_warning: 'Grupa kategorii jest pusta. Dodaj przynajmniej jedną kategorię',
                  },

                  create_tag: {
                    header: 'Tworzenie kategorii',
                    form: {
                      name: {
                        label: 'Nazwa kategorii',
                        hint: 'Wpisz nazwę kategorii',
                      },
                    },
                    message: {
                      acknowledgement: 'Utworzono kategorię.',
                      progress: 'Trwa tworzenie kategorii…',
                    },
                    action: {
                      proceed: 'Dodaj',
                      cancel: 'Anuluj',
                      close: 'Zamknij',
                    },
                  },
                  delete_metadata_schema: {
                    header: 'Usuwanie pola metadanych dla grupy kategorii',
                    message: {
                      confirmation: 'Czy na pewno chcesz usunąć pole metadanych dla tej kategorii?',
                      acknowledgement: 'Usunięto pole metadanych.',
                      progress: 'Usuwanie pola metadanych dla wybranej kategorii',
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
      },
    },
  },
};
