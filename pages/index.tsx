import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../components/Layout';
import TodoList from '../components/todos/TodoList';
import { getTodosAPI } from '../lib/api/todos';
import { TodoType } from '../types/todo';

const Container = styled.div`
	padding: 20px;
`;

interface IProps {
	todos: TodoType[];
}

const IndexPage: NextPage<IProps> = ({ todos }) => {
	console.log(process.env.NEXT_PUBLIC_API_URL);
	return (
		<Container>
			<TodoList todos={todos} />
		</Container>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	try {
		const { data } = await getTodosAPI();
		return {
			props: {
				todos: data,
			},
		};
	} catch (err) {
		console.error(err);
		return { props: {} };
	}
};

export default IndexPage;
