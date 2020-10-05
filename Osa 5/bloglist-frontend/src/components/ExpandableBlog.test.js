import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import ExpandableBlog from './ExpandableBlog'

describe('<ExpandableBlog />', () => {
  let component

  const testBlog = { 
    title: 'Kvanttien salat', 
    author: 'Mikko Möttönen', 
    url: 'www.wikipedia.org',
    likes: 100,
    user: {
      name: 'Masa Matikainen',
      username: 'mama',
      id: 'jaiw3ejf'
    }
  }

  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <ExpandableBlog blog={testBlog} userCheck={mockHandler} addLike={mockHandler} removeBlog={mockHandler}/>
    )
  })
  test('renders title and author', () => {
    expect(component.container).toHaveTextContent(
      'Kvanttien salat Mikko Möttönen'
    )
  })
  test('does not render extra info', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display:none')
  })
})
