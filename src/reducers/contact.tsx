import {RawContact} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState, store} from "../store";
import {useSelector} from "react-redux";

const initContacts: RawContact[] = []

export const contact = createSlice({
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
        },
        deleteContact: (state, payload: PayloadAction<{id: string}>) => {
            return state.filter(item=>item?.id != payload.payload.id)
        }
    }
})

export const {updateContact, deleteContact} = contact.actions

