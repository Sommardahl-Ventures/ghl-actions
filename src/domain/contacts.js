function removeEmpty(obj) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
}

function cleanClientObj(obj) {
  const attributePrefix = "attribute_";
  const attributes = {};
  Object.keys(obj)
    .filter((x) => x.indexOf(attributePrefix) > -1)
    .forEach((key) => {
      const newKey = key.replace(attributePrefix, "");
      attributes[newKey] = obj[key];
    });

  const res = {
    name: obj.name,
    contactFirstName: obj.contactFirstName,
    contactLastName: obj.contactLastName,
    contactEmail: obj.contactEmail,
    attributes,
  };

  return removeEmpty(res);
}

async function findContact(api, fieldKey, fieldValue, createIfNotExist) {
  const searchClient = { [fieldKey]: fieldValue };
  const query = new URLSearchParams(searchClient).toString();
  let clients = await api.get(`contacts/lookup?${query}`);

  if (createIfNotExist & (clients.length === 0)) {
    //clients = [await insertClient(knex, searchClient)];
  }

  return clients.length > 0 ? clients[0] : {};
}

module.exports = {
  findContact,
};
