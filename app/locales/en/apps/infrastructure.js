export default {
  apps: {
    infrastructure: {
      navigation: {
        title: "Infrastructure",
        client_nodes: {
          title: "Audio Devices",
        },

        computing_nodes: {
          title: "Audio Servers",
        },

        external_inputs: {
          title: "External Audio Inputs",
        },
      },

      client_nodes: {
        index: {
          header: "Audio Devices",
          actions: {
            create: "Add device",
            delete: "Remove selected devices",
          },

          table: {
            loading: "Fetching list of audio devices",
            header: {
              name: "Name",
              os_type: "Operating system",
              app_version: "App version",
              cpu_load: "CPU",
              memory_usage: "RAM",
              network_type: "Network type",
              network_strength: "Network strength",
            },
            cells: {
              os_type: {
                android: "Android",
                windows: "Windows",
                ios: "iOS",
                macosx: "MacOS X",
                linux: "Linux",
                unknown: "Unknown",
              },
              network_type: {
                bluetooth: "Bluetooth",
                dummy: "Dummy",
                ethernet: "Ethernet",
                mobile: "Mobile",
                vpn: "VPN",
                wifi: "WiFi",
                wimax: "WiMAX",
                unknown: "Unknown",
              }
            }
          },

          modals: {
            delete: {
              header: "Delete device",
              message: {
                confirmation: "Are you sure that you want to delete %(count)s selected device(s)?",
                acknowledgement: "Deleted %(count)s device(s).",
                progress: "Deleting in progress…",
              },
              action: {
                proceed: "Delete",
                cancel: "Cancel",
                close: "Close",
              }
            },

            create: {
              header: "Add device",
              form: {
                name: {
                  label: "Name of the device",
                  hint: "Choose any name that will help you to distinguish this device from others",
                },
              },

              acknowledgement: {
                header: "Device added succesfully",
                instructions: {
                  header: "Now please install an application on your device that will connect with the system. Once it's done, you will be able to use the device to transmit the sound from and to the system.",
                  os: "Choose instruction appropriate to the operating system installed on the device:",
                  android: {
                    header: "Android",
                    instructions: "Find the app in the Google Play store and install it.",
                    action_open: "Open Google Play",
                  },
                  windows: {
                    header: "Windows",
                    instructions: "Download application using button below and install it.",
                    action_open: "Download",
                  },
                  code: "During installation the application will ask you for the following code. It is valid for 15 minutes."
                }
              },

              action: {
                proceed: "Add device",
                cancel: "Cancel",
                close: "Close",
              }
            }
          }
        },
      },

      computing_nodes: {
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
    }
  }
}
