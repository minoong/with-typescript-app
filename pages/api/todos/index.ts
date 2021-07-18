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
	}

	res.statusCode = 405;
	return res.end();
};
