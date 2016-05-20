import React from 'react';
import connect from 'immview-react-connect';
import { debounce } from 'lodash';
import RepositoryPicker from './repository_picker.jsx';
import RepositoriesDomain from '../../../../services/RepositoriesDomain';

const searchFiles = debounce(
  query => RepositoriesDomain.searchRepositories(query, { maxAge: 60000 }),
  1000
);

const VaultRepositoryPicker = props => (
  <RepositoryPicker
    {...props}
    onInputChange={searchFiles}
  />
);

export default connect(
  VaultRepositoryPicker,
  RepositoriesDomain,
  (data) => ({
    repositories: data.get('entities'),
  })
);
