export const setMonth = (items) => {
  return {
    type: 'SET_MONTH',
    payload: items
  }
}

export const setFilter = (data) => {
  return {
    type: 'SET_FILTER',
    payload: data
  }
}

export const setChart = (data) => {
  return {
    type: 'SET_CHART_DATA',
    payload: data
  }
}

export const setSource = (items) => {
  return {
    type: 'SET_SOURCE',
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
    item.sources = item.sources.length ? JSON.parse(item.sources) : [];
    item.month = item.month.length ? JSON.parse(item.month) : [];
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
