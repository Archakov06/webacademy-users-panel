const initialState = {
  showAddDialog: false,
  dialogType: '',
  tableIsLoading: true,
  devMode: false,
}

export default function currentStore(state = initialState, action) {

  switch (action.type) {
    case 'SHOW_ADD_DIALOG':
      return {
        ...state,
        showAddDialog: action.payload.show,
        dialogType: action.payload.type
      }
    case 'TABLE_IS_LOADING':
      return {
        ...state,
        tableIsLoading: action.payload,
      }
    default:
      return state;
  }

}
