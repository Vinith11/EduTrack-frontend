import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    jwt: null,
    usn: null,
    email: null,
    batch: null,
    project_id: null,
    role: null,
    faculty_uid: null,
    faculty_email: null,
  },
  reducers: {
    setJwt(state, action) {
      state.jwt = action.payload;
    },
    clearJwt(state) {
      state.jwt = null;
      state.usn = null;
      state.email = null;
      state.batch = null;
      state.project_id = null;
      state.role = null;
      state.faculty_uid = null;
      state.faculty_email = null;
    },
    setUserProfile(state, action) {
      const { usn, email, batch, project_id } = action.payload;
      state.usn = usn;
      state.email = email;
      state.batch = batch;
      state.project_id = project_id;
      state.role = 'Student';
    },
    setFacultyProfile(state, action) {
      const { faculty_uid, faculty_email } = action.payload;
      state.faculty_uid = faculty_uid;
      state.faculty_email = faculty_email;
      state.role = 'Faculty';
    },
  },
});

export const { setJwt, clearJwt, setUserProfile, setFacultyProfile } = authSlice.actions;
export default authSlice.reducer;
