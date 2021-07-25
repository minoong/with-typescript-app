import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useSWR from 'swr';
import Footer from '../../components/todos/Footer';
import TodoList from '../../components/todos/TodoList';
import { getTodosAPI } from '../../lib/api/todos';
import wrapper from '../../store';
import { RootState } from '../../store/modules';
import { setTodo } from '../../store/todo';
import { TodoType } from '../../types/todo';

const Container = styled.div`
	padding: 20px;
`;

interface IProps {
	todos: TodoType[];
}

const IndexPage: NextPage<IProps> = () => {
	const todos = useSelector((state: RootState) => state.todo.todos);

	const { data } = useSWR('/api/todo', getTodosAPI);

	console.log(process.env.NEXT_PUBLIC_API_URL);
	return (
		<Container>
			<TodoList todos={todos} />
			<Footer />
		</Container>
	);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
	const { data } = await getTodosAPI();

	store.dispatch(setTodo(data));

	return {
		props: {},
	};
});

export default IndexPage;
