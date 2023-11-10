import { afterEach, describe, test, vi } from 'vitest'

describe('LocalStorage Mock', () => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  }

  afterEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    localStorageMock.removeItem.mockClear()
    localStorageMock.clear.mockClear()
  })

  test('should mock localStorage getItem', () => {
    localStorageMock.getItem.mockReturnValue('mocked value')

    const result = localStorageMock.getItem('key')

    expect(result).toBe('mocked value')
    expect(localStorageMock.getItem).toHaveBeenCalledWith('key')
  })

  test('should mock localStorage setItem', () => {
    localStorageMock.setItem.mockReturnValue(undefined)

    const result = localStorageMock.setItem('key', 'value')

    expect(result).toBe(undefined)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('key', 'value')
  })
})
