import AccountHelper from './account_helper.js';

export default {
  apps: {
    joint: {
      devices: {
        index: function(context) {
          return "/apps/joint/" + AccountHelper.getCurrentAccountIdFromContext(context) + "/devices/index";
        },

        create: function(context) {
          return "/apps/joint/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/devices/create";
        },

        add: function(context, role) {
          return "/apps/joint/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/devices/add/" + role;
        }
      }
    },
    shows: {
      files: {
        index: function(context) {
          return "/apps/shows/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/files/index";
        },
        create: function(context) {
          return "/apps/shows/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/files/create";
        },
        show: function(context, track) {
          return "/apps/shows/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/files/show/" + track.get("id");
        },
        showTrackMarkers: function(context, trackId) {
          return "/apps/shows/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/show/" + trackId + "/track_markers";
        },

      }, schedule: {
        index: function(context) {
          return "/apps/shows/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/schedule/index";
        },
        show: function(context, schedulingItemId) {
            return "/apps/shows/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/schedule/show/" + schedulingItemId;
        },
      }
    },
    music: {
      files: {
        index: function(context) {
          return "/apps/music/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/files/index";
        },
        create: function(context) {
          return "/apps/music/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/files/create";
        },
        show: function(context, track) {
          return "/apps/music/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/files/show/" + track.get("id");
        },
        showTrackMarkers: function(context, trackId) {
          return "/apps/music/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/show/" + trackId + "/track_markers";
        },
      },
      schedule: {
        index: function(context) {
          return "/apps/music/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/schedule/index";
        },
        show: function(context, schedulingItemId) {
            return "/apps/music/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/schedule/show/" + schedulingItemId;
        },
      }
    },
  }
}
