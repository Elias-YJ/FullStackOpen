const initialFilter = ''

export const filter = (content) => {
  return {
    type: 'FILTER',
    data: content
  }
}

const reducer = (state = initialFilter, action) => {
  switch(action.type) {
    case 'FILTER':
      return action.data
    default: return state
  } 
}

export default reducer