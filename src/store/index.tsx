import { combineReducers, configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DefaultRootState, useSelector } from "react-redux"
import { RawContact } from "../types"

const initContacts: RawContact[] = [] 

const contactReducer = createSlice({
    name: "contactReducer",
    initialState: initContacts,
    reducers: {
        updateContact: (state, payload: PayloadAction<RawContact>) => {
            const _arr = [...state]
            const _index = _arr.findIndex(item => item.id == payload.payload.id)
            if (_index > -1) {
                _arr[_index] = payload.payload
                return _arr
            }
            return [...state, payload.payload]
        }
    }
})

export const {updateContact} = contactReducer.actions

export const rootReducer = combineReducers({
    contacts: contactReducer.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({ reducer: rootReducer })

export const useContacts = () => {
    return useSelector((state:RootState) => state.contacts)
}

export const updateContactAction = (contact: RawContact) => {
    return store.dispatch(updateContact(contact))
}