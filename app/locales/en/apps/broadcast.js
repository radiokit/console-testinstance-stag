export default {
  apps: {
    broadcast: {
      navigation: {
        title: 'Broadcast',
        subtitle: 'Everything related to streaming',
        playlist: {
          title: 'Schedule',
        },
        royalties: {
          title: 'Royalties',
        },
        stats: {
          title: "Stats",
        },
      },
      playlist: {
        header: 'Playlist',
        week: 'Week %(count)s',
        filter_hours: 'Hour filtering',
        toolbar: {
          add_button: 'Add track',
          update_button: 'Edit track',
          delete_button: 'Remove track',
        },
        tabs: {
          headers: {
            day: 'Daily',
          },
        },
        browser: {
          loading: 'Loading',
          header: {
            name: 'Name',
            cue_in_at: 'Start time',
            cue_out_at: 'End time',
          },
        },
        add_modal: {
          header: 'Add track',
          loading: 'Loading...',
          close_button: 'Close',
          success_info: 'Track has been added to playlist.',
          account: {
            header: 'Choose account',
          },
          repository: {
            header: 'Choose repository',
          },
        },
        form: {
          file_name: 'File name',
          start_at: 'Start time',
          end_at: 'End time',
          type_and_desc: 'Type and description',
          name: 'Track name',
          cancel_button: 'Cancel',
          save_button: 'Add to playlist',
        },
        delete: {
          header: 'Deleting Tracks',
          message: {
            progress: 'Deleting...',
            confirmation: '%(count)s tracks is going to be removed',
            acknowledgement: 'Selected tracks has been removed',
          },
          action: {
            cancel: 'Cancel',
            proceed: 'Delete',
            close: 'Zamknij',
          },
        },
      },
    },
  },
};
