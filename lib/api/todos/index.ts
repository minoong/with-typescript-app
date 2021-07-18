import client from '..';
import { TodoType } from '../../../types/todo';

export const getTodosAPI = () => client.get<TodoType[]>('/api/todos');
export const checkTodosAPI = (id: number) => client.patch(`/api/todos/${id}`);
