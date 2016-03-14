export default {
  widgets: {
    vault: {
      file_browser: {
        table: {
          loading: "Fetching list of files",

          header: {
            "title": "Title",
            "title-sortname": "Title (sort name)",
            "artist": "Artist",
            "artist-sortname": "Artist (sort name)",
            "album": "Album",
            "album-sortname": "Album (sort name)",
            "album-artist": "Album artist",
            "album-artist-sortname": "Album artist (sort name)",
            "composer": "Composer",
            "date": "Date",
            "datetime": "Date & Time",
            "genre": "Genre",
            "comment": "Comment",
            "extended-comment": "Extended comment",
            "track-number": "Track number",
            "track-count": "Track count",
            "album-disc-number": "Album disc number",
            "album-disc-count": "Album disc count",
            "location": "Location",
            "homepage": "Homepage",
            "description": "Description",
            "version": "Version",
            "isrc": "ISRC",
            "administration": "Administration",
            "copyright": "Copyright",
            "copyright-uri": "Copyright (online address)",
            "encoded-by": "Encoded by",
            "contact": "Contact",
            "license": "License",
            "license-uri": "License (online address)",
            "performer": "Performer",
            "duration": "Duration",
            "codec": "Codec",
            "video-codec": "Video codec",
            "audio-codec": "Audio codec",
            "subtitle-codec": "Subtitle codec",
            "container-format": "Container format",
            "bitrate": "Bitrate",
            "nominal-bitrate": "Nominal bitrate",
            "minimum-bitrate": "Minimum bitrate",
            "maximum-bitrate": "Maximum bitrate",
            "serial": "Serial",
            "encoder": "Encoder",
            "encoder-version": "Encoder version",
            "replaygain-track-gain": "ReplayGain track gain",
            "replaygain-track-peak": "ReplayGain track peak",
            "replaygain-album-gain": "ReplayGain album gain",
            "replaygain-album-peak": "ReplayGain album peak",
            "replaygain-reference-level": "ReplayGain reference level",
            "language-code": "Language code",
            "language-name": "Language name",
            "image": "Image",
            "preview-image": "Preview image",
            "attachment": "Attachment",
            "beats-per-minute": "BPM",
            "keywords": "Keywords",
            "geo-location-name": "Geographical location (name)",
            "geo-location-latitude": "Geographical location (latitude)",
            "geo-location-longitude": "Geographical location (longitude)",
            "geo-location-elevation": "Geographical location (elevation)",
            "geo-location-country": "Geographical location (country)",
            "geo-location-city": "Geographical location (city)",
            "geo-location-sublocation": "Geographical location (sublocation)",
            "geo-location-horizontal-error": "Geographical location (horizontal error)",
            "geo-location-movement-speed": "Geographical location (movement speed)",
            "geo-location-movement-direction": "Geographical location (movement direction)",
            "geo-location-capture-direction": "Geographical location (capture direction)",
            "show-name": "Show name",
            "show-sortname": "Show name (sort name)",
            "show-episode-number": "Show episode number",
            "show-season-number": "Show season number",
            "lyrics": "Lyrics",
            "composer-sortname": "Composer (sort name)",
            "grouping": "Grouping",
            "user-rating": "User rating",
            "device-manufacturer": "Device manufacturer",
            "device-model": "Device model",
            "application-name": "Application name",
            "application-data": "Application data",
            "image-orientation": "Image orientation",
            "publisher": "Publisher",
            "interpreted-by": "Interpreted by",
            "midi-base-note": "MIDI base note",
            "private-data": "Private data",

            "name": "Name",
            "duration-accurate": "Duration (accurate)",
          },
        },

        modals: {
          delete: {
            header: "Delete",
            message: {
              confirmation: "Are you sure that you want to delete %(count)s selected file(s)?",
              acknowledgement: "Deleted %(count)s file(s).",
              progress: "Deleting in progress…",
              cancelled: "Some files for which operations were already undertaken are gone, but deleting was cancelled for the remaining part.",
            },
            action: {
              proceed: "Delete",
              cancel: "Cancel",
              close: "Close",
            }
          },
          upload:{
            header: "Upload files",
            instruction: "Choose files",
            table: {
              header: {
                file_name: "File name",
                file_size: "Size",
                status: "Status",
              },
            }
          },
          tag: {
            header: "Tags",
            message: {
              confirmation: "Select tags to apply to %(count)s selected file(s):",
              acknowledgement: "Applied tags to %(count)s file(s).",
              progress: "Applying tags in progress…",
            },
            action: {
              proceed: "Apply tags",
              cancel: "Cancel",
              close: "Close",
            }
          },

          metadata: {
            header: "Metadata",
            immutable: "Do not change",
            message: {
              confirmation: "Edit metadata that should be applied to %(count)s selected file(s):",
              acknowledgement: "Applied metadata to %(count)s file(s).",
              progress: "Applying metadata in progress…",
              cancelled: "Some files for which operations were already undertaken will have new metadata, but tagging was cancelled for the remaining part.",
            },
            action: {
              proceed: "Apply metadata",
              cancel: "Cancel",
              close: "Close",
            }
          },
        }
      }
    }
  }
};
