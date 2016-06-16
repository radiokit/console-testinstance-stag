const form = {
  name: {
    label: 'Nazwa pola',
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
      image: 'Obraz',
      file: 'Plik',
    },
  },
};

export default {
  mode: {
    create: {
      header: 'Dodaj pole metadanych',
      action: {
        proceed: 'Dodaj',
        close: 'Close',
        cancel: 'Cancel',
      },
      message: {
        acknowledgement: 'Dodano pole metadanych',
        progress: 'Dodawanie pól metedanych...',
      },
      form,
    },
    update: {
      header: 'Edytuj pole metadanych',
      action: {
        proceed: 'Edytuj',
        close: 'Close',
        cancel: 'Cancel',
      },
      message: {
        acknowledgement: 'Edytowano pole metadanych',
        progress: 'Edytowanie pól metedanych...',
      },
      form,
    },
  },
};
