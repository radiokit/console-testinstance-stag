export default {
  apps: {
    library_limited: {
      navigation: {
        title: 'Library (only upload)',
        subtitle: 'Place to upload all of your files',
        file_repositories: {
          title: "Incoming",
        },
      },
      file_repositories: {
        index: {
          header: 'Library sections',
          table: {
            loading: 'Fetching list of library sections',
          },
        },
        show: {
          sidebar: {
            all_tags: 'All',
            edit_tag_metadata: 'Edit metadata',
          },
        },
      },
    },
  },
};
