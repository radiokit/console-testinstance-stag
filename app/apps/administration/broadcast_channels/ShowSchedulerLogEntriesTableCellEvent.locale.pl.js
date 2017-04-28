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
                        scheduler_worker_started: "Uruchomiono proces automatu",
                        scheduler_cycle_started: "Rozpoczęto ustawianie utworów",
                        scheduler_cycle_stopped: "Zakończono ustawianie utworów",
                        scheduler_cycle_failed: "Ustawianie utworów nie powiodło się",
                        scheduler_cycle_range_determined: "Ustalono zakres w którym należy ustawić utwory",
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
