import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState: { isLogedIn: boolean } = { isLogedIn: false };

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    loginToggle: (state) => {
      state.isLogedIn = !state.isLogedIn;
    },
  },
});

const store = configureStore({
  reducer: { login: loginSlice.reducer },
});

export const { loginToggle } = loginSlice.actions;

type RootState = ReturnType<typeof store.getState>;
export const selectLoggedIn = (state: RootState) => state.login.isLogedIn;

export default store;
