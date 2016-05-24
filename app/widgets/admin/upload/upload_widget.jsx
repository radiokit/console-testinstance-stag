// utils
import React from 'react';
import {
  List,
  OrderedMap,
} from 'immutable';
import filesize from 'filesize';
import connect from 'immview-react-connect';
import classnames from 'classnames';
// ui
import Dropzone from 'react-dropzone';
// data
import UploadDomain from '../../../services/UploadDomain';
// lang
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import localePL from './upload_widget_pl';
import localeEN from './upload_widget_en';

Counterpart.registerTranslations('en', { uploadWidget: localeEN });
Counterpart.registerTranslations('pl', { uploadWidget: localePL });

function renderQueueRow(file, i) {
  let badge = null;
  if (file.get('uploading')) {
    badge = <span className="badge style-accent-light">{file.get('progress', 0)}%</span>;
  } else if (file.get('completed')) {
    badge = <span className="badge style-accent">100%</span>;
  }

  let name = file.get('name', '');
  if (name.length > 20) {
    name = `${name.substr(0, 20)}...`;
  }

  return (
    <tr key={file.get('id')}>
      <td className="text-right">{i + 1}.</td>
      <td>{name}</td>
      <td className="text-right">{filesize(file.get('size', 0))}</td>
      <td>{badge}</td>
    </tr>
  );
}

const UploadWidget = React.createClass({
  propTypes: {
    repository: React.PropTypes.object.isRequired,
    queues: React.PropTypes.object,
  },

  getInitialState() {
    return {
      loadingState: null,
      loadingError: false,
      recordRepository: null,
      uploadQueue: List(),
    };
  },

  getQueue() {
    const queues = this.props.queues || OrderedMap();
    const repositoryQueues =
      queues.filter(
        queue => queue.get('repository') === this.props.repository.get('id')
      );
    const lastRepositoryQueue = repositoryQueues.last() || List();
    return lastRepositoryQueue.get('files', List());
  },

  renderDropzone() {
    return (
      <Dropzone className="card style-primary upload-dropzone"
        onDrop={files => UploadDomain.upload(this.props.repository.get('id'), files)}
      >
        <div className="card-body">
          <form className="upload-dropzone" ref="uploadButton" className="upload-button">
            <Translate content="uploadWidget.uploadInstructions" component="h3" />
          </form>
        </div>
      </Dropzone>
    );
  },

  renderQueue() {
    const queue = this.getQueue();

    if (!queue.count()) {
      return null;
    }

    const cardBodyCN = classnames({
      'card-body': true,
      'no-padding': true,
      'height-10': queue.count() > 7,
      nano: queue.count() > 7,
    });

    return (
      <div className="card">
        <div className={cardBodyCN}>
          <div className="nano-content">
            <table className="table">
              <thead>
              <tr>
                <th />
                <Translate content="uploadWidget.tableFileName" component="th" />
                <Translate content="uploadWidget.tableFileSize" component="th"
                  className="text-right"
                />
                <Translate content="uploadWidget.tableStatus" component="th"
                  style={{ width: '20ex' }}
                />
              </tr>
              </thead>
              <tbody>
              { queue.map(renderQueueRow).toJS() }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  },

  render() {
    return (
      <section>
        <div className="section-body">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2">
              {this.renderDropzone()}
              {this.renderQueue()}
            </div>
          </div>
        </div>
      </section>
    );
  },
});

export default connect(
  UploadWidget,
  { queues: UploadDomain },
);
