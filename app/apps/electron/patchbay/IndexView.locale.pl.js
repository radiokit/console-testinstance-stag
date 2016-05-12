export default {
  apps: {
    electron: {
      patchbay: {
        header: "Krosownica",
        tabs: {
          headers: {
            diagram: "Diagram",
            table: "Tabela",
          },
        },

        update_button: "Edytuj urządzenie",
        modals: {
          update: {
            header: "Edycja urządzenia",

            form: {
              name: {
                label: "Nazwa urządzenia",
              },
            },

            action: {
              proceed: "Edytuj urządzenie",
              cancel: "Anuluj",
              close: "Zamknij",
            }
          },
        },
      },
    }
  }
}
