import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LOADING_STATES, SEED, RESULTS_COUNT } from '../../constants';
import { toQuery } from '../../utils';
import { selectNationality } from '../settings/slice';

export const fetchUserList = createAsyncThunk(
  'list/users',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const nationality = state.settings.nationality;
    // page is 1 index based
    const page = state.users.page + 1;

    const queryMap = {
      seed: SEED,
      results: RESULTS_COUNT,
      nat: nationality,
      page,
    };

    const response = await fetch(
      `https://randomuser.me/api/?${toQuery(queryMap)}`,
    );

    const data = await response.json();

    return data.results;
  },
);
const initialState = { entities: [], loading: LOADING_STATES.IDLE, page: 0 };

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserList.pending]: (state) => {
      state.loading = LOADING_STATES.LOADING;
    },
    [fetchUserList.fulfilled]: (state, action) => {
      state.entities.push(...action.payload);
      state.loading = LOADING_STATES.IDLE;
      state.page += 1;
    },
    [fetchUserList.rejected]: (state) => {
      state.loading = LOADING_STATES.IDLE;
    },
    [selectNationality.type]: () => {
      return initialState;
    },
  },
});

export default slice.reducer;
