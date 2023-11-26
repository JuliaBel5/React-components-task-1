import Home, { getServerSideProps } from "@/pages";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { createRequest, createResponse } from "node-mocks-http";
import nock from "nock";
import { wrapper } from "@/store/store";
import { Provider } from "react-redux";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { act } from "react-dom/test-utils";
import { Select } from "@/components/Select/Select";

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

const mockItems2 = [
  {
    id: 3,
    name: "Test Cat 3",
    description: "Test description 3",
    temperament: "Test temperament 3",
  },
  {
    id: 4,
    name: "Test Cat 4",
    description: "Test description 4",
    temperament: "Test temperament 4",
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

  it("renders the appropriate data", async () => {
    jest.mock("next/router", () => jest.requireActual("next-router-mock"));

    nock("https://2ff5030c446d8ca4.mokky.dev")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get("/breeds?name=*&page=1&limit=6")
      .reply(200, {
        meta: {
          total_items: 4,
          total_pages: 12,
          current_page: 1,
          per_page: 6,
          remaining_count: 61,
        },
        items: mockItems,
      });

    nock("https://2ff5030c446d8ca4.mokky.dev")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get("/breeds?name=*&page=2&limit=6")
      .reply(200, {
        meta: {
          total_items: 4,
          total_pages: 12,
          current_page: 1,
          per_page: 6,
          remaining_count: 61,
        },
        items: mockItems2,
      });

    let pageProps = await getServerSideProps(gsspCtx());
    const App = () => {
      const { store, props } = wrapper.useWrappedStore(pageProps);

      return (
        <Provider store={store}>
          <Home {...props.props} />
        </Provider>
      );
    };

    const { rerender } = render(<App />, { wrapper: MemoryRouterProvider });

    expect(screen.getByText("Test Cat 2"));
    //Next Page
    const inc = screen.getByTestId("inc");
    // Click on Next Page
    act(() => {
      inc.click();
    });


    
    await act(async () => {
      pageProps = await getServerSideProps(gsspCtx({ query: { page: '2' } }));
    });

    rerender(<App />);
    //Verifies that the page is 2 with the correct content
    expect(mockRouter.asPath.includes("page=2")).toBeTruthy();
    expect(screen.getByText("Test Cat 3"));

    //Prev page
    const dec = screen.getByTestId("dec");


    //Click on the Prev page
    act(() => {
      dec.click();
    });

    await act(async () => {
      pageProps = await getServerSideProps(gsspCtx({ query: { page: '1' } }));
    });

    rerender(<App />);
      //Verifies that the page is 1  with the correct content
    expect(mockRouter.asPath.includes("page=1")).toBeTruthy();
    expect(screen.getByText("Test Cat 2"));
       
  });

  it("Render Select", () => {
    // Mock the onChange function
    const mockOnChange = jest.fn();

    // Render the Select component with initial value and mockOnChange function
    const { getByDisplayValue, getByTestId } = render(
      <Select value={1} onChange={mockOnChange} />
    );
    // Check if options are rendered correctly
    expect(getByDisplayValue("1")).toBeInTheDocument();

    // Simulate a change event and check if onChange is called with the correct value
    fireEvent.change(getByTestId("select"), { target: { value: "5" } });
    expect(mockOnChange).toHaveBeenCalledWith(5);
  });
});

