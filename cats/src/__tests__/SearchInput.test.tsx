import { SearchInput } from "@/components/SearchInput/SearchInput"
import { store } from "@/store/store"
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import { createMockRouter } from '@/tests-utils/createMockRouter';
import router from "next/router"
import { useRouter } from 'next/router'
import React from "react"
import { Provider } from "react-redux"
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { CatList } from "@/pages";


import Home, { getServerSideProps } from "@/pages";
import { act,  within } from "@testing-library/react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { createRequest, createResponse } from "node-mocks-http";
import nock from "nock";
import { wrapper } from "@/store/store";

import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";


const mockItems = [
  {
    id: 1,
    name: "Test Cat 1",
    description: "Test description 1",
    temperament: "Test temperament 1",
  },
  {
    id: 2,
    name: "Test Cat 2",
    description: "Test description 2",
    temperament: "Test temperament 2",
  },
];

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

  it("should render the input field and button", async () => {
    jest.mock("next/router", () => jest.requireActual("next-router-mock"));

    nock("https://2ff5030c446d8ca4.mokky.dev")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get("/breeds?name=*&page=1&limit=6")
      .reply(200, {
        meta: {
          total_items: 67,
          total_pages: 12,
          current_page: 1,
          per_page: 6,
          remaining_count: 61,
        },
        items: mockItems,
      });

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



 const searchInput = screen.getByPlaceholderText('Please, enter a cat breed')
 const searchButton = screen.getByText('Search')
 const select = screen.getByText('6')



  await waitFor(async () => {
    expect(searchInput).toBeInTheDocument()
    expect(searchButton).toBeInTheDocument()
    expect(select).toBeInTheDocument()
  })
})
})