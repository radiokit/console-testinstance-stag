export default {
  apps: {
    organization: {
      navigation: {
        title: "Organizacja",
        user_accounts: {
          title: "Konta",
        },
      },

      user_accounts: {
        index: {
          header: "Konta",
          actions: {
            create: "Dodaj konto",
            delete: "Usuń zaznaczone konta",
          },

          table: {
            loading: "Ładowanie listy kont",
            header: {
              name_custom: "Nazwa (zwyczajowa)",
              name_formal: "Nazwa (formalna)",
            },
          },

          modals: {
            delete: {
              header: "Usuń konto",
              message: {
                confirmation: "Czy na pewno chcesz usunąć zaznaczone konta (%(count)s szt.)?",
                acknowledgement: "Usunięto %(count)s kont.",
                progress: "Trwa usuwanie kont…",
              },
              action: {
                proceed: "Usuń",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            },

            create: {
              header: "Dodaj konto",
              form: {
                name_custom: {
                  label: "Nazwa (zwyczajowa)",
                  hint: "Podaj nazwę pod którą to konto jest publicznie znane",
                },
                name_formal: {
                  label: "Name (formal)",
                  hint: "Podaj formalną nazwę organizacji lub pełne imię lub nazwisko",
                },
              },

              acknowledgement: {
                info: "Pomyślnie dodano serwer",
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
