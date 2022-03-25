import {RawContact} from "../types";
import {store} from "../store";
import {deleteContact, updateContact} from "../reducers";

export const updateContactAction = (contact: RawContact) => {
    return store.dispatch(updateContact(contact))
}

export const deleteContactAction = (id: string) => {
    return store.dispatch(deleteContact({id}))
}