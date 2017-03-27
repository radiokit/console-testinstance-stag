import connect from 'immview-react-connect';
import AutoDJShuffleForm from './autodj_shuffle_form.jsx';
import RepositoriesDomain from '../../../../services/RepositoriesDomain';

const AutoDJShuffleFormConnected = connect(
  AutoDJShuffleForm,
  RepositoriesDomain,
  (RepositoriesDomainState, { availableAccounts }) => {
    availableAccounts.forEach(
      userAccount => {
        RepositoriesDomain.loadRepositories({
          userAccountId: userAccount.get('id'),
          maxAge: 10 * 60 * 1000,
        });
      }
    );

    const repositories = RepositoriesDomainState.get('entities');
    const isLoading = RepositoriesDomainState.get('loading');

    const tags = repositories
      .toList()
      .map(
        repository =>
          getTagsOfRepository(repository)
            .map(
              mergeRepositoryIntoTagName.bind(null, repository)
            )
      )
      .flatten(true);

    return {
      isLoading,
      tags,
    };
  }
);

export default AutoDJShuffleFormConnected;

function getTagsOfRepository(repository) {
  return repository.get('tag_items');
}

function mergeRepositoryIntoTagName(repository, tag) {
  return tag.set('name', `${repository.get('name', '')} / ${tag.get('name')}`);
}
