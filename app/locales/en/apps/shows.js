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
          loading: "Fetching list of files",
          none: "There are no files",
          header: "Files",
          table: {
            header: {
              name: "Name",
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
