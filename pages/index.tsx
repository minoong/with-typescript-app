import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../components/Layout';
import TodoList from '../components/todos/TodoList';
import { getTodosAPI } from '../lib/api/todos';
import wrapper from '../store';
import { setTodo } from '../store/todo';
import { TodoType } from '../types/todo';

const Container = styled.div`
	padding: 20px;
`;

const IndexPage: NextPage = () => {
	console.log(process.env.NEXT_PUBLIC_API_URL);
	return <Container>zzzzzzz</Container>;
};
// export const getServerSideProps = wrapper.getServerSideProps((store) => ({ req, res, ...etc }) => {
// 	console.log(`'2. Page.getServerSideProps uses the store to dispatch things'`);
// 	console.log(store);
// });

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
	const { data } = await getTodosAPI();

	store.dispatch(setTodo(data));

	console.log(`@@@@@@@@@@@`, data);
	return {
		props: {
			todos: data,
		},
	};
});
export default IndexPage;
