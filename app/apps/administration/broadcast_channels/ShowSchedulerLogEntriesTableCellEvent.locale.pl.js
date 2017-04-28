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
                        worker_started: "Uruchomiono proces automatu",
                        cycle_started: "Rozpoczęto ustawianie utworów",
                        cycle_stopped: "Zakończono ustawianie utworów",
                        cycle_failed: "Ustawianie utworów nie powiodło się",
                        cycle_range_determined: "Ustalono zakres w którym należy ustawić utwory",
                        track_save_failed: "Zapis utworu nie powiódł się",
                        track_save_succeeded: "Zapisano utwór",
                        playlist_generated: "Wygenerowano playlistę",
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
