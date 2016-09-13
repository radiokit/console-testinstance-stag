export default {
  apps: {
    electron: {
      patchbay: {
        toolbar: {
          client: {
            create: 'Dodaj urządzenie',
            edit: 'Edytuj',
            delete: 'Usuń',
          },
          audiolink: {
            active: {
              not_selected: 'Wybierz łącze',
              enable: 'Włącz',
              disable: 'Wyłącz',
            },
          },

          modals: {
            update: {
              header: 'Edytuj',

              form: {
                os_name: {
                  label: 'Nazwa w systemie',
                },
                name: {
                  label: 'Twoja nazwa',
                },
                bitrate: {
                  label: 'Bitrate (kbit/s)',
                },
                latency: {
                  label: 'Bufor (ms)',
                },
                dataloss: {
                  label: 'Narzut na korekcję danych',
                  hint: 'Określa, jaki procent danych może być utracony w trakcie transmisji. Zwiększanie tej wartości obniży jakość, chyba że zwiększysz także bitrate',
                },
                peer_to_peer: {
                  label: 'Peer to peer',
                  values: {
                    true: 'true',
                    false: 'false',
                  },
                },
                sender_ip: {
                  label: 'Sender\'s IP',
                },
                sender_control_port: {
                  label: 'Sender\'s control port',
                },
                receiver_ip: {
                  label: 'Receiver\'s IP',
                },
                receiver_data_port: {
                  label: 'Receiver\'s data port',
                },
                receiver_control_port: {
                  label: 'Receiver\'s control port',
                },
                audio_type: {
                  label: 'Rodzaj dźwięku',
                  values: {
                    generic: 'Uniwersalny',
                    voice: 'Głos',
                  },
                },
              },

              action: {
                proceed: 'Aktualizuj',
                cancel: 'Anuluj',
                close: 'Zamknij',
              },

              message: {
                acknowledgement: 'Aktualizacja zakończona powodzeniem.',
              },
            },

            delete: {
              client: {
                header: 'Usuń urządzenie',
                message: {
                  confirmation: 'Czy na pewno chcesz usunąć zaznaczone urządzenie?',
                  acknowledgement: 'Usunięto urządzenie.',
                  progress: 'Trwa usuwanie urządzenia…',
                },
                action: {
                  proceed: 'Usuń',
                  cancel: 'Anuluj',
                  close: 'Zamknij',
                },
              },

              link: {
                header: 'Usuń łącze',
                message: {
                  confirmation: 'Czy na pewno chcesz usunąć zaznaczone łącze?',
                  acknowledgement: 'Usunięto łącze.',
                  progress: 'Trwa usuwanie łącza…',
                },
                action: {
                  proceed: 'Usuń',
                  cancel: 'Anuluj',
                  close: 'Zamknij',
                },
              },
            },
          },
        },
      },
    },
  },
};
