export default {
  widgets: {
    vault: {
      file_browser: {
        modals: {
          tag: {
            header: "Tags",
            action: {
              proceed: "Assign tags",
              cancel: "Cancel",
            }
          },
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
        }
      }
    }
  }
};
