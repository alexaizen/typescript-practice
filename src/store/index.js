import { createSlice, configureStore } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: { isLogedIn: false },
  reducers: {
    loginToggle(state) {
      state.isLogedIn = !state.isLogedIn;
    },
  },
});

const messagesSlice = createSlice({
  name: "messages",
  initialState: { previousSender: "no sender", messageAligment: "left" },
  reducers: {
    previousSenderDisp(state, action) {
      state.previousSender = action.payload;
    },
    messageAligmentToggle(state) {
      if (state.messageAligment === "left") {
        state.messageAligment = "right";
    } else {
      state.messageAligment = "left";
    }
  },
}});

const store = configureStore({
  reducer: { login: loginSlice.reducer, messages: messagesSlice.reducer}
});

export const loginActions = loginSlice.actions;
export const messagesActions = messagesSlice.actions;
export default store;
