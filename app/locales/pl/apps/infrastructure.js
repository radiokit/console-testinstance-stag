export default {
  apps: {
    infrastructure: {
      navigation: {
        title: "Infrastruktura",
        subtitle: "Konfiguracja i monitoring sieci",
        client_nodes: {
          title: "Urządzenia audio",
        },

        computing_nodes: {
          title: "Serwery audio",
        },

        external_inputs: {
          title: "Zewnętrzne źródła dźwięku",
        },

        transmissions: {
          title: "Transmisje",
        },

        patchbay: {
          title: "Krosownica",
        },
      },

      client_nodes: {
        index: {
          header: "Urządzenia audio",
          actions: {
            create: "Dodaj urządzenie",
            delete: "Usuń zaznaczone urządzenia",
          },

          table: {
            loading: "Ładowanie listy urządzeń audio",
            header: {
              name: "Nazwa",
              os_type: "System operacyjny",
              app_version: "Wersja aplikacji",
              cpu_load: "CPU",
              memory_usage: "RAM",
              network_type: "Typ sieci",
              network_strength: "Siła sieci",
            },
            cells: {
              os_type: {
                android: "Android",
                windows: "Windows",
                ios: "iOS",
                macosx: "MacOS X",
                linux: "Linux",
                unknown: "Nieznany",
              },
              network_type: {
                bluetooth: "Bluetooth",
                dummy: "Testowy",
                ethernet: "Ethernet",
                mobile: "Sieć komórkowa",
                vpn: "VPN",
                wifi: "WiFi",
                wimax: "WiMAX",
                unknown: "Nieznany",
              }
            }
          },

          modals: {
            delete: {
              title: "Usuwanie urządzeń audio",
              message: {
                confirmation: "Czy na pewno chcesz usunąć zaznaczone urządzenia (%(count)s szt.)?",
                acknowledgement: "Usunięto %(count)s urządzeń.",
                progress: "Trwa usuwanie urządzeń…",
              },
              action: {
                proceed: "Usuń",
                cancel: "Anuluj",
                cancel: "Zamknij",
              }
            },

            create: {
              header: "Dodawanie urządzenia",
              form: {
                name: {
                  label: "Nazwa urządzenia",
                  hint: "Wybierz jakąkolwiek nazwę, która pozwoli Ci odróżnić to urządzenie od innych.",
                },
              },

              acknowledgement: {
                header: "Pomyślnie dodano urządzenie",
                instructions: {
                  header: "Teraz zainstaluj na swoim urządzeniu aplikację, która połączy się z systemem. Jak to zrobisz, będziesz mieć możliwość przesyłania dźwięku z oraz do systemu za pomocą tego urządzenia.",
                  os: "Wybierz instrukcję zgodną z systemem operacyjnym zainstalowanym na urządzeniu:",
                  android: {
                    header: "Android",
                    instructions: "Znajdź aplikację Joint.FM w sklepie Google Play i zainstaluj ją.",
                    action_open: "Otwórz Google Play",
                  },
                  windows: {
                    header: "Windows",
                    instructions: "Pobierz aplikację z używając przycisku znajdującego się poniżej i zainstaluj ją.",
                    action_open: "Pobierz",
                  },
                  code: "Podczas instalacji aplikacja poprosi Cię o podanie poniższego kodu. Jest on ważny 15 minut."
                }
              },

              action: {
                proceed: "Dodaj urządzenie",
                cancel: "Anuluj",
                close: "Zamknij",
              }
            }
          }
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
