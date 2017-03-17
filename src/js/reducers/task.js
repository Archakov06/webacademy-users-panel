const initialState = {
  items: []
}

export default function taskStore(state = initialState, action) {

  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        items: [
          ...state.items,
          action.payload
        ]
      }
    case 'SET_TASKS':
      return {
        ...state,
        items: action.payload
      }
    case 'REMOVE_TASK':
      const tasks = state.items.filter((item) => { return (item.id != action.payload) })
      return {
        ...state,
        items: tasks
      }
    default:
      return state;
  }

}
