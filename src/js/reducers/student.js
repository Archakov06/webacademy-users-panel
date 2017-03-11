const initialState = {
  options: [
      { value: 'search', label: 'Поисковик' },
      { value: 'vk', label: 'Вконтакте' },
      { value: 'instagram', label: 'Инстаграм' },
      { value: 'friends', label: 'От друзей' },
      { value: 'radio', label: 'Радио' },
      { value: 'tv', label: 'ТВ' }
  ],
  sources: [

  ],
  user: {
    firstname: '',
    lastname: '',
    age: 0,
    phone: '',
    email: '',
    experience: false,
    sources: [],
    about: ''
  },
  users: []
}

export default function studentStore(state = initialState, action) {

  switch (action.type) {
    case 'ADD_SOURCE':
      return {
        ...state,
        sources: action.payload
      }
    case 'CLEAR_SOURCE':
      return {
        ...state,
        sources: []
      }
      case 'SET_USER':
        return {
          ...state,
          user: action.payload
        }
      case 'ADD_USER':
        return {
          ...state,
          users: [
            action.payload,
            ...state.users
          ]
        }
      case 'SET_USERS':
        return {
          ...state,
          users: action.payload
        }
      case 'REMOVE_USER':

        const users = state.users.filter((item) => { return (item.id !== parseInt(action.payload)) })

        return {
          ...state,
          users: users
        }
    default:
      return state;
  }

}
