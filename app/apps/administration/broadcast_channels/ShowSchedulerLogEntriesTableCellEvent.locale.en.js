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
                        scheduler_worker_started: "Scheduler process started",
                        scheduler_cycle_started: "Scheduler cycle started",
                        scheduler_cycle_stopped: "Scheduler cycle stopped",
                        scheduler_cycle_failed: "Scheduler cycle failed",
                        scheduler_cycle_range_determined: "Determined time range for scheduler cycle",
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
