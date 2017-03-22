const API = {
  DOMAIN: 'u2743.indigo.elastictech.org',
  PROTOCOL: 'http'
};

export const fetchz = (method, PATH, callback) => {
  fetch(`${API.PROTOCOL}://${API.DOMAIN+PATH}`, {
    method: method,
    headers: {'accept':'application/json'}
  })
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    if (callback) callback(json);
  });
}

export const fetchPOST = (PATH, data, callback) => {

  fetch(`${API.PROTOCOL}://${API.DOMAIN+PATH}`, {
    method: 'POST',
    headers: {'accept':'application/json'},
    body: JSON.stringify(data)
  })
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    if (callback) callback(json);
  });
}
