import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const App = (props) => {
  const [selected, setSelected] = React.useState(0)
  const [votes, setVotes] = React.useState(new Array(props.anecdotes.length).fill(0))
  const handleVote = () => {
    const arrayCopy = [...votes]
    arrayCopy[selected] += 1
    setVotes(arrayCopy)
  }
  const handleNextAnecdote = () => setSelected(Math.floor(Math.random() * props.anecdotes.length))

  const mostVotedIndex = () => {
    const maxVotes = Math.max(...votes)
    return votes.findIndex(num => num === maxVotes)
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>{votes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      { votes.reduce((acc, obj) => acc + obj) > 0
        ? <>
          <h1>Anecdote with most votes</h1>
          <p>{props.anecdotes[mostVotedIndex()]}</p>
          </>
        : null
      }
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
  document.getElementById('root')
);
