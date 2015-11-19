export default {
  widgets: {
    vault: {
      file_browser: {
        modals: {
          tag: {
            title: "Etykiety",
            action: {
              proceed: "Ustaw etykiety",
              cancel: "Anuluj",
            }
          },
          delete: {
            title: "Kasowanie",
            message: {
              confirmation: "Czy na pewno chcesz usunąć zaznaczone pliki (%(count)s szt.)?",
              acknowledgement: "Usunięto %(count)s plik(ów).",
              progress: "Trwa kasowanie plików…",
              cancelled: "Część plików dla których operacje zostały już wykonane została skasowana, ale dalsze kasowanie zostało przerwane.",
            },
            action: {
              proceed: "Skasuj",
              cancel: "Anuluj",
              cancel: "Zamknij",
            }
          },
        }
      }
    }
  }
};
