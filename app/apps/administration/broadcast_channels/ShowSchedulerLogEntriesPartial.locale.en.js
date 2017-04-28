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
                      loading: "Loading scheduler log entries...",

                      header: {
                        event: "Event",
                        metadata: "Metadata",
                        inserted_at: "Inserted at",
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
