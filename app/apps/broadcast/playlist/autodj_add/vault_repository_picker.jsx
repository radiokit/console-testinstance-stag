import React from 'react';
import connect from 'immview-react-connect';
import { debounce } from 'lodash';

import RepositoriesDomain from '../../../../services/RepositoriesDomain';

const searchFiles = debounce(
  query => RepositoriesDomain.searchFiles(query, { maxAge: 60000 }),
  1000
);

const VaultRepositoryPicker = React.createClass({
  propTypes: {
    selectedRepositoryId: React.PropTypes.string,
    onChange: React.PropTypes.func,
    // connector
    repositories: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {};
  },

  handleInputChange(e) {
    const { value } = e.target;
    this.setState({ query: value });
    console.log('searching for', value);
    searchFiles(value);
  },

  render() {
    return (
      <div className="VaultRepositoryPicker">
        <input onChange={this.handleInputChange} value={this.state.query} />
        <pre>{
          JSON.stringify(this.props.repositories.toJS(), null, '  ')
        }</pre>
      </div>
    );
  },
});

export default connect(
  VaultRepositoryPicker,
  RepositoriesDomain,
  (data) => ({
    repositories: data.get('entities'),
  })
);
