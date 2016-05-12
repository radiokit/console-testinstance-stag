export default {
  apps: {
    administration: {
      file_repositories: {
        show: {
          tabs: {
            body: {
              tags_schema: {
                actions: {
                  add_category: "Add category",
                },
                modals: {
                  edit_category: {
                    header: "Edit category",
                    form: {
                      name: {
                        label: "Category name",
                        hint: "Type new category name"
                      },
                    },
                    message: {
                      confirmation: "Do you want to edit this category",
                      acknowledgement: "Category edited.",
                      progress: "Editing category…",
                    },
                    action: {
                      proceed: "Edit",
                      cancel: "Cancel",
                      close: "Close",
                    }
                  },


                  edit_tag: {
                    header: "Edit tag",
                    form: {
                      name: {
                        label: "Tag name",
                        hint: "Edit tag name"
                      },
                    },
                    message: {
                      confirmation: "Do you want to edit this tag",
                      acknowledgement: "Tag edited.",
                      progress: "Editing tag…",
                    },
                    action: {
                      proceed: "Edit",
                      cancel: "Cancel",
                      close: "Close",
                    }
                  },

                  delete_category: {
                    header: "Delete category",
                    message: {
                      confirmation: "Do you want to delete this category?",
                      acknowledgement: "Category deleted.",
                      progress: "Deleting category",
                    },
                    action: {
                      proceed: "Delete",
                      cancel: "Cancel",
                      close: "Close",
                    }
                  },
                  delete_tag: {
                    header: "Delete tag",
                    message: {
                      confirmation: "Do you want to delete this tag?",
                      acknowledgement: "Tag deleted.",
                      progress: "Deleting tag",
                    },
                    action: {
                      proceed: "Delete",
                      cancel: "Cancel",
                      close: "Close",
                    }
                  },

                  create_category: {
                    header: "Create category",
                    form: {
                      name: {
                        label: "Category name",
                        hint: "Type new category name"
                      },
                    },
                    message: {
                      acknowledgement: "Category created.",
                      progress: "Creating category…",
                    },
                    action: {
                      proceed: "Create",
                      cancel: "Cancel",
                      close: "Close",
                    }
                  },

                  create_tag: {
                    header: "Create tag",
                    form: {
                      name: {
                        label: "Tag name",
                        hint: "Type new tag name"
                      },
                    },
                    message: {
                      acknowledgement: "Tag created.",
                      progress: "Creating tag…",
                    },
                    action: {
                      proceed: "Create",
                      cancel: "Cancel",
                      close: "Close",
                    }
                  },
                },
              },
            },
          },
        },
      },
    }
  }
}
