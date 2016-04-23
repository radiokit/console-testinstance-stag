export default {
  apps: {
    administration: {
      file_repositories: {
        show: {
          tabs: {
            body: {
              tags_schema: {
                actions: {
                  add_category: "Dodaj kategorię",
                },
                modals: {

                  edit_category: {
                    header: "Edycja kategorii",
                    form: {
                      name: {
                        label: "Nazwa kategorii",
                        hint: "Zmień nazwę kategorii"
                      },
                    },
                    message: {
                      confirmation: "Czy na pewno chcesz edytować wybraną kategorię ?",
                      acknowledgement: "Edytowano kategorię.",
                      progress: "Trwa edytowanie kategorii…",
                    },
                    action: {
                      proceed: "Edytuj",
                      cancel: "Anuluj",
                      close: "Zamknij",
                    }
                  },
                  edit_tag: {
                    header: "Edycja etykiety",
                    form: {
                      name: {
                        label: "Nazwa etykiety",
                        hint: "Zmień nazwę etykiety"
                      },
                    },
                    message: {
                      confirmation: "Czy na pewno chcesz edytować wybraną etykietę ?",
                      acknowledgement: "Edytowano etykietę.",
                      progress: "Trwa edytowanie etykiety…",
                    },
                    action: {
                      proceed: "Edytuj",
                      cancel: "Anuluj",
                      close: "Zamknij",
                    }
                  },

                  delete_category: {
                    header: "Usuwanie kategorii",
                    message: {
                      confirmation: "Czy na pewno chcesz usunąć wybraną kategorię ?",
                      acknowledgement: "Usunięto kategorię.",
                      progress: "Trwa usuwanie kategorii…",
                    },
                    action: {
                      proceed: "Usuń",
                      cancel: "Anuluj",
                      close: "Zamknij",
                    }
                  },

                  delete_tag: {
                    header: "Usuwanie etykiety",
                    message: {
                      confirmation: "Czy na pewno chcesz usunąć wybraną etykietę ?",
                      acknowledgement: "Usunięto etykietę.",
                      progress: "Trwa usuwanie etykiety…",
                    },
                    action: {
                      proceed: "Usuń",
                      cancel: "Anuluj",
                      close: "Zamknij",
                    }
                  },

                  create_category: {
                    header: "Tworzenie kategorii",
                    form: {
                      name: {
                        label: "Nazwa kategorii",
                        hint: "Wpisz nazwę nowej kategorii"
                      },
                    },
                    message: {
                      acknowledgement: "Utworzono kategorię.",
                      progress: "Trwa tworzenie kategorii…",
                    },
                    action: {
                      proceed: "Dodaj",
                      cancel: "Anuluj",
                      close: "Zamknij",
                    }
                  },

                  create_tag: {
                    header: "Tworzenie etykiety",
                    form: {
                      name: {
                        label: "Nazwa etykiety",
                        hint: "Wpisz nazwę etykiety"
                      },
                    },
                    message: {
                      acknowledgement: "Utworzono etykietę.",
                      progress: "Trwa tworzenie etykiety…",
                    },
                    action: {
                      proceed: "Dodaj",
                      cancel: "Anuluj",
                      close: "Zamknij",
                    }
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
