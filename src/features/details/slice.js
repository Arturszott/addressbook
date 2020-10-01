import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LOADING_STATES, SEED } from '../../constants';

export const fetchUserById = createAsyncThunk(
  'details/user',
  async (userId) => {
    const response = await fetch(
      `https://randomuser.me/api/?seed=${SEED}&id=${userId}`,
    );

    const data = await response.json();

    return data.results[0];
  },
);

const slice = createSlice({
  name: 'user',
  initialState: { details: null, loading: LOADING_STATES.IDLE },
  reducers: {},
  extraReducers: {
    [fetchUserById.fulfilled]: (state, action) => {
      state.details = action.payload;
    },
  },
});

export default slice.reducer;
