import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokenRedux: (state, action) => {
      state.token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTokenRedux } = authSlice.actions

export default authSlice.reducer