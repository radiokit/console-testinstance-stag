export default {
  apps: {
    administration: {
      broadcast_channels: {
        show: {
          tabs: {
            body: {
              scheduler_log_entries: {
                table: {
                  index: {
                    table: {
                      event: {
                        worker_started: "Scheduler process started",
                        cycle_started: "Scheduler cycle started",
                        cycle_stopped: "Scheduler cycle stopped",
                        cycle_failed: "Scheduler cycle failed",
                        cycle_range_determined: "Determined time range for scheduler cycle",
                        track_save_failed: "Track save failed",
                        track_save_succeeded: "Track save succeeded",
                        playlist_generated: "Playlist generated",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }
  }
}
