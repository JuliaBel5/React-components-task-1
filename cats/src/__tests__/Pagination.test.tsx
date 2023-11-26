import Home, { getServerSideProps } from "@/pages";
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { createRequest, createResponse } from "node-mocks-http";
import nock from "nock";
import { wrapper } from "@/store/store";
import { Provider } from "react-redux";
import mockRouter, { MemoryRouter, useRouter } from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import router from "next/router";

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

  it("should update URL query parameter when page changes", async () => {
    jest.mock('next/router', () => ({
      useRouter: () => ({
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
        push: jest.fn(),
      }),
     }));

     
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


    const prevButton = screen.getByRole('button', { name: '«' })
    const nextButton = screen.getByRole('button', { name: '»' })

    act(() => {
      nextButton.click()
    })

    // Checks if the searchParams are updated correctly
    expect(mockRouter.asPath).toBe('/?urlSearchTerm=&page=2&limit=6')

    act(() => {
      prevButton.click()
    })

    // Checks if the searchParams are updated correctly
    expect(mockRouter.asPath).toBe('/?urlSearchTerm=&page=1&limit=6')
  })
})