export default {
  apps: {
    music_scheduler: {
      navigation: {
        title: "Music Scheduler"
      },

      calendar: {
        days: {
          monday: "Monday",
          tuesday: "Tuesday",
          wednesday: "Wednesday",
          thursday: "Thursday",
          friday: "Friday",
          saturday: "Saturday",
          sunday: "Sunday"
        }
      },

      automation: {
        header: "Music Scheduler"
      },

      scheduling_region: {
        tabs: {
          general: "General",
          time_settings: "Occurence",
          associations: "Content",
          delete_region: "Delete"
        },
        forms: {
          general: {
            name: "Name",
            color: "Color"
          },
          time_settings: {
            time_start: "Time start",
            time_stop: "Time stop",
            days: {
              label: "Day of week"
            },
            all_day_checkbox_label: "All day"
          }
        },
        header: "Edit Scheduling Item",
        tabs: {
          headers: {
            general: "General",
            timesettings: "Occurence",
            associations: "Content",
            delete: "Delete"
          }
        },
        tables: {
          associations: {
            frequency_header: "Frequency"
          }
        },
        select: {
          associations: {
            placeholder: "Click to add music"
          }
        },
        loading: "Loading..."
      }
    },
    widgets: {
      loading: {
        info: "Loading…"
      },
      delete_button_widget: {
        default_button_label: "Delete",
        default_confirmation_button_label: "Yes, delete",
        default_cancel_button_label: "No, cancel",
        default_confirmation_info_text: "Are you sure that you want to delete this?"
      }
    }
  }
}