import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    name: "",
    email: "",
    position_id: "",
    is_blocked: "",
    password: "",
    uuid: "",
  },

  reducers: {
    loginAction: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.position_id = action.payload.position_id;
      state.is_blocked = action.payload.is_blocked;
      state.uuid = action.payload.uuid;
    },
    logoutAction: (state) => {
      state.name = "";
      state.email = "";
      state.position_id = "";
      state.is_blocked = "";
      state.password = "";
      state.uuid = "";
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;

export default authSlice.reducer;
