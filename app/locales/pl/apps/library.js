export default {
  apps: {
    library: {
      navigation: {
        file_repositories: {
          title: "Library",
        },
      },


      file_repositories: {
        show: {
          actions: {
            back: "Back to the library index",
          },

          tabs: {
            headers: {
              incoming: "Incoming",
              ready: "Ready",
              archive: "Archive",
              trash: "Trash",
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
