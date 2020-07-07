/* eslint-disable react/prop-types */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Header = ({course}) => <h1>{ course.name }</h1>
const Content = ({parts}) => parts.map((p, i) => <Part key={i} part={p}/>)
const Part = ({part}) => <div>{part.name} : {part.exercises}</div>
const Total = ({parts}) => <div>Number of exercises {parts.reduce((acc, part) => acc + part.exercises, 0)}</div>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
