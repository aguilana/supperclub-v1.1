import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllChefsAsync = createAsyncThunk(
  "fetch/allChefs", async () => {
    try {
      const { data } = await axios.get("/api/users/chefs");
      return data;
    } catch (err) {
      console.log(err);
    }
  });

const allChefsSlice = createSlice({
  name: "allChefs",
  initialState: {
    chefs: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllChefsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllChefsAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chefs = action.payload;
    });
    builder.addCase(fetchAllChefsAsync.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const selectAllChefs = (state) => {
  return state.allChefs;
};

export default allChefsSlice.reducer;
