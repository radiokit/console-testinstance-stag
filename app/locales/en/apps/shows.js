export default {
  apps: {
    shows: {
      navigation: {
        title: "Shows",
        files: {
          title: "Library"
        },
        schedule: {
          title: "Schedule"
        },
      },

      files: {
        index: {
          loading: "Fetching shows library",
          header: "Shows library",
          actions: {
            create: "Upload new shows",
            tags: "Tags",
          },
          table: {
            header: {
              name: "Name",
            }
          }
        },

        show: {
          loading: "Fetching show information",
          tabs: {
            headers: {
              overview: "Overview",
              metadata: "Metadata"
            }
          }
        }
      },


      widgets: {
        upload_widget: {
          upload_instructions: "Drop files here or click to browse them on your device",
          table: {
            header: {
              file_name: "File name",
              file_size: "Size",
              status: "Status"
            }
          },
          tags: {
            select: {
              placeholder: "Click here to choose tags that are going to be associated with uploaded files",
              help: "Optional"
            }
          }
        }
      }
    }
  }
}
