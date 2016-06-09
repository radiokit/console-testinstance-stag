export const app = 'plumber';
export const model = 'Media.Input.File.RadioKit.Vault';
export const key = 'ScheduleDomain';
export const rangeKey = `${key}:range`;
export const updateKey = `${key}:update`;
export const readFields = [
  'id',
  'name',
  'start_at',
  'stop_at',
  'cue_in_at',
  'cue_out_at',
  'references',
  'file',
];
export const updateFields = [
  'file',
  'name',
  'start_at',
  'stop_at',
  'cue_in_at',
  'cue_out_at',
];
