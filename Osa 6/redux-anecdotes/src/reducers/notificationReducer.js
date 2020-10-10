const initialNotification = ''

export const notify = (content) => {
  return {
    type: 'NOTIFICATION',
    data: { content }
  }
}

const reducer = (state = initialNotification, action) => {
  switch(action.type) {
    case 'NOTIFICATION':
      return state.data
    default: return state
  } 
}

export default reducer