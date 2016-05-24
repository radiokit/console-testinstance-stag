import React from 'react';
import connect from 'immview-react-connect';

// data
import UploadDomain from '../../../services/UploadDomain';

// lang
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import localePL from './upload_indicator_widget_pl';
import localeEN from './upload_indicator_widget_en';

Counterpart.registerTranslations('en', { uploadIndicatorWidget: localeEN });
Counterpart.registerTranslations('pl', { uploadIndicatorWidget: localePL });

const UploadQueue = ({ queue }) => (
  <li
    className="dropdown-progress"
>
    <div className="dropdown-label">
      <span className="text-light">{queue.get('name', '')}</span>
    </div>
    <div className="progress">
      <div className="progress-bar progress-bar-danger"
        style={{ width: `${queue.get('progress', 0).toString()}%` }}
      ></div>
    </div>
  </li>
);

UploadQueue.propTypes = {
  queue: React.PropTypes.object,
};

const NoUploadQueuesIndicator = () => (
  <li className="dropdown-progress">
    <div className="dropdown-label">
      <Translate className="text-light" content="uploadIndicatorWidget.none" />
    </div>
  </li>
);

const UploadIndicatorWidget = props => {
  const list = props.queues.toList();
  return (
    <ul className="UploadIndicatorWidget list">
      {
        list.count()
          ? list.map((queue, key) => (<UploadQueue key={key} queue={queue} />)).toJS()
          : (<NoUploadQueuesIndicator />)
      }
    </ul>
  );
};

UploadIndicatorWidget.propTypes = {
  queues: React.PropTypes.object,
};

export default connect(
  UploadIndicatorWidget,
  { queues: UploadDomain },
  data => ({
    queues: data.get('queues').filter(queue => !queue.get('completed')),
  })
);
