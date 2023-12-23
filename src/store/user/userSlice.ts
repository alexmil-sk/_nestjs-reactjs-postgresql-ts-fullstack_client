import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

//, Define a type for the slice state
import { UserStateInterface, UserInterface } from "../../types/types";

//, Define the initial state using that type
const initialState: UserStateInterface = {
  user: null,
	isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
		login: (state, action: PayloadAction<UserInterface>) => {
			state.user = action.payload;
			state.isAuth = true;
		},
		logout: (state) => {
			state.isAuth = false;
			state.user = null;
		},
  },
});

export const {login, logout} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user;

export default userSlice.reducer;
