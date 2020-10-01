import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'settings',
  initialState: { nationality: '' },
  reducers: {
    selectNationality(state, action) {
      state.nationality = action.payload;
    },
  },
});

export const { selectNationality } = slice.actions;

export default slice.reducer;
