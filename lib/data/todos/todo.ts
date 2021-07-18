import { readFileSync, writeFileSync } from 'fs';
import { TodoType } from '../../../types/todo';

const getList = (): TodoType[] => {
	const buffer = readFileSync('data/todos/todos.json');
	const todos = buffer.toString();

	if (!todos) return [];

	return JSON.parse(todos);
};

const exist = ({ id }: { id: number }) => {
	const todos = getList();
	return todos.find((todo) => todo.id === id);
};

const write = async (todos: TodoType[]) => {
	writeFileSync('data/todos/todos.json', JSON.stringify(todos));
};

export default { getList, exist, write };
