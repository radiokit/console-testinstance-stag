export const app = 'vault';
export const key = 'FilesDomain';
export const searchKey = `${key}:search`;
export const searchPhraseKey = `${searchKey}:phrase`;
export const model = 'Data.Record.File';
export const readFields = [
  'id',
  'name',
  'stage',
  'file_size',
  'updated_at',
];
export const updateFields = [
  'name',
  'stage',
  'references',
  'extra',
  'destroy_at',
];
