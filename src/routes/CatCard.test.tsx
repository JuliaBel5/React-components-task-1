import { render } from '@testing-library/react'
import { CatCard } from './CatCard'

test('displays loading indicator while fetching data', async () => {
  // to be defined

  // Render the CatCard component
  const { getByTestId } = render(<CatCard />)

  // Assert that the loading indicator is present
  const loadingIndicator = getByTestId('loading-indicator')
  expect(loadingIndicator).toBeInTheDocument()
})
