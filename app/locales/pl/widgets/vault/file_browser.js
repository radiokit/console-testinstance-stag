export default {
  widgets: {
    vault: {
      file_browser: {
        modals: {
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

          tag: {
            title: "Etykiety",
            message: {
              confirmation: "Wybierz etykiety, które zostaną przypisane do zaznaczonych plików (%(count)s szt.):",
              acknowledgement: "Przypisano etykiety do %(count)s plik(ów).",
              progress: "Trwa przypisywanie etykiet…",
            },
            action: {
              proceed: "Przypisz etykiety",
              cancel: "Anuluj",
              cancel: "Zamknij",
            }
          },

          metadata: {
            title: "Metadane",
            message: {
              confirmation: "Wybierz metadane, które zostaną przypisane do zaznaczonych plików (%(count)s szt.):",
              acknowledgement: "Przypisano metadane do %(count)s plik(ów).",
              progress: "Trwa przypisywanie metadanych…",
              cancelled: "Część plików dla których operacje zostały już wykonane będzie mieć przypisane nowe metadane, ale dalsze przypisywanie zostało przerwane.",
            },
            action: {
              proceed: "Przypisz metadane",
              cancel: "Anuluj",
              cancel: "Zamknij",
            }
          },
        }
      }
    }
  }
};
