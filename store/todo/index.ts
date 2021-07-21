import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoType } from '../../types/todo';

export type TodoReduxState = {
	todos: TodoType[];
};

const initialState: TodoReduxState = {
	todos: [],
};

const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		setTodo(state: TodoReduxState, action: PayloadAction<TodoType[]>) {
			state.todos.push(...action.payload);
		},
	},
});

const { reducer, actions } = todoSlice;
export const { setTodo } = actions;
export default reducer;
