export default {
  apps: {
    broadcast: {
      metadata: {
        override: {
          form: {
            nowPlaying: {
              label: "Teraz na antenie",
              hint: "Wpisz tekst, który nadpisze aktualną informację o tym co jest grane. Pozostaw puste pole by system automatycznie odczytywał te informacje z playlisty."
            },
          },
          submit: "Zapisz",
        },
      },
    },
  },
};
