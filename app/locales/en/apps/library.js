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
            },
            delete: "Delete permanently",
            move_to:{
              incoming: "Move to incoming",
              current: "Move to ready",
              archive: "Move to archive",
              trash: "Move to trash",
            },
          },

          tabs: {
            headers: {
              incoming: "Incoming",
              current: "Ready",
              archive: "Archive",
              trash: "Trash",
            },
            hints: {
              incoming: "Files that were uploaded but are not marked as ready for publication yet",
              current: "Files that are ready for publication",
              archive: "Files that are not longer necessary or publicly available but we want to keep them for the future",
              trash: "Files that are supposed to be deleted, purged automatically after 30 days",
            },
          },
          modals: {
            delete: {
              header: "Delete selected files",
              message: {
                confirmation: "Are you sure that you want to delete %(count)s selected file(s)?",
                acknowledgement: "Deleted %(count)s file(s).",
                progress: "Deleting in progress…",
              },
              action: {
                proceed: "Delete",
                cancel: "Cancel",
                close: "Close",
              },
            },
          }
        },
      },
    }
  }
}
