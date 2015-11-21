import AccountHelper from './account_helper.js';

export default {
  apps: {
    joint: {
      devices: {
        index: function(context) {
          return "/apps/join/devices/index";
        },

        create: function(context) {
          return "/apps/joint/devices/create";
        },

        add: function(context, role) {
          return "/apps/joint/devices/add/" + role;
        }
      }
    },
    shows: {
      files: {
        index: function(context) {
          return "/apps/shows/files/index";
        },
        create: function(context) {
          return "/apps/shows/files/create";
        },
        show: function(context, track) {
          return "/apps/shows/files/show/" + track.get("id");
        },
        showTrackMarkers: function(context, trackId) {
          return "/apps/shows/show/" + trackId + "/track_markers";
        },

      }, schedule: {
        index: function(context) {
          return "/apps/shows/schedule/index";
        },
        show: function(context, schedulingItemId) {
            return "/apps/shows/schedule/show/" + schedulingItemId;
        },
      }
    },
    music: {
      files: {
        index: function(context) {
          return "/apps/music/files/index";
        },
        create: function(context) {
          return "/apps/music/files/create";
        },
        show: function(context, track) {
          return "/apps/music/files/show/" + track.get("id");
        },
        showTrackMarkers: function(context, trackId) {
          return "/apps/music/show/" + trackId + "/track_markers";
        },
      },
      schedule: {
        index: function(context) {
          return "/apps/music/schedule/index";
        },
        show: function(context, schedulingItemId) {
            return "/apps/music/schedule/show/" + schedulingItemId;
        },
      }
    },
    onair: {
      playlist: {
        index: function(context) {
          return "/apps/onair/playlist/index";
        },
      },
    },
  }
}
