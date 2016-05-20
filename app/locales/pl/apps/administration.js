export default {
  apps: {
    administration: {
      navigation: {
        title: "Administracja",
        subtitle: "Panel administracyjny",
        users: {
          title: "Użytkownicy",
        },
        broadcast_channels: {
          title: "Kanały"
        },
        file_repositories: {
          title: "Repozytoria plików"
        },
      },

      file_repositories: {
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
              },
              empty_warning: "Kategoria służy jako zbiór etykiet. Dodaj przynajmniej jedną etykietę",

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

        show: {
          actions: {
            back: "Powrót do spisu repozytoriów plików",
            delete: "Usuń to repozytorium plików",
          },

          tabs: {
            headers: {
              metadata_schema: "Winiety",
              tags_schema: "Etykiety",
            },
            body: {
              metadata_schema: {
                table: {
                  index: {
                    actions: {
                      create: "Dodaj pole metadanych",
                      delete: "Usuń wybrane pola metadanych",
                      update: "Edytuj jedno pole metadanych",
                    },

                    table: {
                      header: {
                        name: "Field name",
                        key: "Key",
                        kind: "Value type",
                      }
                    },

                    modals: {
                      create: {
                        header: "Dodaj pole metadanych",
                        action: {
                          proceed: "Dodaj",
                          close: "Close",
                          cancel: "Cancel",
                        },
                        message: {
                          acknowledgement: "Dodano pole metadanych",
                          progress: "Dodawanie pól metedanych...",
                        },
                        form: {
                          name: {
                            label: "Nazwa pola",
                            hint: "Choose any name that will describe contents of this field, e.g. \"composer\".",
                          },
                          key: {
                            label: "Key",
                            hint: "Unique key describing role of this field for the system.",
                          },
                          kind: {
                            label: "Value type",
                            values: {
                              string: "Text (one line)",
                              db: "Decibels",
                              integer: "Number (integer)",
                              text: "Text (multiline)",
                              float: "Number (with decimal part)",
                              date: "Date",
                              time: "Time",
                              datetime: "Date & Time",
                              url: "URL",
                              duration: "Duration",
                            }
                          },
                        },
                      },
                      update: {
                        header: "Edytuj pole metadanych",
                        action: {
                          proceed: "Edytuj",
                          close: "Close",
                          cancel: "Cancel",
                        },
                        message: {
                          acknowledgement: "Edytowano pole metadanych",
                          progress: "Edytowanie pól metedanych...",
                        },
                        form: {
                          name: {
                            label: "Nazwa pola",
                            hint: "Choose any name that will describe contents of this field, e.g. \"composer\".",
                          },
                          key: {
                            label: "Key",
                            hint: "Unique key describing role of this field for the system.",
                          },
                          kind: {
                            label: "Value type",
                            values: {
                              string: "Text (one line)",
                              db: "Decibels",
                              integer: "Number (integer)",
                              text: "Text (multiline)",
                              float: "Number (with decimal part)",
                              date: "Date",
                              time: "Time",
                              datetime: "Date & Time",
                              url: "URL",
                              duration: "Duration",
                            }
                          },
                        },
                      },
                      delete: {
                        header: "Usuń pola metadanych",
                        action: {
                          proceed: "Usuń",
                          close: "Zamknij",
                          cancel: "Anuluj",
                        },
                        message: {
                          progress: "Usuwanie pól metadanych...",
                          confirmation: "Czy napewno chcesz usunąć te pola metadanych?",
                          acknowledgement: "Usunięto pola metadanych.",
                        },
                      },
                    },
                  },
                },
              },


            },
          },
        },

        index: {
          header: "Repozytoria plików",
          actions: {
            create: "Dodaj repozytorium plików",
            delete: "Usuń zaznaczone repozytoria plików",
            update: "Edytuj jedno repozytorium",
          },

          table: {
            loading: "Pobieranie listy repozytoriów plików",
            header: {
              name: "Nazwa",
              files_count: "Ilość plików",
              files_size_total: "Łączny rozmiar plików",
              user_account: "Konto użytkownika",
            },
          },

          modals: {
            delete: {
              header: "Usuwanie repozytoriów plików",
              message: {
                confirmation: "Czy na pewno chcesz usunąć zaznaczone repozytoria plików (%(count)s szt.)?",
                acknowledgement: "Usunięto %(count)s repozytoriów plików.",
                progress: "Trwa usuwanie repozytoriów plików…",
              },
              action: {
                proceed: "Usuń",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            },

            create: {
              header: "Dodawanie repozytorium plików",
              form: {
                name: {
                  label: "Nazwa repozytorium",
                  hint: "Wybierz jakąkolwiek nazwę, która pozwoli Ci odróżnić to repozytorium plików od innych.",
                },
                user_account: {
                  label: "Konto użytkownika",
                }
              },
              message: {
                acknowledgement: "Pomyślnie dodano repozytorium plików",
              },

              action: {
                proceed: "Dodaj repozytorium plików",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            },
            update: {
              header: "Edytowanie repozytorium plików",
              form: {
                name: {
                  label: "Nazwa repozytorium",
                  hint: "Wybierz jakąkolwiek nazwę, która pozwoli Ci odróżnić to repozytorium plików od innych.",
                },
                user_account: {
                  label: "Konto użytkownika",
                }
              },
              message: {
                acknowledgement: "Pomyślnie edytowano repozytorium plików",
              },

              action: {
                proceed: "Edytuj repozytorium plików",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            }
          }
        },
      },

    }
  }
}
