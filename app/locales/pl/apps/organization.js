export default {
  apps: {
    organization: {
      navigation: {
        title: "Organizacja",
        user_accounts: {
          title: "Konta klientów",
        },
        editors: {
          title: "Konta redaktorów",
        },
      },

      user_accounts: {
        index: {
          header: "Konta klientów",
          actions: {
            create: "Dodaj konto klienta",
            delete: "Usuń zaznaczone konta klientów",
          },

          table: {
            loading: "Ładowanie listy kont klientów",
            header: {
              name_custom: "Nazwa (zwyczajowa)",
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
                name_custom: {
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

      editors: {
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
