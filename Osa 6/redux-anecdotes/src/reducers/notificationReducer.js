const initialNotification = ''

export const notify = (content) => {
  return {
    type: 'NOTIFICATION',
    data: content
  }
}

export const removeNotification = () => {
  return {
    type: 'RM_NOTIFICATION',
    data: ''
  }
}

const reducer = (state = initialNotification, action) => {
  switch(action.type) {
    case 'NOTIFICATION':
      return action.data
    case 'RM_NOTIFICATION':
      return action.data
    default: return state
  } 
}

export default reducer