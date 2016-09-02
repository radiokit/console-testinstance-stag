export default {
  apps: {
    library_limited: {
      navigation: {
        title: 'Biblioteka (tylko upload)',
        file_repositories: {
          title: "Nowe",
        },
      },
      file_repositories: {
        index: {
          header: 'Repozytoria plików',

          table: {
            loading: 'Pobieranie repozytoriów plików',
          },
        },
        show: {
          sidebar: {
            all_tags: 'Wszystkie',
            edit_tag_metadata: 'Edytuj metadane',
          },
        },
      },
    },
  },
};
