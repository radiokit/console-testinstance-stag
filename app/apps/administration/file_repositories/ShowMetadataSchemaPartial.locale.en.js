export default {
  apps: {
    administration: {
      file_repositories: {
        show: {
          tabs: {
            body: {
              metadata_schema: {
                table: {
                  index: {
                    actions: {
                      create: 'Add metadata field',
                    },

                    table: {
                      header: {
                        name: 'Field name',
                        key: 'Key',
                        kind: 'Value type',
                      },
                      loading: 'Loading metadata schemas...',
                    },

                    modals: {
                      create: {
                        header: 'Add metadata field',
                        action: {
                          proceed: 'Add metadata field',
                          close: 'Close',
                          cancel: 'Cancel',
                        },
                        message: {
                          progress: 'Adding metadata...',
                          acknowledgement: 'Metadata field was added succesfully.',
                        },
                        form: {
                          name: {
                            label: 'Field name',
                            hint: 'Choose any name that will describe contents of this field, e.g. \'composer\'.',
                          },
                          key: {
                            label: 'Key',
                            hint: 'Unique key describing role of this field for the system.',
                          },
                          kind: {
                            label: 'Value type',
                            values: {
                              string: 'Text (one line)',
                              db: 'Decibels',
                              integer: 'Number (integer)',
                              text: 'Text (multiline)',
                              float: 'Number (with decimal part)',
                              date: 'Date',
                              time: 'Time',
                              datetime: 'Date & Time',
                              url: 'URL',
                              duration: 'Duration',
                              waveform: 'Waveform',
                              image: 'Image',
                              file: 'File',
                            },
                          },
                        },
                      },
                      delete: {
                        header: 'Remove metadata field',
                        action: {
                          proceed: 'Remove metadata field',
                          close: 'Close',
                          cancel: 'Cancel',
                        },
                        message: {
                          progress: 'Deleting metedata fields... ',
                          confirmation: 'Do you really want to remove this metadata field?',
                          acknowledgement: 'Metadata field was succesfully removed.',
                        },
                      },
                      update: {
                        header: 'Edit metadata field',
                        action: {
                          proceed: 'Edit metadata field',
                          close: 'Close',
                          cancel: 'Cancel',
                        },
                        message: {
                          progress: 'Editing metadata...',
                          acknowledgement: 'Metadata field was edited succesfully.',
                        },
                        form: {
                          name: {
                            label: 'Field name',
                            hint: 'Choose any name that will describe contents of this field, e.g. \'composer\'.',
                          },
                          key: {
                            label: 'Key',
                            hint: 'Unique key describing role of this field for the system.',
                          },
                          kind: {
                            label: 'Value type',
                            values: {
                              string: 'Text (one line)',
                              db: 'Decibels',
                              integer: 'Number (integer)',
                              text: 'Text (multiline)',
                              float: 'Number (with decimal part)',
                              date: 'Date',
                              time: 'Time',
                              datetime: 'Date & Time',
                              url: 'URL',
                              duration: 'Duration',
                              waveform: 'Waveform',
                              image: 'Image',
                              file: 'File',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
