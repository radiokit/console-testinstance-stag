export default {
  apps: {
    library: {
      navigation: {
        title: "Library",
        subtitle: "Storage for all of your audio files",
        file_repositories: {
          title: "Library",
        },
      },


      file_repositories: {
        show: {
          actions: {
            upload: "Upload new files",
            tags:{
              allTags: "All",
              assignTags: "Assign tags",
              manageTags: "Manage tags",
            }
          },

          tabs: {
            headers: {
              incoming: "Incoming",
              ready: "Ready",
              archive: "Archive",
              trash: "Trash",
            },
            hints: {
              incoming: "Files that were uploaded but are not marked as ready for publication yet",
              ready: "Files that are ready for publication",
              archive: "Files that are not longer necessary or publicly available but we want to keep them for the future",
              trash: "Files that are supposed to be deleted, purged automatically after 30 days",
            },
          },
          tags: {
            all_tags:"All"
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
