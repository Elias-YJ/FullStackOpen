import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import ExpandableBlog from './ExpandableBlog'
import AddBlog from './AddBlog'

describe('<AddBlog/>', () => {
  let component

  const testData = {
    title: 'Teekkarin työkirja',
    author: 'Tekkijäbä',
    url: 'www.tek.fi'
  }

  const addBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <AddBlog addBlog={addBlog}/>
    )
  })
  test('When creating blog <AddBlog/> calls handle with correct data', () => {
    const title = component.container.querySelector('.title')
    const author = component.container.querySelector('.author')
    const url = component.container.querySelector('.url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: testData.title}
    })
    fireEvent.change(author, {
      target: { value: testData.author}
    })
    fireEvent.change(url, {
      target: { value: testData.url}
    })

    fireEvent.submit(form)
    for (const property in testData) {
      expect(addBlog.mock.calls[0][0][property]).toBe(testData[property])
    }
    
  })
})