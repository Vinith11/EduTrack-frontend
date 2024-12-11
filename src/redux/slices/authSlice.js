import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    jwt: localStorage.getItem('jwt') || null, // Retrieve JWT from local storage
    usn: null,
    email: null,
    batch: null,
    project_id: null,
    role: null,
  },
  reducers: {
    setJwt(state, action) {
      state.jwt = action.payload;
      localStorage.setItem('jwt', action.payload); // Store JWT in local storage
    },
    clearJwt(state) {
      state.jwt = null;
      state.usn = null;
      state.email = null;
      state.batch = null;
      state.project_id = null;
      state.role = null;
      localStorage.removeItem('jwt'); // Clear JWT from local storage
    },
    setUserProfile(state, action) {
      const { usn, email, batch, project_id } = action.payload;
      state.usn = usn;
      state.email = email;
      state.batch = batch;
      state.project_id = project_id;
      state.role = 'Student';
    },
  },
});

export const { setJwt, clearJwt, setUserProfile } = authSlice.actions;
export default authSlice.reducer;
