import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import nock from 'nock'
import { MemoryRouter, Route } from 'react-router-dom'
import { CatCard } from '../../routes/CatCard'
import { CatList } from '../CatList/CatList'
import { CatItem } from './CatItem'

describe('CatItem', () => {
  it('triggers an additional API call on click', async () => {
    const cat = {
      id: '1',
      name: 'Test Cat',
      description: 'Test description',
      temperament: 'Test temperament',
    }

    // Mocking the API response
    nock('https://2ff5030c446d8ca4.mokky.dev')
      .get(`/breeds/${cat.id}`)
      .reply(200)

    render(
      <MemoryRouter>
        <CatList />
      </MemoryRouter>,
    )

    const catItem = screen.getByTestId('cat-item')

    fireEvent.click(catItem)

    await waitFor(() => {
      expect(nock.isDone()).toBe(true)
    })
  })
})
