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
            upload: "Upload files",
            tags: "Tags",
            metadata: "Metadata",
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
