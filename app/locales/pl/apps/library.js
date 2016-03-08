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
          },

          tabs: {
            headers: {
              incoming: "Nowe",
              ready: "Gotowe",
              archive: "Archiwum",
              trash: "Kosz",
            },
            hints: {
              incoming: "Pliki, które zostały załadowane ale nie zostały jeszcze oznaczone jako gotowe do publikacji",
              ready: "Pliki gotowe do publikacji",
              archive: "Pliki, które nie są już potrzebne albo nie są już opublikowane, ale powinny zostać zachowane",
              trash: "Pliki przeznaczone do skasowania, są automatycznie czyszczone po 30 dniach",
            },
          },
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
