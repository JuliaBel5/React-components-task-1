import { configureStore, Store } from "@reduxjs/toolkit";
import { searchResultsReducer } from "../features/searchResultsSlice";
import { searchReducer } from "../features/searchSlice";
import { catApi } from "../services/catApi";
import { createWrapper } from "next-redux-wrapper";

export const store: Store =
  configureStore({
    reducer: {
      search: searchReducer,
      searchResults: searchResultsReducer,
      [catApi.reducerPath]: catApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(catApi.middleware),
    devTools: true,
  });
const makeStore = () => store

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);
