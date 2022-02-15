import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer, { authMiddleware } from "./features/auth";
import { APIService } from "./services/apiService";
import { setStore } from "./utils/axios";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [APIService.reducerPath]: APIService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware).concat(APIService.middleware),
});

setupListeners(store.dispatch)
setStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store | null;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
