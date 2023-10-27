import { createReducer } from "@reduxjs/toolkit";

export const partyReducer = createReducer({ parties: [], lectures:[] }, {
    allPartiesRequest: (state) => {
        state.loading = true;
    },
    allPartiesSuccess: (state, action) => {
        state.loading = false;
        state.parties = action.payload;
    },
    allPartiesFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    partyTraRequest: (state) => {
        state.loading = true;
    },
    partyTraSuccess: (state, action) => {
        state.loading = false;
        state.partytra = action.payload;
    },
    partyTraFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    aPartyRequest: (state) => {
        state.loading = true;
    },
    aPartySuccess: (state, action) => {
        state.loading = false;
        state.party = action.payload;
    },
    aPartyFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    getCourseRequest: (state) => {
        state.loading = true;
    },
    getPartiesSuccess: (state, action) => {
        state.loading = false;
        state.lectures = action.payload;
    },
    getPartiesFail: (state, action) => {
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