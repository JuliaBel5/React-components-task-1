
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
import { InferGetServerSidePropsType } from 'next'
import { wrapper } from '@/store/store'

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    let breedData: CatBreed | null = null

    const searchParams = new URLSearchParams(
      context.query as Record<string, string>
    );

    const breed = searchParams.get("urlSearchTerm") || "";
    const limit = +(searchParams.get("limit") || 6);
    const page = +(searchParams.get("page") || 1);

    const detailsID = searchParams.get('details')

    if (detailsID) {
      breedData = (await store.dispatch(catApi.endpoints.getBreed.initiate(detailsID))).data ?? null
    }

    const { data } = await store.dispatch(
      catApi.endpoints.getCats.initiate({
        breed,
        limit,
        page,
      })
    );

    await Promise.all(store.dispatch(catApi.util.getRunningQueriesThunk()));

    return {
      props: {
        data,
        breedData
      },
    };
  }
);

export const CatList = ({ data, breedData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(searchResultsActions.setTotalPages(data?.meta.total_pages));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.meta.total_pages]);

  const {
    currentPage,
    limit,
    totalPages,
  } = useAppSelector((state) => state.searchResults)

  const searchParams = new URLSearchParams(
    router.query as Record<string, string>
  );

  const handleLimitChange = (newLimit: number) => {
    dispatch(searchResultsActions.setLimit(newLimit))
    dispatch(searchResultsActions.setCurrentPage(1))
  }

  const [error, setError] = useState(false);

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
        <SearchInput />
        <div>
          <label htmlFor="limit">Limit:</label>
          <Select value={limit} onChange={handleLimitChange} />
        </div>
        <div className="results-container">
          {data && data.items.length === 0 ? (
            <>
              <h1 className="error-message">nothing found</h1>
            </>
          ) : (
            data?.items.map((cat: CatBreed) => (
              <Link
                href={`/?${searchParams}&details=${cat.id}`}
                key={cat.id}
                data-testid={`cat-${cat.id}`}
                role="link"
              >
                <CatItem cat={cat} />
              </Link>
            ))
          )}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
      <div className="card-container">
        <CatCard data={breedData} />
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