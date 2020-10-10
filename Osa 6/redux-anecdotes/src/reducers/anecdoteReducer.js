import anecdoteService from '../services/anecdotes'

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const voted = await anecdoteService.addVote(anecdote)
    dispatch({
      type: 'VOTE',
      data: voted
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const voted = action.data
      return state.map(anecdote => 
        anecdote.id !== voted.id ? anecdote : voted
      )
    default: return state
  } 
}

export default reducer