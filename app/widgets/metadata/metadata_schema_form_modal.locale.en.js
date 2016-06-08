export default {
  header: 'Add metadata field',
  action: {
    proceed: 'Add metadata field',
    close: 'Close',
    cancel: 'Cancel',
  },
  message: {
    progress: 'Adding metadata...',
    acknowledgement: 'Metadata field was added succesfully.',
  },
  form: {
    name: {
      label: 'Field name',
      hint: 'Choose any name that will describe contents of this field, e.g. \'composer\'.',
    },
    key: {
      label: 'Key',
      hint: 'Unique key describing role of this field for the system.',
    },
    kind: {
      label: 'Value type',
      values: {
        string: 'Text (one line)',
        db: 'Decibels',
        integer: 'Number (integer)',
        text: 'Text (multiline)',
        float: 'Number (with decimal part)',
        date: 'Date',
        time: 'Time',
        datetime: 'Date & Time',
        url: 'URL',
        duration: 'Duration',
        waveform: 'Waveform',
        image: 'Image',
        file: 'File',
      },
    },
  },
};
