const initialUser = null

export const loginUser = (user) => {
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logoutUser = () => {
  return dispatch => {
    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}

const reducer = (state = initialUser, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default: return state
  }
}

export default reducer