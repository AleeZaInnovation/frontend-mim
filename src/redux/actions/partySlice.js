import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import partyService from "./party";
import { json } from "react-router-dom";

export const getAllParties = createAsyncThunk(
  "party/get-all-parties",
  async (thunkAPI) => {
    try {
      return await partyService.getParties();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAParty = createAsyncThunk(
  "party/get-a-party",
  async (debit, thunkAPI) => {
    console.log(json(debit))
    try {
      return await partyService.getPartyDetails(debit);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const partyTra = createAsyncThunk(
  "party/party-transaction",
  async (info, thunkAPI) => {
    try {
      return await partyService.getPartyTra(info);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const traType = createAsyncThunk(
  "party/type-wise-transaction",
  async (info, thunkAPI) => {
    try {
      return await partyService.typeWiseTra(info);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const traAccount = createAsyncThunk(
  "party/account-wise-transaction",
  async (info, thunkAPI) => {
    try {
      return await partyService.accountWiseTra(info);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const incomeStatement = createAsyncThunk(
  "party/income-statement",
  async (info, thunkAPI) => {
    try {
      return await partyService.incomeState(info);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  parties: '',
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const partySlice = createSlice({
  name: "parties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllParties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllParties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.parties = action.payload;;
      })
      .addCase(getAllParties.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getAParty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAParty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.party = action.payload;;
      })
      .addCase(getAParty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(partyTra.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(partyTra.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.traParty = action.payload;;
      })
      .addCase(partyTra.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(traType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(traType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.typeTra = action.payload;;
      })
      .addCase(traType.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(traAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(traAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.accountTra = action.payload;;
      })
      .addCase(traAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(incomeStatement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(incomeStatement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.profitLoss = action.payload;;
      })
      .addCase(incomeStatement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
      
  },
});
export default partySlice.reducer;
