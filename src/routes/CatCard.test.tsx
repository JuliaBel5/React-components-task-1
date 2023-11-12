import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import nock from 'nock'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { App } from '../App'
import { CatCard } from './CatCard'
import { ErrorPage } from './error-page'
import { NotFound } from './NotFound'

const mockItems = [
  {
    id: 1,
    name: 'Test Cat 1',
    description: 'Test description 1',
    temperament: 'Test temperament 1',
  },
  {
    id: 2,
    name: 'Test Cat 2',
    description: 'Test description 2',
    temperament: 'Test temperament 2',
  },
]

describe('CatList', () => {
  /*  it('checks that a loading indicator is displayed while fetching data', async () => {
    nock('https://2ff5030c446d8ca4.mokky.dev')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/breeds?name=*&page=1&limit=6')
      .reply(200, {
        meta: {
          total_items: 67,
          total_pages: 12,
          current_page: 1,
          per_page: 6,
          remaining_count: 61,
        },
        items: mockItems,
      })

    nock('https://2ff5030c446d8ca4.mokky.dev')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/breeds/1')
      .reply(200, {
        id: 1,
        name: 'Test Cat 1',
        description: 'Test description 1',
        temperament: 'Test temperament 1',
        image: {
          id: 'ozEvzdVM-',
          width: 1200,
          height: 800,
          url: 'https://cdn2.thecatapi.com/images/ozEvzdVM-.jpg',
        },
      })

    const router = createMemoryRouter([
      {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'cat/:catId',
            element: <CatCard />,
          },
        ],
      },
      { path: '*', element: <NotFound /> },
    ])

    render(<RouterProvider router={router} />)

    await waitFor(async () => {
      const CatItem = screen.getByTestId('cat-1')
      fireEvent.click(CatItem)

      // Add a delay of 1 millisecond before asserting the presence of the loading indicator
      await new Promise((resolve) => setTimeout(resolve, 1))

      expect(screen.getByTestId('loading-indicator')).toBeInTheDocument()
    })
  })*/

  it('should close CatCard on Close button', async () => {
    nock('https://2ff5030c446d8ca4.mokky.dev')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/breeds?name=*&page=1&limit=6')
      .reply(200, {
        meta: {
          total_items: 67,
          total_pages: 12,
          current_page: 1,
          per_page: 6,
          remaining_count: 61,
        },
        items: mockItems,
      })

    nock('https://2ff5030c446d8ca4.mokky.dev')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/breeds/1')
      .reply(200, {
        id: 1,
        name: 'Test Cat 1',
        description: 'Test description 1',
        temperament: 'Test temperament 1',
        image: {
          id: 'ozEvzdVM-',
          width: 1200,
          height: 800,
          url: 'https://cdn2.thecatapi.com/images/ozEvzdVM-.jpg',
        },
      })

    const router = createMemoryRouter([
      {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'cat/:catId',
            element: <CatCard />,
          },
        ],
      },
      { path: '*', element: <NotFound /> },
    ])

    render(<RouterProvider router={router} />)

    await waitFor(async () => {
      expect(screen.getByText('Test Cat 2')).toBeInTheDocument()
    })

    await waitFor(async () => {
      const catCardElement = screen.getByTestId('cat-1')
      fireEvent.click(catCardElement)
    })

    await waitFor(async () => {
      expect(await screen.findByTestId('cat-card'))
      const catCardElementClose = await screen.findByTestId('close-Test Cat 1')
      fireEvent.click(catCardElementClose)
    })

    expect(screen.queryByTestId('cat-card')).toBeNull()
  })
})
