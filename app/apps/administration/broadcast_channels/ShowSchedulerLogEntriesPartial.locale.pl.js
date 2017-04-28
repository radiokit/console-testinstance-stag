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
                      loading: "Ładowanie dziennika automatu...",

                      header: {
                        event: "Zdarzenie",
                        metadata: "Metadane",
                        inserted_at: "Data utworzenia",
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
