const initialNotification = { heading:'', content: '', alertType:'', timeoutId: null }

export const setNotification = (heading, content, alertType, time) => {
  return dispatch => {
    const timeoutId = setTimeout(() => dispatch({
      type: 'RM_NOTIFICATION',
      data: {
        heading: '',
        content: '',
        alertType: '',
        timeoutId: null
      }
    }), 1000*time)
    dispatch({
      type: 'NOTIFICATION',
      data: {
        heading,
        content,
        alertType,
        timeoutId,
      }
    })
  }
}

const reducer = (state = initialNotification, action) => {
  switch(action.type) {
  case 'NOTIFICATION':
    if (state.timeoutId) {
      clearTimeout(state.timeoutId)
    }
    return action.data
  case 'RM_NOTIFICATION':
    return action.data
  default: return state
  }
}

export default reducer