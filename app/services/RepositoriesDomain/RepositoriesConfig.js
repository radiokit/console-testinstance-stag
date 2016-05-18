export const app = 'vault';
export const model = 'Data.Record.Repository';
export const key = 'RepositoriesDomain';
export const readFields = [
  'id',
  'name',
  'tag_items',
];
export const readJoins = [
  'tag_items',
];
