import client from '..';
import { TodoType } from '../../../types/todo';

interface AddTodoAPIBody {
	text: string;
	color: TodoType['color'];
}

export const getTodosAPI = () => client.get<TodoType[]>('/api/todos');
export const checkTodosAPI = (id: number) => client.patch(`/api/todos/${id}`);
export const addTodoAPI = (body: AddTodoAPIBody) => client.post(`/api/todos`, body);
export const deleteTodoAPI = (id: number) => client.delete(`/api/todos/${id}`);
