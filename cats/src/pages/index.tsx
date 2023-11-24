
import { useEffect, useState } from 'react'
//import { Link, Outlet, useSearchParams } from 'react-router-dom'
import {
  searchResultsActions,
  useAppDispatch,
  useAppSelector,
} from '../features/searchResultsSlice'
import { catApi, CatBreed, Results } from '../services/catApi'
import { CatItem } from '../components/CatItem/catItem'
import { MoonSpinner } from '../components/MoonSpinner'
import { Pagination } from '../components/Pagination/Pagination'
import { SearchInput } from '../components/SearchInput/SearchInput'
import { Select } from '../components/Select/Select'
import CatCard from "../components/CatCard";
import Link from 'next/link'
import { searchReducer, searchActions } from '../features/searchSlice'
import { useRouter } from 'next/router'
import { wrapper } from '@/store/store'

/*export async function getServerSideProps(context: { query: { page: number; limit: number; breed: string } }) { 
 
  const baseUrl = 'https://2ff5030c446d8ca4.mokky.dev/breeds'
  
    const page = context.query.page || 1;
    const limit = context.query.limit || 6;
    const breed = context.query.breed || '';
  const response = await fetch(`${baseUrl}?name=*${breed}&page=${page}&limit=${limit}`)
  const data = await response.json() as Results
    console.log(data)

    return {
      props: {
        data,
    }
  }
}*/
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    console.log(12312);

    const searchParams = new URLSearchParams(
      context.query as Record<string, string>
    );
    const breed = searchParams.get("breed") || "";
    const limit = +(searchParams.get("limit") || 6);
    const page = +(searchParams.get("page") || 1);

    console.log("DISPATCH");

    store.dispatch(
      catApi.endpoints.getCats.initiate({
        breed,
        limit,
        page,
      })
    );

   const data = await Promise.all(store.dispatch(catApi.util.getRunningQueriesThunk()));

    console.log("SERVER STATE", store.getState().catApi);

    return {
      props: {
        data
      },
    };
  }
);
export const CatList: React.FC<CatListProps> = ({data}) => {


  const router = useRouter()
  console.log(router.query.urlSearchTerm, router.query.page, router.query.limit)
  const {
    searchResults,
    currentPage,
    limit,
    totalPages,
    isLoading,
    isLoadingCats,
  } = useAppSelector((state) => state.searchResults)

  const {searchTerm} = useAppSelector((state) => state.search)
  const dispatch = useAppDispatch()
  
  const searchParams = new URLSearchParams(
    router.query as Record<string, string>
  );

  const handleLimitChange = (newLimit: number) => {
    dispatch(searchResultsActions.setLimit(newLimit))
    dispatch(searchResultsActions.setCurrentPage(1))
  }

  const [error, setError] = useState(false);

  
  if (currentPage === 1 && limit ==6 && searchTerm === '' ) {
  const breeds =
  data.items && data.items.length === 0 ? (
      <>
        <h1 className="error-message">nothing found</h1>
      </>
    ) : (
      data.items && data.items.map((cat: CatBreed) => (
        <Link
          href={`/?${searchParams}&details=${cat.id}`}
          key={cat.id}
          data-testid={`cat-${cat.id}`}
          role="link"
        >
          <CatItem cat={cat} />
        </Link>
      ))
    );
      }
 
  const breeds =
  searchResults && searchResults.length === 0 ? (
      <>
        <h1 className="error-message">nothing found</h1>
      </>
    ) : (
      searchResults && searchResults.map((cat: CatBreed) => (
        <Link
          href={`/?${searchParams}&details=${cat.id}`}
          key={cat.id}
          data-testid={`cat-${cat.id}`}
          role="link"
        >
          <CatItem cat={cat} />
        </Link>
      ))
    )


  if (error) {
    throw new Error('ММММММММММММММММРРРРР')
  }
  return (
    <div className="search-results">
      <div className="container">
        <div className="error-button" />
        <div>
          <button
            onClick={() => setError(true)}
            className="orange-gradient-button "
          >
            I don&apos;t like cats!
          </button>
        </div>
        <SearchInput/>
        <div>
          <label htmlFor="limit">Limit:</label>
          <Select value={limit} onChange={handleLimitChange} />
        </div>
        <div className="results-container">
          {isLoading || isLoadingCats ? <MoonSpinner /> : breeds}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
      <div className="card-container">
        <CatCard />
      </div>
    </div>
  )
}


export default CatList
interface CatSearchProps {
  description?: string
  image?: { url: string }
  name?: string
  temperament?: string
  searchTerm?: string
}
type CatListProps = {
  data: Results;
 };