import React from 'react';

import {
  fromJS,
  List,
} from 'immutable';

import {
  ClipBox,
  TrackList,
  ScrollableTrackList,
} from '../../widgets/clip';

import {
  ClipUtils,
} from './clip_utils';

import {
  TrackListUtils,
} from './track_utils';

class ClipEditorApp extends React.Component {
  constructor(props) {
    super(props);
    const rawClip = enflateClip(mockClip)
    const clip = ClipUtils.fromRaw(rawClip);
    this.state = {
      clip,
      playlist: TrackListUtils.fromRaw(fromJS({
        id: '',
        name: '',
        items: [
          {
            id: 'ghfgbfbxtdgdsvs',
            offset: 10000,
            track: 1,
            'cue-in': 0,
            'fade-in': 0,
            'fade-out': 90000,
            'cue-out': 100000,
            clip: rawClip,
          },
          {
            id: 'mcndknsd',
            offset: 50000,
            track: 3,
            'cue-in': 10000,
            'fade-in': 20000,
            'fade-out': 80000,
            'cue-out': 90000,
            clip: rawClip,
          }
        ]
      })),
    };

    this.setClip = clip => this.setState(this.calcState(clip));
    this.setPlaylist = playlist => this.setState({playlist});
    this.setCursor = t => this.setState({cursor:t});
  }

  calcState(clip) {
    return {
      clip,
      playlist: this.state.playlist.set(
        'items',
        this.state.playlist.get(
          'items',
          List()
        ).map(item => item.set('clip', clip))
      ),
    };
  }

