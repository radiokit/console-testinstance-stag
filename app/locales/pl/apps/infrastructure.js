export default {
  apps: {
    infrastructure: {
      navigation: {
        title: "Infrastruktura",
        subtitle: "Konfiguracja i monitoring sieci",
        computing_nodes: {
          title: "Serwery audio",
        },
        broadcast_channels: {
          title: "Kanały"
        },

      },


      computing_nodes: {
        index: {
          header: "Serwery audio",
          actions: {
            create: "Dodaj serwer",
            delete: "Usuń zaznaczone serwery",
          },

          table: {
            loading: "Ładowanie listy serwerów audio",
            header: {
              hostname: "Nazwa hosta",
              provider: "Provider",
              physical_location_country: "Kraj",
              tcp_ports: "TCP ports",
              udp_ports: "UDP ports",
              media_input_stream_rtp: "IN (RTP)",
              media_input_stream_http: "IN (HTTP)",
              media_server_rtsp: "SRV (RTSP)",
              media_output_stream_icecast2: "OUT (Ice2)",
              media_routing_link: "ROU (Link)",
              media_routing_mix_group: "ROU (MixGrp)",
            }
          },

          modals: {
            delete: {
              title: "Usuwanie serwerów audio",
              message: {
                confirmation: "Czy na pewno chcesz usunąć zaznaczone serwery (%(count)s szt.)?",
                acknowledgement: "Usunięto %(count)s serwer(ów).",
                progress: "Trwa usuwanie serwerów…",
              },
              action: {
                proceed: "Usuń",
                cancel: "Anuluj",
                cancel: "Zamknij",
              }
            },

            create: {
              header: "Dodawanie serwera",
              form: {
                hostname: {
                  label: "Nazwa hosta",
                },
                provider: {
                  label: "Provider",
                },
                physical_location_country: {
                  label: "Fizyczna lokalizacja (kod kraju)"
                },
                listen_port_tcp_min: {
                  label: "Min port TCP",
                },
                listen_port_tcp_max: {
                  label: "Max port TCP",
                },
                listen_port_udp_min: {
                  label: "Min port UDP",
                },
                listen_port_udp_max: {
                  label: "Max port UDP",
                },
                rtsp_port_min: {
                  label: "Min port RTSP",
                },
                rtsp_port_max: {
                  label: "Max port RTSP",
                },
              },

              acknowledgement: {
                info: "Pomyślnie dodano serwer",
              },

              action: {
                proceed: "Dodaj serwer",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            }
          }
        },
      },

      patchbay: {
        index: {
          header: "Krosownica",
        }
      },

      external_inputs: {
        index: {
          header: "Zewnętrzne źrodła dźwięku",
          actions: {
            create: "Dodaj źródło dźwięku",
            delete: "Usuń zaznaczone źródła dźwięku",
          },

          table: {
            loading: "Pobieranie listy zewnętrznych źródeł dźwięku",
            header: {
              name: "Nazwa",
              location: "Adres",
              level: "Poziom",
            },
          },

          modals: {
            delete: {
              title: "Usuwanie zewnętrznych źródeł dźwięku",
              message: {
                confirmation: "Czy na pewno chcesz usunąć zaznaczone źródła dźwięku (%(count)s szt.)?",
                acknowledgement: "Usunięto %(count)s źródeł dźwięku.",
                progress: "Trwa usuwanie źródeł dźwięku…",
              },
              action: {
                proceed: "Usuń",
                cancel: "Anuluj",
                cancel: "Zamknij",
              }
            },

            create: {
              header: "Dodawanie źródła dźwięku",
              form: {
                location: {
                  label: "Nazwa",
                  hint: "Wybierz jakąkolwiek nazwę, która pozwoli Ci odróżnić to źródło dźwięku od innych.",
                },
                location: {
                  label: "Adres strumienia",
                  hint: "To musi być poprawny adres http:// lub https://",
                },
              },

              acknowledgement: {
                info: "Pomyślnie dodano zewnętrzne źródło dźwięku.",
              },

              action: {
                proceed: "Dodaj źródło dźwięku",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            }
          }
        },
      },

      transmissions: {
        index: {
          header: "Transmisje",
          table: {
            loading: "Pobieranie listy transmisji",
            header: {
              device_name: "Urządzenie",
              audio_interface_name: "Interfejs Audio",
              level: "Poziom",
            },
          },
        },
      },
    }
  }
}
