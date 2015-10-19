export default {
  apps: {
    joint: {
      index: {
        loading: "Pobieranie listy dostępnych kanałów",
        none: "Nie masz uprawnień do ani jednego kanału"
      },

      client_nodes: {
        create: {
          header: "Dodawanie urządzenia",
          form: {
            name: {
              label: "Nazwa urządzenia",
              hint: "Jeśli chcesz, wybierz jakąś nazwę urządzenia, która pozwoli Ci odróżnić je później od innych, np. „Laptop Adama”"
            },
            submit: "Dodaj"
          }
        },
        index: {
          loading: "Pobieranie listy urządzeń",
          none: "Nie zarejestrowano dotychczas żadnych urządzeń"
        }
      },

      partials: {
        mix: {
          returns: {
            header: "Zwrotna",
            none: "Brak źródeł dźwięku"
          },

          transmissions: {
            header: "Transmisje",
            none: "Brak źródeł dźwięku"
          }
        }
      }
    }
  }
};