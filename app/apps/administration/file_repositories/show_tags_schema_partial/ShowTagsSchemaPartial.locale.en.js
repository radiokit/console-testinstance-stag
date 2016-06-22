export default {
  apps: {
    administration: {
      file_repositories: {
        show: {
          tabs: {
            body: {
              tags_schema: {
                actions: {
                  add_category: 'Add group of tags',
                },
                empty_metadata_schemas: 'Add metadata schemas',
                modals: {
                  edit_category: {
                    header: 'Edit group of tags',
                    form: {
                      name: {
                        label: 'Group name',
                        hint: 'Type name for group of tags',
                      },
                      key: {
                        label: "Key",
                        hint: "Key used for integration with other systems"
                      },
                    },
                    message: {
                      confirmation: 'Do you want to edit this group of tags',
                      acknowledgement: 'Group of tags edited.',
                      progress: 'Editing group of tags…',
                    },
                    action: {
                      proceed: 'Edit',
                      cancel: 'Cancel',
                      close: 'Close',
                    },
                  },

                  edit_tag: {
                    header: 'Edit tag',
                    form: {
                      name: {
                        label: 'Tag name',
                        hint: 'Edit tag name',
                      },
                    },
                    message: {
                      confirmation: 'Do you want to edit this tag',
                      acknowledgement: 'Tag edited.',
                      progress: 'Editing tag…',
                    },
                    action: {
                      proceed: 'Edit',
                      cancel: 'Cancel',
                      close: 'Close',
                    },
                  },

                  delete_category: {
                    header: 'Delete group of tags',
                    message: {
                      confirmation: 'Do you want to delete this group of tags?',
                      acknowledgement: 'Group deleted.',
                      progress: 'Deleting group of tags',
                    },
                    action: {
                      proceed: 'Delete',
                      cancel: 'Cancel',
                      close: 'Close',
                    },
                  },
                  delete_tag: {
                    header: 'Delete tag',
                    message: {
                      confirmation: 'Do you want to delete this tag?',
                      acknowledgement: 'Tag deleted.',
                      progress: 'Deleting tag',
                    },
                    action: {
                      proceed: 'Delete',
                      cancel: 'Cancel',
                      close: 'Close',
                    },
                  },

                  create_category: {
                    header: 'Create group of tags',
                    form: {
                      name: {
                        label: 'Group name',
                        hint: 'Type name for group of tags',
                      },
                      key: {
                        label: "Key",
                        hint: "Key used for integration with other systems"
                      },
                    },
                    message: {
                      acknowledgement: 'Group of tags created.',
                      progress: 'Creating group…',
                    },
                    action: {
                      proceed: 'Create',
                      cancel: 'Cancel',
                      close: 'Close',
                    },
                    empty_warning: 'Group of tags is empty. Add at least one tag',
                  },

                  create_tag: {
                    header: 'Create tag',
                    form: {
                      name: {
                        label: 'Tag name',
                        hint: 'Type new tag name',
                      },
                    },
                    message: {
                      acknowledgement: 'Tag created.',
                      progress: 'Creating tag…',
                    },
                    action: {
                      proceed: 'Create',
                      cancel: 'Cancel',
                      close: 'Close',
                    },
                  },
                  delete_metadata_schema: {
                    header: 'Delete metadata schema for group of tags',
                    message: {
                      confirmation: 'Do you want to delete metadata schema for this group of tags?',
                      acknowledgement: 'Metadata schema deleted.',
                      progress: 'Deleting matadata schema for group of tags',
                    },
                    action: {
                      proceed: 'Delete',
                      cancel: 'Cancel',
                      close: 'Close',
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
