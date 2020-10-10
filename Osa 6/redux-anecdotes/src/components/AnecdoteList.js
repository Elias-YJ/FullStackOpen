import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({notification, anecdotes, filter}) => anecdotes)
  const filter = useSelector(({notification, anecdotes, filter}) => filter)
  const dispatch = useDispatch()
  
  const addVote = anecdote => {
    dispatch(voteAnecdote(anecdote))
    dispatch(notify(`You liked "${anecdote.content}"`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }
  
  return (
    <div>
        {anecdotes.sort((a,b) => b.votes-a.votes).filter(anecdote => anecdote.content.includes(filter)).map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={addVote} />
        )}
    </div>
  )
}

export default AnecdoteList
