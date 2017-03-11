export const setSource = (items) => {
  return {
    type: 'ADD_SOURCE',
    payload: items
  }
}

export const clearSource = () => {
  return {
    type: 'CLEAR_SOURCE'
  }
}

export const setUser = (data) => {
  return {
    type: 'SET_USER',
    payload: data
  }
}

export const addUser = (data) => {
  return {
    type: 'ADD_USER',
    payload: data
  }
}

export const setUsers = (data) => {

  data.forEach(function(item){
    item.sources = JSON.parse(item.sources)
  });

  return {
    type: 'SET_USERS',
    payload: data
  }
}

export const removeUser = (uid) => {
  return {
    type: 'REMOVE_USER',
    payload: uid
  }
}
