import React from 'react'

const Header = ({course}) => <h1>{ course.name }</h1>
const Content = ({parts}) => parts.map((p, i) => <Part key={i} part={p}/>)
const Part = ({part}) => <div>{part.name} : {part.exercises}</div>
const Total = ({parts}) => <div><b>total of {parts.reduce((acc, part) => acc + part.exercises, 0)} exercises</b></div>

const Course = ({ course }) => (
  <div>
    <Header course={course}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
  </div>
)

export default Course