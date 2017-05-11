export default {
  widgets: {
    admin: {
      table_browser: {
        selection: {
          over: {
            warning: {
              message: "Wszystkie pliki (%(count)s) widoczne na tej stronie są zaznaczone ale jest więcej plików pasujących do aktualnych kryteriów.",
              action: "Zaznacz wszystkie.",
            },
            loading: {
              message: "Proszę czekać na załadowanie informacji o wszystkich plikach pasujących do aktualnych kryteriów…",
            },
            confirmation: {
              message: "Wszystkie pliki (%(count)s) z biblioteki pasujące do aktualnych kryterów są zaznaczone.",
              action: "Zaznacz tylko pliki widoczne na tej stronie.",
            },
          },
        },
        refresh: {
          title: "Odśwież",
        },
        search: {
          title: "Szukaj  (min. 3 znaki)",
        },
        pagination: {
          current: {
            label: "Rekordy %(rangeStart)s-%(rangeStop)s z %(rangeTotal)s"
          },
          next: {
            title: "Następna strona",
          },
          previous: {
            title: "Poprzednia strona",
          }
        }
      }
    }
  }
};
