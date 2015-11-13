export default {
  apps: {
    shows: {
      navigation: {
        title: "Audycje"
      },
      index: {
      	add_track: {
      		header: "Dodaj utwór"
      	}
      },
      show: {
        edit_track_markers: "Edytuj markery"
      },

      files: {
        index: {
          loading: "Ładowanie biblioteki audycji",
          header: "Biblioteka audycji",
          actions: {
            create: "Wyślij nowe audycje"
          },
          table: {
            header: {
              name: "Nazwa",
              duration_total: "Czas trwania",
            }
          }
        }
      },

      widgets: {
        upload_widget: {
          upload_instructions: "Przeciągnij tu pliki lub kliknij by poszukać ich na Twoim urządzeniu",
          table: {
            header: {
              file_name: "Nazwa pliku",
              file_size: "Rozmiar",
              status: "Stan"
            }
          },
          tags: {
            select: {
              placeholder: "Kliknij tutaj by wybrać etykiety, które będą przypisane do wysyłanych plików",
              help: "Pole niewymagane"

            }
          },
        },
      }
    }
  }
}
