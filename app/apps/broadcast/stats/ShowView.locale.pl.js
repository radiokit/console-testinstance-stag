export default {
  apps: {
    broadcast: {
      stats: {
        charts: {
          labels: {
            connections: " (Odsłuchania)",
            listeners: " (Słuchacze)",
            xAxisLabel: "Czas (UTC)",
            over_one_minute: "Ponad 1 minuta",
            over_five_minutes: "Ponad 5 minut",
            over_fifteen_minutes: "Ponad 15 minut",
            over_thirty_minutes: "Ponad 30 minut",
            over_one_hour: "Ponad 1 godzina",
            over_three_hours: "Ponad 3 godziny",
            over_twelve_hours: "Ponad 12 godzin"
          },
        },

        show: {
          header: "Statystyki",
          tabs: {
            headers: {
              streamPlayLength: "Dugość odtwarzania",
              connections: "Słuchacze i odsłuchania"
            },
          },

          targetTable: {
            loading: "",
            header: {
              name: "Grupy docelowe"
            },
          },

          channelTable: {
            loading: "",
            header: {
              channel_id: "Kanały"
            },
          },
        },
      },
    }
  }
}
