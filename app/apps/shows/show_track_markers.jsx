import React from 'react';

import TrackMarkersList from './track_markers_list.jsx';
import MetadataWaveformEditor from '../../widgets/admin/metadata_waveform_editor_widget.jsx';

export default React.createClass({
  render: function() {
    return (
      <section>
        <div className="section-body">
          <div className="row">
            <div className="col-lg-offset-1 col-lg-10 col-md-12">
              <MetadataWaveformEditor {...this.props}/>
              <TrackMarkersList {...this.props}/>
            </div>
          </div>
        </div>
      </section>
    );
  }
});