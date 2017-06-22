export default {
  apps: {
    administration: {
      broadcast_channels: {
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
              slug: "Adres",
              metadata_string: "Metadane",
              metadata_updated_at: "Czas aktualizacji metadanych",
              timezone: "Strefa czasowa",
              lineup_base_url: "Lineup base URL",
              lineup_channel_id: "Lineup channel ID",
              media_routing_group_id: "Routing Group ID",
              user_account: "Konto",
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
                  label: "Nazwa",
                  hint: "Wybierz jakąkolwiek nazwę, która pozwoli Ci odróżnić ten kanał od innych.",
                },
                slug: {
                  label: "Unikalny adres",
                  hint: "Ta wartość będzie używana do skonstruowania adresów strumieni.",
                },
                timezone: {
                  label: "Strefa czasowa kanału",
                  hint: "Strefa czasowa w formacie TZDATA",
                },
                lineup_base_url: {
                  label: "Lineup base URL",
                },
                lineup_channel_id: {
                  label: "Lineup channel ID",
                },
                media_routing_group_id: {
                  label: "Routing Group ID",
                  hint: "Skopiuj Id mixgrupy z sekcji media, lub skontaktuj się z administratorem",
                },
                metadata_string: {
                  label: "Metadane",
                },                
                description: {
                  label: "Opis",
                },
                genre: {
                  label: "Gatunek/format treści",
                },
                homepage_url: {
                  label: "Adres strony internetowej",
                },
                user_account: {
                  label: "Konto",
                },
              },

              message: {
                acknowledgement: "Pomyślnie dodano kanał",
              },

              action: {
                proceed: "Dodaj kanał",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            },

            update: {
              header: "Edycja kanału",
              form: {
                name: {
                  label: "Nazwa",
                  hint: "Wybierz jakąkolwiek nazwę, która pozwoli Ci odróżnić ten kanał od innych.",
                },
                slug: {
                  label: "Unikalny adres",
                  hint: "Ta wartość będzie używana do skonstruowania adresów strumieni.",
                },
                timezone: {
                  label: "Strefa czasowa kanału",
                  hint: "Strefa czasowa w formacie TZDATA",
                },
                lineup_base_url: {
                  label: "Lineup base URL",
                },
                lineup_channel_id: {
                  label: "Lineup channel ID",
                },
                media_routing_group_id: {
                  label: "Routing Group ID",
                  hint: "Skopiuj Id mixgrupy z sekcji media, lub skontaktuj się z administratorem",
                },
                metadata_string: {
                  label: "Metadane",
                },                
                description: {
                  label: "Opis",
                },
                genre: {
                  label: "Gatunek/format treści",
                },
                homepage_url: {
                  label: "Adres strony internetowej",
                },
                user_account: {
                  label: "Konto",
                },
              },

              message: {
                acknowledgement: "Pomyślnie dodano kanał",
              },

              action: {
                proceed: "Zapisz kanał",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            },
          }
        },
      },
    }
  }
}
