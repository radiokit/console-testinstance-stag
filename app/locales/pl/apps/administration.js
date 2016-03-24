export default {
  apps: {
    administration: {
      navigation: {
        title: "Administracja",
        subtitle: "Panel administracyjny",
        user_accounts: {
          title: "Konta klientów",
        },
        editors: {
          title: "Konta redaktorów",
        },
        broadcast_channels: {
          title: "Kanały"
        },
        file_repositories: {
          title: "Repozytoria plików"
        },
      },

      user_accounts: {
        show: {
          actions: {
            back: "Powrót do spisu kont klientów",
            delete: "Usuń to konto klienta",
          },
        },

        index: {
          header: "Konta klientów",
          actions: {
            create: "Dodaj konto klienta",
            delete: "Usuń zaznaczone konta klientów",
          },

          table: {
            loading: "Ładowanie listy kont klientów",
            header: {
              name: "Nazwa (zwyczajowa)",
              name_formal: "Nazwa (formalna)",
            },
          },

          modals: {
            delete: {
              header: "Usuń konto klienta",
              message: {
                confirmation: "Czy na pewno chcesz usunąć zaznaczone konta klientów (%(count)s szt.)?",
                acknowledgement: "Usunięto %(count)s kont klientów.",
                progress: "Trwa usuwanie kont klientów…",
              },
              action: {
                proceed: "Usuń",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            },

            create: {
              header: "Dodaj konto klienta",
              form: {
                name: {
                  label: "Nazwa (zwyczajowa)",
                  hint: "Podaj nazwę pod którą ten klient jest publicznie znany",
                },
                name_formal: {
                  label: "Nazwa (formalna)",
                  hint: "Podaj formalną nazwę organizacji lub pełne imię lub nazwisko",
                },
              },

              acknowledgement: {
                info: "Pomyślnie dodano konto klienta",
              },

              action: {
                proceed: "Dodaj konto klienta",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            }
          }
        },
      },

      broadcast_channels: {
        show: {
          actions: {
            back: "Powrót do spisu kanałów",
            delete: "Usuń ten kanał",
          },
        },

        index: {
          header: "Kanały",
          actions: {
            create: "Dodaj kanał",
            delete: "Usuń zaznaczone kanały",
          },

          table: {
            loading: "Pobieranie listy kanałów",
            header: {
              name: "Nazwa",
            },
          },

          modals: {
            delete: {
              header: "Usuwanie kanału",
              message: {
                confirmation: "Czy na pewno chcesz usunąć zaznaczone kanały (%(count)s szt.)?",
                acknowledgement: "Usunięto %(count)s kanałów.",
                progress: "Trwa usuwanie kanałów…",
              },
              action: {
                proceed: "Usuń",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            },

            create: {
              header: "Dodawanie kanału",
              form: {
                name: {
                  label: "Nazwa kanału",
                  hint: "Wybierz jakąkolwiek nazwę, która pozwoli Ci odróżnić ten kanał od innych.",
                },
              },

              acknowledgement: {
                info: "Pomyślnie dodano kanał",
              },

              action: {
                proceed: "Dodaj kanał",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            }
          }
        },
      },

      file_repositories: {

        tags_schema:{
          actions:{
            add_category: "Dodaj kategorię",
          },
          modals:{

            delete: {
              header: "Usuwanie elementu",
              message: {
                confirmation: "Czy na pewno chcesz usunąć wybrany element ?",
                acknowledgement: "Usunięto element.",
                progress: "Trwa usuwanie elementu…",
              },
              action: {
                proceed: "Usuń",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            },

            create_category: {
              header: "Tworzenie kategorii",
              form:{
                name:{
                  label:"Nazwa kategorii",
                  hint:"Wpisz nazwę nowej kategorii"
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
          },
        },

        index: {
          header: "Repozytoria plików",
          actions: {
            create: "Dodaj repozytorium plików",
            delete: "Usuń zaznaczone repozytoria plików",
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

              acknowledgement: {
                info: "Pomyślnie dodano repozytorium plików",
              },

              action: {
                proceed: "Dodaj repozytorium plików",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            }
          }
        },
      },

      editors: {
        show: {
          actions: {
            back: "Powrót do spisu kont redaktorów",
            delete: "Usuń to konto redaktora",
          },
        },

        index: {
          header: "Konta redaktorów",
          actions: {
            create: "Dodaj konto redaktora",
            delete: "Usuń zaznaczone konta redaktorów",
          },

          table: {
            loading: "Ładowanie listy kont redaktorów",
            header: {
              email: "e-mail",
              first_name: "Imię",
              last_name: "Nazwisko",
              phone: "Telefon",
            },
          },

          modals: {
            delete: {
              header: "Usuń konto redaktora",
              message: {
                confirmation: "Czy na pewno chcesz usunąć zaznaczone konta redaktorów (%(count)s szt.)?",
                acknowledgement: "Usunięto %(count)s kont redaktorów.",
                progress: "Trwa usuwanie kont redaktorów…",
              },
              action: {
                proceed: "Usuń",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            },

            create: {
              header: "Dodaj konto redaktora",
              form: {
                email: {
                  label: "e-mail",
                  hint: "Podaj e-mail redaktora. Będzie służył jako nazwa użytkownika.",
                },
                first_name: {
                  label: "Imię",
                },
                last_name: {
                  label: "Nazwisko",
                },
                phone: {
                  label: "Telefon",
                },
                locale: {
                  label: "Język interfejsu użytkownika",
                  values: {
                    en: "Angielski",
                    pl: "Polski",
                  }
                },
              },

              acknowledgement: {
                info: "Pomyślnie dodano konto redaktora",
              },

              action: {
                proceed: "Dodaj konto",
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
