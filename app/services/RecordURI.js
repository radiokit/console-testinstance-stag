function to(app, model, id) {
  return `record://${app}/${model}/${id}`;
}

function from(uri) {
  const [, , app, model, id] = uri.split('/');
  return { app, model, id };
}

export default {
  to,
  from,
};
