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
