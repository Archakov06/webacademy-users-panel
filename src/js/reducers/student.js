const initialState = {
  options: [
      { value: 'search', label: 'Поисковик' },
      { value: 'vk', label: 'Вконтакте' },
      { value: 'instagram', label: 'Инстаграм' },
      { value: 'friends', label: 'От друзей' },
      { value: 'radio', label: 'Радио' },
      { value: 'tv', label: 'ТВ' }
  ],
  months: [
    { value: '1', label: 'Январь' },
    { value: '2', label: 'Февраль' },
    { value: '3', label: 'Март' },
    { value: '4', label: 'Апрель' },
    { value: '5', label: 'Май' },
    { value: '6', label: 'Июнь' },
    { value: '7', label: 'Июль' },
    { value: '8', label: 'Август' },
    { value: '9', label: 'Сентябрь' },
    { value: '10', label: 'Октябрь' },
    { value: '11', label: 'Ноябрь' },
    { value: '12', label: 'Декаберь' },
  ],
  sources: [

  ],
  filterByMonth: new Date().getMonth() + 1,
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
  chartData: {
    series: []
  },
  users: [],
  monthsSelected: []
}

export default function studentStore(state = initialState, action) {

  switch (action.type) {
    case 'SET_SOURCE':
      return {
        ...state,
        sources: action.payload,
      }
    case 'CLEAR_SOURCE':
      return {
        ...state,
        sources: []
      }
      case 'SET_USER':
        return {
          ...state,
          sources: action.payload.sources,
          user: action.payload,
          monthsSelected: action.payload.month
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
      case 'SET_MONTH':
        return {
          ...state,
          monthsSelected: action.payload,
        }
      case 'SET_FILTER':
        return {
          ...state,
          filterByMonth: action.payload,
        }
      case 'SET_CHART_DATA':
        return {
          ...state,
          chartData: {
            series: action.payload
          }
        }
    default:
      return state;
  }

}
