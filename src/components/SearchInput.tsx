import React from 'react'

export const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  handleSearchInputChange,
  handleSearchButtonClick,
  handleKeyPress,
}) => {
  return (
    <div className="input-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Please, enter a cat breed"
        className="input-field"
      />
      <button onClick={handleSearchButtonClick} className="gradient-button">
        Search
      </button>
    </div>
  )
}

interface SearchInputProps {
  searchTerm: string
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSearchButtonClick: () => void
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void
}
