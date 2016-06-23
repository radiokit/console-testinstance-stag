export default {
  apps: {
    administration: {
      file_repositories: {
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

            update: {
              header: "Edytuj",
              form: {
                name: {
                  label: "Nazwa repozytorium",
                  hint: "Wybierz jakąkolwiek nazwę, która pozwoli Ci odróżnić to repozytorium plików od innych."
                }
              },
              message: {
                acknowledgement: "Nazwa repozytorium zmieniona pomyślnie.",
              },
              action: {
                proceed: "Zmień nazwę repozytorium",
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
            }
          }
        },
      },
    }
  }
}
