import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleChefBooking = createAsyncThunk(
  "fetch/singleChefBookings",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/users/chefs/${id}/bookings`);
      console.log("DATA IN THE ASYNC THUNK", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

// add booking from form
export const addSingleChefBooking = createAsyncThunk(
  "add/singleChefBooking",
  async ({
    chefId,
    title,
    menu,
    start,
    end,
    max,
    openSeats,
    address1,
    address2,
    city,
    state,
    zip,
  }) => {
    try {
      console.log({
        chefId,
        title,
        menu,
        start,
        end,
        max,
        openSeats,
        address1,
        address2,
        city,
        state,
        zip,
      });
      const { data } = await axios.post(`/api/users/chefs/${chefId}/bookings`, {
        title,
        menu,
        startDateTime: start,
        endDateTime: end,
        maxSeats: max,
        openSeats,
        address1,
        address2,
        city,
        state,
        zipCode: zip,
        chefId: chefId
      });
      console.log("DATA IN THE ASYNC THUNK", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const singleChefBookingsSlice = createSlice({
  name: "singleChefBookings",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleChefBooking.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addSingleChefBooking.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const selectSingleChefBookings = (state) => {
  console.log("select single chef SLICE", state.singleChefBookings);
  return state.singleChefBookings;
};

export default singleChefBookingsSlice.reducer;
