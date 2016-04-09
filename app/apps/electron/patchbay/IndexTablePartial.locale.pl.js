export default {
  apps: {
    electron: {
      patchbay: {
        table: {
          index: {
            actions: {
              create: "Dodaj regułę",
              delete: "Usuń reguły",
            },
            modals: {
              create: {
                header: "Dodaj regułę",
                action: {
                  proceed: "Dodaj regułę",
                  cancel: "Anuluj",
                  close: "Zamknij",
                },
                form: {
                  source_audio_interface_id: {
                    label: "Źródło (interfejs audio)",
                  },
                  destination_audio_interface_id: {
                    label: "Cel (interfejs audio)",
                  },
                },
                message: {
                  acknowledgement: "Pomyślnie utworzono regułę",
                },
              },
              delete: {
                header: "Usuń reguły",
                message: {
                  confirmation: "Czy na pewno chcesz usunąć zaznaczone reguły?",
                },
                action: {
                  proceed: "Usuń reguły",
                  cancel: "Anuluj",
                },
              },
            },
            table: {
              loading: "Ładowanie reguł...",
              header: {
                source_audio_interface: "Źródło (interfejs audio)",
                destination_audio_interface: "Cel (interfejs audio)",
              }
            }
          }
        }
      },
    }
  }
}
