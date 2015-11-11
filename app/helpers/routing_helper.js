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
      new: function(context) {
        return "/apps/shows/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/new";
      },
      create: function(context) {
        return "/apps/shows/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/create";
      },
      show: function(context, trackId) {
        return "/apps/shows/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/show/" + trackId;
      },
      showTrackMarkers: function(context, trackId) {
        return "/apps/shows/" +  AccountHelper.getCurrentAccountIdFromContext(context) + "/show/" + trackId + "/track_markers";
      }
    }
  }
}