  render() {
    const {playlist, clip} = this.state;

    const clipBoxProps = {
      onChange: this.setClip,
      clip,
      playMarker: 10000,
      width: 1000,
    };

    return (
      <section>
        <div className="section-body">
          <div className="card">
            <div className="card-body">
              <p>ClipBox</p>
              {!false && (
                <ClipBox {...clipBoxProps} width={1000} offsetStart={0} offsetLength={clip.get('duration')}/>)}
              <p>ClipBox clipped</p>
              {!false && (<ClipBox {...clipBoxProps} width={750/2} offsetStart={5000} offsetLength={5000}/>)}
              <p>ClipBox stretched</p>
              {!false && (
                <ClipBox {...clipBoxProps} width={750/2} offsetStart={0} offsetLength={clip.get('duration')}/>)}

              <p>TrackList[clip=clip]</p>
              {!false && (
                <TrackList width={1000} offsetStart={0} offsetLength={0}
                           clip={clip}
                           onClipChange={this.setClip}
                />
              )}

              <p>TrackList[clip=clip]</p>
              {!false && (
                <TrackList width={1000} offsetStart={0} offsetLength={0}
                           clip={clip}
                           cursorTime={this.state.cursor || 1000}
                           onSelectTime={this.setCursor}
                           onClipChange={this.setClip}
                />
              )}

              <p>ScrollableTrackList[playlist=playlist][scrollable][zoomable]</p>
              {!false && (
                <ScrollableTrackList width={1000} offsetStart={0} offsetLength={150000}
                                     playlist={playlist}
                                     visibleTracksCount={5}
                                     onClipChange={this.setClip}
                                     onPlaylistChange={this.setPlaylist}
                                     cursorTime={this.state.cursor || 1000}
                                     onSelectTime={this.setCursor}
                                     scrollable={true} zoomable={true}/>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ClipEditorApp;

function enflateClip(clip) {
  return clip
    .delete('variant_schemas')
    .delete('variant_items')
    .set('variants', clip.get('variant_items').map(item => {
      return item
        .delete('schema_id')
        .set(
          'schema',
          clip.get('variant_schemas').find(schema => schema.get('id') === item.get('schema_id'))
        )
    }))
    .delete('metadata_schemas')
    .delete('metadata_items')
    .set('metadata', clip.get('metadata_items').map(item => {
      return item
        .delete('schema_id')
        .set(
          'schema',
          clip.get('metadata_schemas').find(schema => schema.get('id') === item.get('schema_id'))
        )
    }));
}

const mockClip = fromJS({
  id: "3ED534DA-FB09-11E5-805B-D9BE61FECC63",
  name: "Jakaś nazwa",
  duration: 100000, // jeszcze nie ma, będzie w milisekundach
  repository_id: "5C45FD10-FB09-11E5-B837-D9BE61FECC63", // obecnie się nazywa record_repository_id, niezgodnie z konwencją
  variant_schemas: [
    {
      id: "qaz",
      kind: "waveform-image",
      key: "waveform-image-small",
      options: {
        width: 1024,
        height: 512
      },
    },
    {
      id: "wsx",
      kind: "waveform-image",
      key: "waveform-image-large",
      options: {
        width: 2048,
        height: 1024
      },
    },
    {
      id: "edc",
      kind: "audio-web-friendly",
      key: "audio-web-friendly-128",
      options: {
        bitrate: 128
      },
    },
  ],
  variant_items: [ // jeszcze nie ma
    {
      id: "3ED534DA-FB09-11E5-805B-D9BE61FECC63",
      schema_id: "qaz",
      public_url: require('./wave.png')
    },
    {
      id: "F05CFA94-FB09-11E5-968A-16DFE97DB0C8",
      schema_id: "wsx",
      public_url: require('./wave.png')
    },
    {
      id: "F05CFA94-FB09-11E5-968A-16DFE97EB0C8",
      schema_id: "edc",
      public_url: require('./wave.png')
    },
  ],
  metadata_schemas: [
    {
      id: "intro-offset",
      key: "intro",
      kind: "offset",
    },
    {
      id: "outro-offset",
      key: "outro",
      kind: "offset",
    },
    {
      id: "mix-next-offset",
      key: "mix-next",
      kind: "offset",
    },
    {
      id: "fade-in",
      key: "fade-in",
      kind: "offset",
    },
    {
      id: "fade-out",
      key: "fade-out",
      kind: "offset",
    },
    {
      id: "cue-in",
      key: "cue-in",
      kind: "offset",
    },
    {
      id: "cue-out",
      key: "cue-out",
      kind: "offset",
    },
    {
      id: "loop-region",
      key: "loop",
      kind: "region",
    },
  ],
  metadata_items: [ // jest ale działa nieco inaczej i sie inaczej nazywa w joinach
    {
      id: "F05CFA94-FB09-11E5-968A-16DFE97DB0C6",
      schema_id: "intro-offset",
      value_offset: 12345, // milisekundy, wartość jest w polu value_(kind),
    },
    {
      id: "F05CFA94-FB09-11E5-968A-16DFE97DB0C7",
      schema_id: "outro-offset",
      value_offset: 55567, // milisekundy, wartość jest w polu value_(kind),
    },
    {
      id: "F05CFA94-FB09-11E5-968A-16DFE97DB0C8",
      schema_id: "mix-next-offset",
      value_offset: 40000, // milisekundy, wartość jest w polu value_(kind),
    },
    {
      id: "F05CFA94-FB09-11E5-968A-16DFE97DB0C9",
      schema_id: "loop-region",
      value_offset: 20000,
      value_duration: 10000,
    },
    {
      id: "F05CFA94-FB09-11F5-968A-16DFE97DB0C9a",
      schema_id: "cue-in",
      value_offset: 5000,
    },
    {
      id: "F05CFA94-FB09-11F5-968A-16DFE97DB0C9b",
      schema_id: "fade-in",
      value_offset: 15000,
    },
    {
      id: "F05CFA94-FB09-11F5-968A-16DFE97DB0C9c",
      schema_id: "fade-out",
      value_offset: 95000,
    },
    {
      id: "F05CFA94-FB09-11F5-968A-16DFE97DB0C9d",
      schema_id: "cue-out",
      value_offset: 97500,
    },
  ]
});
