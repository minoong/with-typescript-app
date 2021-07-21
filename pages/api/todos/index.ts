import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { TodoType } from '../../../types/todo';
import Data from '../../../lib/data/todos';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		try {
			const todos = Data.todo.getList();
			res.statusCode = 200;
			return res.send(todos);
		} catch (e) {
			console.error(e);
			res.statusCode = 500;
			res.send(e);
		}
	} else if (req.method === 'POST') {
		const { text, color } = req.body;

		if (!text || !color) {
			res.statusCode = 400;
			return res.send('text or color is empty.');
		}

		const todos = Data.todo.getList() || [];
		const todoId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

		const newTodo = {
			id: todoId,
			text,
			color,
			checked: false,
		};

		Data.todo.write([...todos, newTodo]);

		res.statusCode = 200;
		res.end();
	}

	res.statusCode = 405;
	return res.end();
};
