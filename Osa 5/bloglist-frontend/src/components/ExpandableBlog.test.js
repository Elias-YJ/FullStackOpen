import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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
  const mockHandlerLike = jest.fn()


  beforeEach(() => {
    component = render(
      <ExpandableBlog blog={testBlog} userCheck={mockHandler} addLike={mockHandlerLike} removeBlog={mockHandler}/>
    )
  })
  test('renders title and author', () => {
    expect(component.container).toHaveTextContent(
      'Kvanttien salat Mikko Möttönen'
    )
  })
  test('does not render extra info', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
  test('after clicking button, all info is shown', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')

    const likes = component.container.querySelector('.likes')
    expect(likes).toHaveTextContent(
      'like'
    )
  })
  test('handler for like is registered correctly', () => {
  const button = component.getByText('view')
  fireEvent.click(button)

  const like = component.getByText('like')
  fireEvent.click(like)
  fireEvent.click(like)
  expect(mockHandlerLike.mock.calls).toHaveLength(2)
  })
})
