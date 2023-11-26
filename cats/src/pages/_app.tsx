import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { ErrorPage } from "./ErrorPage";
import { wrapper } from "@/store/store";

export default function App({ Component, ...pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <ErrorBoundary fallback={<ErrorPage />}>
        <Component {...props.pageProps} />
      </ErrorBoundary>
    </Provider>
  );
}