import React from 'react';
import connect from 'immview-react-connect';
import RepositoryPicker from './repository_picker.jsx';
import RepositoriesDomain from '../../services/RepositoriesDomain';

export default connect(
  props => <RepositoryPicker {...props} />,
  RepositoriesDomain,
  (data) => {
    RepositoriesDomain.loadRepositories({ maxAge: 60000 });
    return {
      repositories: data.get('entities'),
    };
  }
);
