import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote.id)}>vote</button>
        </div>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  
  const addVote = (id) => {
    dispatch(vote(id))
  }
  
  return (
    <div>
        {anecdotes.sort((a,b) => b.votes-a.votes).map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={addVote} />
        )}
    </div>
  )
}

export default AnecdoteList
