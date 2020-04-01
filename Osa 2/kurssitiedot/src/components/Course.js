import React from 'react'

const Header = ({course}) => {
    return (
      <>
        <h2>{course.name}</h2>
      </>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
  
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    return (
      <>
        <b>total of exercises {parts.reduce((acc, cur_part) => acc + cur_part.exercises, 0)}</b>
      </>
    )
  }
  
  const Course = ({courses}) => {
    return (
      <>
        {courses.map(course =>
          <div key={course.id}>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        )}
      </>
    )
  }

  export default Course