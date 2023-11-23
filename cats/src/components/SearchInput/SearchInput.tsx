/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useRouter } from "next/router";
import {
  searchResultsActions,
  useAppDispatch,
  useAppSelector,
} from '../../features/searchResultsSlice'
import { searchActions } from '../../features/searchSlice'
import { CatBreed, useLazyGetCatsQuery } from '../../services/catApi'


export const SearchInput: React.FC<object> = () => {
  const { searchTerm } = useAppSelector((state) => state.search)
  const { currentPage, limit } = useAppSelector((state) => state.searchResults)
  const dispatch = useAppDispatch()


  const [getCats, { data: cats }] = useLazyGetCatsQuery()


  async function getServerSideProps() {
    const cats = getCats({ page: currentPage, limit, breed: searchTerm.trim() })

    return { props: { cats } }
  }

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
    console.log(router.query)
  }, [currentPage, limit, searchTerm]);

  useEffect(() => {
    // getCats({ page: currentPage, limit, breed: searchTerm.trim() })
    getServerSideProps()
  }, [currentPage, limit])




  useEffect(() => {
    if (cats) {
      dispatch(searchResultsActions.setSearchResults(cats.items))
      dispatch(searchResultsActions.setTotalPages(cats.meta.total_pages))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cats])

  const handleSearchInputChange = (event: { target: { value: string } }) => {
    dispatch(searchActions.setSearchTerm(event.target.value))
  }

  const handleSearchButtonClick = () => {
    localStorage.setItem('searchTerm', searchTerm.trim())
    dispatch(searchResultsActions.setCurrentPage(1))
    router.push({
      pathname: router.pathname,
      query: {
        urlSearchTerm: searchTerm.trim(),
        page: currentPage.toString(),
        limit: limit.toString(),
      },
    });
    getServerSideProps()
  }

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') handleSearchButtonClick()
  }

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
