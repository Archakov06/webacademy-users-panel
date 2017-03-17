export const showAddDialogAction = (type = 'add') => {
  return {
    type: 'SHOW_ADD_DIALOG',
    payload: {
      show: true,
      type: type,
    }
  }
}

export const hideAddDialogAction = (type = 'add') => {
  return {
    type: 'SHOW_ADD_DIALOG',
    payload: {
      show: false,
      type: type,
    }
  }
}

export const tableIsLoading = (b) => {
  return {
    type: 'TABLE_IS_LOADING',
    payload: b
  }
}
