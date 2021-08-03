import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../types/reduxState';
import { UserType } from '../../types/user';

const initialState: UserState = {
	id: 0,
	email: '',
	lastname: '',
	firstname: '',
	birthday: '',
	isLogged: false,
	profileImage: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setLoggedUser(state, action: PayloadAction<UserType>) {
			state = { ...action.payload, isLogged: true };
			return state;
		},
	},
});

const { reducer, actions } = userSlice;
export const { setLoggedUser } = actions;
export default reducer;
