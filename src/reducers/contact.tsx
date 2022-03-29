import {RawContact} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initContacts = {
    byKey: {},
    query: { "all": [] }
}

export const contact = createSlice({
    name: "contactReducer",
    initialState: initContacts,
    reducers: {
        updateContact: (state, payload: PayloadAction<RawContact>) => {
            // const _index = _arr.findIndex(item => item.id == payload.payload.id)
            // if (_index > -1) {
            //     _arr[_index] = payload.payload
            //     return _arr
            // }
            // return [...state, payload.payload]
            let byKey = { ...state.byKey, [payload.payload.id]: payload.payload }
            let query = { ...state.query, "all": Object.keys(byKey) }
            return { byKey, query }
        },
        setQueryContact: (state, payload:PayloadAction<{searchInput:string, list: string[]}>) => {
            let query = { ...state.query, [payload.payload.searchInput]: payload.payload.list}
            return { ...state, query }
        },
        deleteContact: (state, payload: PayloadAction<{id: string}>) => {
            delete state.byKey[payload.payload.id]
            Object.keys(state.query).forEach(key => state.query[key].filter(id => id != payload.payload.id))
            return { ...state }
        }
    }
})

export const {updateContact, deleteContact, setQueryContact} = contact.actions

