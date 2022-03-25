import { combineReducers, configureStore, createAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DefaultRootState, useSelector } from "react-redux"
import logger from "redux-logger"
import { RawContact } from "../types"
import {collection, contact} from "../reducers"

export const rootReducer = combineReducers({
    contacts: contact.reducer,
    collections: collection.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({ 
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export const useContacts = () => {
    return useSelector((state:RootState) => state.contacts)
}
export const useCollections = () => {
    return useSelector((state:RootState) => state.collections)
}


