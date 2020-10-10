const initialNotification = {content: '', timeoutId: null}

export const setNotification = (content, time) => {
  return dispatch => {
    const timeoutId = setTimeout(() => dispatch({
      type: 'RM_NOTIFICATION',
      data: {
        content: '',
        timeoutId: null
      }
    }), 1000*time)
    dispatch({
      type: 'NOTIFICATION',
      data: {
        content,
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