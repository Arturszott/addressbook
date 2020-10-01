import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LOADING_STATES, SEED, RESULTS_COUNT } from '../../constants';

export const fetchUserList = createAsyncThunk(
  'list/users',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    // page is 1 index based
    const page = state.users.page + 1;

    const response = await fetch(
      `https://randomuser.me/api/?seed=${SEED}&results=${RESULTS_COUNT}&page=${page}`,
    );

    const data = await response.json();

    return data.results;
  },
);

const slice = createSlice({
  name: 'users',
  initialState: { entities: [], loading: LOADING_STATES.IDLE, page: 0 },
  reducers: {},
  extraReducers: {
    [fetchUserList.fulfilled]: (state, action) => {
      state.entities.push(...action.payload);
    },
  },
});

export default slice.reducer;
