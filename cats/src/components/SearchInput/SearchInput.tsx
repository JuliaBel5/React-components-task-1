/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from "next/router";
import {
  searchResultsActions,
  useAppDispatch,
  useAppSelector,
} from '../../features/searchResultsSlice'
import { searchActions } from '../../features/searchSlice'
import { Results, useLazyGetCatsQuery } from '../../services/catApi'

export const SearchInput: React.FC<object> = () => {
  const { searchTerm } = useAppSelector((state) => state.search)
  const inputRef = useRef<HTMLInputElement>(null)
  const { currentPage, limit } = useAppSelector((state) => state.searchResults)
  const dispatch = useAppDispatch()
  const router = useRouter();

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        urlSearchTerm: searchTerm.trim(),
        page: currentPage.toString(),
        limit: limit.toString(),
      },
    });
  }, [currentPage, limit, searchTerm]);

  const handleSearchButtonClick = () => {
    const value = inputRef?.current?.value ?? ''

    dispatch(searchResultsActions.setCurrentPage(1))
    dispatch(searchActions.setSearchTerm(value))

    router.push({
      pathname: router.pathname,
      query: {
        urlSearchTerm: value.trim(),
        page: 1,
        limit: limit.toString(),
      },
    });
  }

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') handleSearchButtonClick()
  }

  return (
    <div className="input-container">
      <input
        ref={inputRef}
        type="text"
        defaultValue={searchTerm}
        onKeyDown={handleKeyPress}
        placeholder="Please, enter a cat breed"
        className="input-field"
      />
      <button onClick={handleSearchButtonClick} className="gradient-button">
        Search
      </button>
    </div>
  )
}
