import { configureStore } from "@reduxjs/toolkit";
import { profileReducer, subscriptionReducer, userReducer } from "./reducers/userReducer";
import { courseReducer } from "./reducers/courseReducer";
import { transactionReducer } from "./reducers/transactionReducer";
import partyReducer  from "./actions/partySlice";
import { adminReducer } from "./reducers/adminReducer";
import { otherReducer } from "./reducers/otherReducer";


const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        transaction: transactionReducer,
        course: courseReducer,
        party: partyReducer,
        subscription: subscriptionReducer,
        admin: adminReducer,
        other: otherReducer,
    },

})

export default store;

export const server = 'https://drinking-mim.onrender.com/api/v1';
// export const server = 'http://localhost:4000/api/v1'