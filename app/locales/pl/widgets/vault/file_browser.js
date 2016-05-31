export default {
  widgets: {
    vault: {
      file_browser: {
        table: {
          loading: "Pobieranie listy plików",

          header: {
            "title": "Tytuł",
            "title-sortname": "Tytuł (do sortowania)",
            "artist": "Autor",
            "artist-sortname": "Autor (do sortowania)",
            "album": "Album",
            "album-sortname": "Album (do sortowania)",
            "album-artist": "Autor albumu",
            "album-artist-sortname": "Autor albumu (do sortowania)",
            "composer": "Kompozytor",
            "date": "Data",
            "datetime": "Data i czas",
            "genre": "Gatunek",
            "comment": "Komentarz",
            "extended-comment": "Rozszerzony komentarz",
            "track-number": "Number ścieżki",
            "track-count": "Liczba ścieżek",
            "album-disc-number": "Numer płyty w albumie",
            "album-disc-count": "Liczba płyt w albumie",
            "location": "Lokalizacja",
            "homepage": "Strona domowa",
            "description": "Opis",
            "version": "Wersja",
            "isrc": "ISRC",
            "administration": "Organizacja",
            "copyright": "Prawa autorskie",
            "copyright-uri": "Prawa autorskie (adres internetowy)",
            "encoded-by": "Zakodowany przez",
            "contact": "Kontakt",
            "license": "Licencja",
            "license-uri": "Licencja (adres internetowy)",
            "performer": "Wykonawca",
            "duration": "Czas trwania",
            "codec": "Kodek",
            "video-codec": "Kodek wideo",
            "audio-codec": "Kodek audio",
            "subtitle-codec": "Kodek napisów",
            "container-format": "Format kontenera",
            "bitrate": "Bitrate",
            "nominal-bitrate": "Nominalny bitrate",
            "minimum-bitrate": "Minimalny bitrate",
            "maximum-bitrate": "Maksymalny bitrate",
            "serial": "Nr seryjny",
            "encoder": "Oprogramowanie do kodowania",
            "encoder-version": "Wersja oprogramowania do kodowania",
            "replaygain-track-gain": "Wzmocnienie ścieżki wg ReplayGain",
            "replaygain-track-peak": "Szczytowy poziom ścieżki wg ReplayGain",
            "replaygain-album-gain": "Wzmocnienie albumu wg ReplayGain",
            "replaygain-album-peak": "Szczytowy poziom albumu wg ReplayGain",
            "replaygain-reference-level": "Punkt referencyjny ReplayGain",
            "language-code": "Kod języka",
            "language-name": "Język",
            "image": "Obraz",
            "preview-image": "Podgląd obrazu",
            "attachment": "Załącznik",
            "beats-per-minute": "BPM",
            "keywords": "Słowa kluczowe",
            "geo-location-name": "Lokalizacja geograficzna (nazwa)",
            "geo-location-latitude": "Lokalizacja geograficzna (szerokość geograficzna)",
            "geo-location-longitude": "Lokalizacja geograficzna (długość geograficzna)",
            "geo-location-elevation": "Lokalizacja geograficzna (wysokość)",
            "geo-location-country": "Lokalizacja geograficzna (kraj)",
            "geo-location-city": "Lokalizacja geograficzna (miasto)",
            "geo-location-sublocation": "Lokalizacja geograficzna (region)",
            "geo-location-horizontal-error": "Lokalizacja geograficzna (błąd horyzontalny)",
            "geo-location-movement-speed": "Lokalizacja geograficzna (prędkość poruszania się)",
            "geo-location-movement-direction": "Lokalizacja geograficzna (kierunek poruszania się)",
            "geo-location-capture-direction": "Lokalizacja geograficzna (kierunek przechwytywania)",
            "show-name": "Nazwa audycji",
            "show-sortname": "Nazwa audycji (do sortowania)",
            "show-episode-number": "Numer odcinka",
            "show-season-number": "Numer sezonu",
            "lyrics": "Autor tekstu",
            "composer-sortname": "Kompozytor (do sortowania)",
            "grouping": "Grupa",
            "user-rating": "Ocena użytkownika",
            "device-manufacturer": "Producent urządzenia",
            "device-model": "Model urządzenia",
            "application-name": "Nazwa aplikacji",
            "application-data": "Dane aplikacji",
            "image-orientation": "Orientacja urządzenia",
            "publisher": "Wydawca",
            "interpreted-by": "Autor interpretacji",
            "midi-base-note": "Ton podstawowy MIDI",
            "private-data": "Dane prywatne",

            "name": "Nazwa",
            "duration-accurate": "Czas trwania (dokładny)",
          },
        },

        modals: {
          delete: {
            header: "Kasowanie",
            message: {
              confirmation: "Czy na pewno chcesz usunąć zaznaczone pliki (%(count)s szt.)?",
              acknowledgement: "Usunięto %(count)s plik(ów).",
              progress: "Trwa kasowanie plików…",
              cancelled: "Część plików dla których operacje zostały już wykonane została skasowana, ale dalsze kasowanie zostało przerwane.",
            },
            action: {
              proceed: "Skasuj",
              cancel: "Anuluj",
              close: "Zamknij",
            }
          },
          upload:{
            header: "Załaduj pliki",
            instruction: "Wybierz pliki",
            table: {
              header: {
                file_name: "Nazwa",
                file_size: "Rozmiar",
                status: "Status",
              },
            }
          },
          tag: {
            header: "Kategorie",
            message: {
              confirmation: "Wybierz kategorie, które zostaną przypisane do zaznaczonych plików (%(count)s szt.):",
              acknowledgement: "Przypisano kategorie do %(count)s plik(ów).",
              progress: "Trwa przypisywanie kategorii…",
            },
            action: {
              proceed: "Przypisz kategorie",
              cancel: "Anuluj",
              close: "Zamknij",
            }
          },

          metadata: {
            header: "Metadane",
            form: {
              retain: "Nie zmieniaj",
              multiple_val: "Wiele wartości",
            },
            message: {
              confirmation: "Wybierz metadane, które zostaną przypisane do zaznaczonych plików (%(count)s szt.):",
              acknowledgement: "Przypisano metadane do %(count)s plik(ów).",
              progress: "Trwa przypisywanie metadanych…",
              cancelled: "Część plików dla których operacje zostały już wykonane będzie mieć przypisane nowe metadane, ale dalsze przypisywanie zostało przerwane.",
            },
            action: {
              proceed: "Przypisz metadane",
              cancel: "Anuluj",
              close: "Zamknij",
            }
          },
        }
      }
    }
  }
};
