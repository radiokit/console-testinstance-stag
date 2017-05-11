export default {
  apps: {
    broadcast: {
      stats: {
        charts: {
          labels: {
            connections: " (Connections)",
            listeners: " (Listeners)",
            xAxisLabel: "Time (UTC)",
            over_one_minute: "Over 1 minute",
            over_five_minutes: "Over 5 minutes",
            over_fifteen_minutes: "Over 15 minutes",
            over_thirty_minutes: "Over 30 minutes",
            over_one_hour: "Over 1 hour",
            over_three_hours: "Over 3 hours",
            over_twelve_hours: "Over 12 hours"
          },
        },

        show: {
          header: "Stats",
          tabs: {
            headers: {
              streamPlayLength: "Play Length",
              connections: "Connections & Listeners"
            },
          },

          targetTable: {
            loading: "",
            header: {
              name: "List of targets",
            },
          },

          channelTable: {
            loading: "",
            header: {
              channel_id: "List of channels"
            },
          },
        },
      },
    }
  }
}
