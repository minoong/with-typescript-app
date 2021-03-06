import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data/todos';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'PATCH') {
		try {
			const id = Number(req.query.id);
			const todo = Data.todo.exist({ id });

			if (!todo) {
				res.statusCode = 404;
				res.end();
			}

			const todos = await Data.todo.getList();
			const updatedTodos = todos.map((todo) => {
				if (todo.id === id) {
					return { ...todo, checked: !todo.checked };
				}
				return todo;
			});

			Data.todo.write(updatedTodos);
			res.statusCode = 200;
			res.end();
		} catch (e) {
			console.error(e);
			res.statusCode = 500;
			res.send(e);
		}
	} else if (req.method === 'DELETE') {
		try {
			const todoId = Number(req.query.id);
			const todo = Data.todo.exist({ id: todoId });

			if (!todo) {
				res.statusCode = 404;
				res.end();
			}

			const todos = Data.todo.getList();
			const filteredTodos = todos.filter((todo) => todo.id !== todoId);
			Data.todo.write(filteredTodos);

			res.statusCode = 200;
			res.end();
		} catch (err) {
			console.error(err);
			res.statusCode = 500;
			res.send(err);
		}
	}

	res.statusCode = 405;
	return res.end();
};
