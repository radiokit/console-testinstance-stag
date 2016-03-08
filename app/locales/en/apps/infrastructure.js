export default {
  apps: {
    infrastructure: {
      navigation: {
        title: "Infrastructure",
        subtitle: "Network configuration and monitoring",
        client_nodes: {
          title: "Audio Devices",
        },

        computing_nodes: {
          title: "Audio Servers",
        },

        external_inputs: {
          title: "External Audio Inputs",
        },

        transmissions: {
          title: "Transmissions",
        },

        patchbay: {
          title: "Patchbay",
        },
      },

      computing_nodes: {
        show: {
          actions: {
            back: "Back to the audio servers index",
            delete: "Delete this audio server",
          },
        },

        index: {
          header: "Audio Servers",
          actions: {
            create: "Add server",
            delete: "Remove selected servers",
          },

          table: {
            loading: "Fetching list of audio servers",
            header: {
              hostname: "Hostname",
              provider: "Provider",
              physical_location_country: "Country",
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
              header: "Delete server",
              message: {
                confirmation: "Are you sure that you want to delete %(count)s selected server(s)?",
                acknowledgement: "Deleted %(count)s server(s).",
                progress: "Deleting in progress…",
              },
              action: {
                proceed: "Delete",
                cancel: "Cancel",
                close: "Close",
              }
            },

            create: {
              header: "Add server",
              form: {
                hostname: {
                  label: "Hostname",
                },
                provider: {
                  label: "Provider",
                },
                physical_location_country: {
                  label: "Physical location (country code)"
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
                info: "Server added succesfully",
              },

              action: {
                proceed: "Add server",
                cancel: "Cancel",
                close: "Close",
              }
            }
          }
        },
      },

      patchbay: {
        index: {
          header: "Patchbay",
        }
      },

      external_inputs: {
        index: {
          header: "External Audio Inputs",
          actions: {
            create: "Add input",
            delete: "Remove selected inputs",
          },

          table: {
            loading: "Fetching list of external audio inputs",
            header: {
              name: "Name",
              location: "Location",
              level: "Level",
            },
          },

          modals: {
            delete: {
              header: "Delete input",
              message: {
                confirmation: "Are you sure that you want to delete %(count)s selected input(s)?",
                acknowledgement: "Deleted %(count)s input(s).",
                progress: "Deleting in progress…",
              },
              action: {
                proceed: "Delete",
                cancel: "Cancel",
                close: "Close",
              }
            },

            create: {
              header: "Add input",
              form: {
                name: {
                  label: "Name",
                  hint: "Choose any name that will help you to distinguish this input from others.",
                },
                location: {
                  label: "Location of the stream",
                  hint: "It has to be a valid http:// or https:// address",
                },
              },

              acknowledgement: {
                info: "Input added succesfully",
              },

              action: {
                proceed: "Add input",
                cancel: "Cancel",
                close: "Close",
              }
            }
          }
        },
      },

      transmissions: {
        show: {
          actions: {
            back: "Back to the tranmissions index",
            delete: "Delete this transmission",
          },
        },

        index: {
          header: "Transmissions",
          table: {
            loading: "Fetching list of transmissions",
            header: {
              device_name: "Device",
              audio_interface_name: "Audio Interface",
              level: "Level",
            },
          },
        },
      },
    }
  }
}
