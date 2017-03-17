export const addTask = (text) => {
  return {
    type: 'ADD_TASK',
    payload: {
      complete: false,
      text: text
    }
  }
}

export const setTasks = (json) => {
  return {
    type: 'SET_TASKS',
    payload: json
  }
}

export const removeTask = (id) => {
  return {
    type: 'REMOVE_TASK',
    payload: id
  }
}
