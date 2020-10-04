import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: { details: null },
  reducers: {
    setUserData(state, action) {
      state.details = action.payload;
    },
  },
});

export const { setUserData } = slice.actions;

export default slice.reducer;
