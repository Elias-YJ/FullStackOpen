import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const avg = (props.good - props.bad)/all
  const pos = props.good/all*100
  return(
    <div>
      <h1>statistics</h1>
      <p>
        good {props.good} <br></br>
        neutral {props.neutral} <br></br>
        bad {props.bad} <br></br>
        all {all} <br></br>
        average {avg} <br></br>
        positive {pos} % <br></br>
      </p>
    </div>)
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button onClick={handleGood} text='good' />
        <Button onClick={handleNeutral} text='neutral' />
        <Button onClick={handleBad} text='bad' />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


ReactDOM.render(<App />,
document.getElementById('root'))

