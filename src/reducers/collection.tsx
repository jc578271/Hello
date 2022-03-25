import {RawCollection, RawContact} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initCollections: RawCollection[] = []
export const collection = createSlice({
    name: "collectionReducer",
    initialState: initCollections,
    reducers: {
        updateCollection: (state, payload: PayloadAction<RawCollection>) => {
            const _arr = [...state]
            const _index = _arr.findIndex(item => item.id == payload.payload.id)
            if (_index > -1) {
                _arr[_index] = payload.payload
                return _arr
            }
            return [...state, payload.payload]
        },
        deleteCollection: (state, payload: PayloadAction<{id: string}>) => {
            return state.filter(item=>item?.id != payload.payload.id)
        }
    }
})

export const { updateCollection, deleteCollection } = collection.actions