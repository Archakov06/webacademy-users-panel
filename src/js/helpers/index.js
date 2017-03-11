const API = {
  DOMAIN: 'api.dev',
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
    callback(json);
  });
}

export const fetchPOST = (PATH, data, callback) => {

  fetch(`${API.PROTOCOL}://${API.DOMAIN+PATH}`, {
    method: 'POST',
    headers: {'content-Type':'application/json', 'accept':'application/json'},
    body: JSON.stringify(data)
  })
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    callback(json);
  });
}
