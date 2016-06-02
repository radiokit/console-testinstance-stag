export default {
  apps: {
    administration: {
      file_repositories: {
        show: {
          tabs: {
            body: {
              processing_schema: {
                table: {
                  index: {
                    actions: {
                      create: "Dodaj procesor",
                    },

                    table: {
                      header: {
                        name: "Nazwa",
                        kind: "Rodzaj",
                        connector_settings: "Ustawienia",
                      },
                      loading: "Ładowanie listy procesórów...",
                    },

                    modals: {
                      create: {
                        header: "Dodaj procesor",
                        action: {
                          proceed: "Dodaj",
                          close: "Close",
                          cancel: "Cancel",
                        },
                        message: {
                          acknowledgement: "Dodano procesor",
                          progress: "Dodawanie procesorów...",
                        },
                        form: {
                          name: {
                            label: "Nazwa",
                            hint: "Nazwa procesora zrozumiała dla użytkownika.",
                          },
                          kind: {
                            label: "Rodzaj",
                            values: {
                              transcode: {
                                audio: {
                                  webbrowser: "Kodowanie dźwięków do formatu przeglądarek WWW",
                                },
                              },
                              analysis: {
                                audio: {
                                  duration: "Obliczanie długości dźwięku",
                                  replaygain: "Obliczanie ReplayGain",
                                  tags: "Ekstrakcja metadanych",
                                },
                              },
                              visualisation: {
                                audio: {
                                  waveform: "Generowanie obwiedni",
                                }
                              }
                            }
                          },
                        },
                      },

                      delete: {
                        header: "Usuń procesory",
                        action: {
                          proceed: "Usuń",
                          close: "Zamknij",
                          cancel: "Anuluj",
                        },
                        message: {
                          progress: "Usuwanie procesorów...",
                          confirmation: "Czy napewno chcesz usunąć te procesory?",
                          acknowledgement: "Usunięto procesory.",
                        },
                      },
                    },
                  },
                },
              }
            }
          }
        },
      },
    }
  }
}
