import React from 'react';
import { NextPage } from 'next';
import AddTodo from '../../components/todos/AddTodo';
import Head from 'next/head';

const todo: NextPage = () => {
	return (
		<>
			<Head>
				<title>Add Todo</title>
			</Head>
			<AddTodo />
		</>
	);
};

export default todo;
