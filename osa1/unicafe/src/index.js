import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = ({text}) => <h1>{text}</h1>

const Button = ({obj}) => <button onClick={obj.handleClick}>{obj.name}</button>

const Buttons = ({feedback}) => feedback.map((obj, i) =>
  <Button key={i} obj={obj} />
)

const StatisticLine = ({text, value}) =>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

const Stats = ({feedback, voteCount}) => {
  const totalPoints = feedback.reduce((acc, obj) =>
    obj.points * obj.votes + acc,
    0
  )

  const positiveVotes = feedback.find(obj => obj.name === 'good').votes
  
  return(
    <table>
      <tbody>
        {feedback.map((obj, i) => <StatisticLine key={i} text={obj.name} value={obj.votes} />)}
        <StatisticLine text='all' value={voteCount} />
        <StatisticLine text='average' value={+(totalPoints / voteCount).toFixed(3)} />
        <StatisticLine text='positive' value={+(positiveVotes / voteCount * 100).toFixed(3) + '%'} />
      </tbody>
    </table>
  )
}

const Statistics = ({feedback}) => {
  const voteCount = feedback.reduce((acc, obj) => acc + obj.votes, 0)

  return(
    <div>
      <h1>statistics</h1>
      { voteCount > 0
        ? <Stats feedback={feedback} voteCount={voteCount} />
        : <p>No feedback given yet</p>
      }
    </div>
  )
}

const App = () => {
  const [good, setGood] = React.useState(0)
  const [neutral, setNeutral] = React.useState(0)
  const [bad, setBad] = React.useState(0)

  const feedback = [
    {
      name: 'good',
      votes: good,
      points: 1,
      handleClick: () => setGood(good + 1)
    },
    {
      name: 'neutral',
      votes: neutral,
      points: 0,
      handleClick: () => setNeutral(neutral + 1)
    },
    {
      name: 'bad',
      votes: bad,
      points: -1,
      handleClick: () => setBad(bad + 1)
    },
  ]

  return(
    <div>
      <Header text = 'give feedback' />
      <Buttons feedback={feedback} />
      <Statistics feedback={feedback} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

