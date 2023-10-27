import { createReducer } from "@reduxjs/toolkit";

export const transactionReducer = createReducer({ transactions: [] }, {
    allTransactionsRequest: (state) => {
        state.loading = true;
    },
    allTransactionsSuccess: (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
    },
    allTransactionsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    getCourseRequest: (state) => {
        state.loading = true;
    },
    getTransactionsSuccess: (state, action) => {
        state.loading = false;
        state.lectures = action.payload;
    },
    getTransactionsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addToPlaylistRequest: (state) => {
        state.loading = true;
    },
    addToPlaylistSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    addToPlaylistFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    clearError: state => {
        state.error = null
    },
    clearMessage: state => {
        state.message = null
    }
});