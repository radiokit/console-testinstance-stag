export default {
  apps: {
    library: {
      navigation: {
        title: "Biblioteka",
        subtitle: "Miejsce na wszystkie Twoje pliki audio",

        file_repositories: {
          title: "Biblioteka",
        },
      },


      file_repositories: {
        show: {
          actions: {
            upload: "Załaduj pliki",
            tags:{
              allTags: "Wszystkie",
              assignTags: "Przypisz etykiety",
              manageTags: "Zarządzaj etykietami",
            },
            delete: "Trwale usuń",
            move_to:{
              incoming: "Przenieś do Nowych",
              current: "Przenieś do Gotowych",
              archive: "Przenieś do Archiwum",
              trash: "Przenieś do kosza",
            }
          },

          tabs: {
            headers: {
              incoming: "Nowe",
              current: "Gotowe",
              archive: "Archiwum",
              trash: "Kosz",
            },
            hints: {
              incoming: "Pliki, które zostały załadowane ale nie zostały jeszcze oznaczone jako gotowe do publikacji",
              current: "Pliki gotowe do publikacji",
              archive: "Pliki, które nie są już potrzebne albo nie są już opublikowane, ale powinny zostać zachowane",
              trash: "Pliki przeznaczone do skasowania, są automatycznie czyszczone po 30 dniach",
            },
          },
          tags: {
            all_tags:"Wszystkie"
          }
        },

        index: {
          header: "Library sections",

          table: {
            loading: "Fetching list of library sections",
          },
        },
      },
    }
  }
}
