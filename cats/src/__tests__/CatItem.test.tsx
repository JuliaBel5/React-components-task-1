import { catApi } from '@/services/catApi'
import { store, wrapper } from '@/store/store'
import '@testing-library/jest-dom'
import Home, { getServerSideProps } from "@/pages";
import router from 'next/router'
import nock from "nock"

import { Provider } from 'react-redux'

import { render, screen, waitFor } from '@testing-library/react'
import CatList from '@/pages/index'
import { CatItem } from '@/components/CatItem/catItem'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider'
import { createRequest, createResponse } from 'node-mocks-http'

const mockItems = 
  {
    id: "1",
    name: 'Test Cat 1',
    description: 'Test description 1',
    temperament: 'Test temperament 1',
  }
 
 

describe('CatItem', () => {
  it('renders the expexted data', () => {
    render(<CatItem cat={mockItems}/>)

    const heading = screen.getByText('Test description 1')

    expect(heading).toBeInTheDocument()
  })
})




describe("Home", () => {
  const gsspCtx = (
    ctx?: Partial<GetServerSidePropsContext>
  ): GetServerSidePropsContext => ({
    req: createRequest(),
    res: createResponse(),
    params: undefined,
    query: {},
    resolvedUrl: "",
    ...ctx,
  });

  class AssertionError extends Error {}

  function assertHasProps<T>(
    res: GetServerSidePropsResult<T>
  ): asserts res is { props: T } {
    const hasProps =
      typeof res === "object" &&
      (res as any)["props"] &&
      typeof (res as any).props === "object";
    if (!hasProps) throw new AssertionError("no props");
  }

  it("Check that an appropriate message is displayed if no cards are present", async () => {
    jest.mock("next/router", () => jest.requireActual("next-router-mock"));

    nock("https://2ff5030c446d8ca4.mokky.dev")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get("/breeds?name=*&page=1&limit=6")
      .reply(200, {
        meta: {
          total_items: 0,
          total_pages: 1,
          current_page: 1,
          per_page: 6,
          remaining_count: 0,
        },
        items: [],
      })

    const pageProps = await getServerSideProps(gsspCtx());
    const App = () => {
      const { store, props } = wrapper.useWrappedStore(pageProps);

      return (
        <Provider store={store}>
          <Home {...props.props} />
        </Provider>
      );
    };

    render(<App />, { wrapper: MemoryRouterProvider });


    // checking the presence of the error message
    await waitFor(async () => {
      expect(screen.getByText('nothing found')).toBeInTheDocument()
    })
  })

})