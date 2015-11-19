export default {
  widgets: {
    admin: {
      table_browser: {
        selection: {
          over: {
            warning: {
              message: "All files (%(count)s) visible on this page are selected but there are more files matching current criteria.",
              action: "Select all of them.",
            },
            loading: {
              message: "Please wait while loading information about all files matching current criteria…",
            },
            confirmation: {
              message: "All files (%(count)s) from the library matching current criteria are selected.",
              action: "Select only files visible on the current page.",
            },
          }
        },
        pagination: {
          current: {
            label: "Records %(rangeStart)s-%(rangeStop)s of %(rangeTotal)s"
          },
          next: {
            title: "Next page",
          },
          previous: {
            title: "Previous page",
          }
        }
      }
    }
  }
};
