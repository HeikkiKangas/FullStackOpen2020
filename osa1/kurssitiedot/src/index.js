/* eslint-disable react/prop-types */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Header = ({course}) => <h1>{ course }</h1>
const Content = ({data}) => {
  console.log(data)
  return(
    data.map((d, i) => <Part key={i} data={d}/>)
  )
}
const Part = ({data}) => <div>{data.part} : {data.exercises}</div>
const Total = (props) => <div>Number of exercises {props.count}</div>

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content data={[
        { part: part1, exercises: exercises1 },
        { part: part2, exercises: exercises2 },
        { part: part3, exercises: exercises3 }
      ]}/>
      <Total count={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
