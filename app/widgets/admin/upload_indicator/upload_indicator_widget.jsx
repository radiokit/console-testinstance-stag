import React from 'react';
import connect from 'immview-react-connect';
//data
import uploadDomain from '../../../services/upload/uploadDomain';
//ui
import Progress from './../progress_bar_widget.jsx';
//lang
import Translate from 'react-translate-component';
import Counterpart from 'counterpart';
import localePL from './upload_indicator_widget_pl';
import localeEN from './upload_indicator_widget_en';

Counterpart.registerTranslations("en", {uploadIndicatorWidget: localeEN});
Counterpart.registerTranslations("pl", {uploadIndicatorWidget: localePL});

const UploadQueue = ({queue}) => (
  <li
    className="dropdown-progress">
    <div className="dropdown-label">
      <span className="text-light">{queue.get('name', '')}</span>
    </div>
    <div className="progress">
      <div className="progress-bar progress-bar-danger"
           style={{width: queue.get('progress', 0).toString() + '%'}}></div>
    </div>
  </li>
);

const NoUploadQueuesIndicator = () => (
  <li className="dropdown-progress">
    <div className="dropdown-label">
      <Translate className="text-light" content="uploadIndicatorWidget.none"/>
    </div>
  </li>
);

const UploadIndicatorWidget = props => {
  const list = props.queues.toList();
  return (
    <ul className="UploadIndicatorWidget list">
      {
        list.count()
          ? list.map((queue, key)=> (<UploadQueue key={key} queue={queue}/>)).toJS()
          : (<NoUploadQueuesIndicator/>)
      }
    </ul>
  );
};

export default connect(
  UploadIndicatorWidget,
  {queues: uploadDomain.view},
  data => ({
    queues: data.get('queues').filter(queue => !queue.get('completed')),
  })
);
