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
            confirmation: {
              message: "Wszystkie pliki (%(count)s) pasujące do aktualnych kryterów są zaznaczone.",
              action: "Wyczyść zaznaczenie.",
            },
          },
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
