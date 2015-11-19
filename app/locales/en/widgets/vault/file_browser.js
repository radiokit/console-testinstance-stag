export default {
  widgets: {
    vault: {
      file_browser: {
        modals: {
          delete: {
            header: "Delete",
            message: {
              confirmation: "Are you sure that you want to delete %(count)s selected file(s)?",
              acknowledgement: "Deleted %(count)s file(s).",
              progress: "Deleting in progress…",
              cancelled: "Some files for which operations were already undertaken are gone, but deleting was cancelled for the remaining part.",
            },
            action: {
              proceed: "Delete",
              cancel: "Cancel",
              close: "Close",
            }
          },

          tag: {
            header: "Tags",
            message: {
              confirmation: "Select tags to apply to %(count)s selected file(s):",
              acknowledgement: "Applied tags to %(count)s file(s).",
              progress: "Applying tags in progress…",
              cancelled: "Some files for which operations were already undertaken will have new tags, but tagging was cancelled for the remaining part.",
            },
            action: {
              proceed: "Apply tags",
              cancel: "Cancel",
              close: "Close",
            }
          },
        }
      }
    }
  }
};
