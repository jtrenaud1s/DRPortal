import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer, { authMiddleware } from "./features/auth";
import taskReducer from './features/tasks'
import { setStore } from "./utils/axios";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: taskReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)
})

setStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type StoreType = typeof store | null

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector