const initialState = {
  showAddDialog: false,
  dialogType: '',
}

export default function currentStore(state = initialState, action) {

  switch (action.type) {
    case 'SHOW_ADD_DIALOG':
      return {
        ...state,
        showAddDialog: action.payload.show,
        dialogType: action.payload.type
      }
    default:
      return state;
  }

}
