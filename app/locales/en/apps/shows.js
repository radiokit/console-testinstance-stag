export default {
  apps: {
    shows: {
      navigation: {
        title: "Shows"
      },
      index: {
      	add_track: {
      		header: "Add Track"
      	}
      },
      show: {
        edit_track_markers: "Edit Track Markers"
      },

      files: {
        index: {
          loading: "Fetching shows library",
          header: "Shows library",
          actions: {
            create: "Upload new shows"
          },
          table: {
            header: {
              name: "Name",
              duration_total: "Duration",
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
