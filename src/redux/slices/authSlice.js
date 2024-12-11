import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    jwt: localStorage.getItem('jwt') || null, // Retrieve JWT from local storage
  },
  reducers: {
    setJwt(state, action) {
      state.jwt = action.payload;
      localStorage.setItem('jwt', action.payload); // Store JWT in local storage
    },
    clearJwt(state) {
      state.jwt = null;
      localStorage.removeItem('jwt'); // Clear JWT from local storage
    },
  },
});

export const { setJwt, clearJwt } = authSlice.actions;
export default authSlice.reducer;
