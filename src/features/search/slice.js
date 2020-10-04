import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'search',
  initialState: { phrase: '' },
  reducers: {
    setPhrase(state, action) {
      state.phrase = action.payload;
    },
  },
});

export const { setPhrase } = slice.actions;

export default slice.reducer;
