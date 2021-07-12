import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../components/Layout';
import TodoList from '../components/todos/TodoList';
import { TodoType } from '../types/todo';

const todos: TodoType[] = [
	{ id: 1, text: 'todo#1', color: 'red', checked: false },
	{ id: 2, text: 'todo#2', color: 'yellow', checked: false },
	{ id: 3, text: 'todo#3', color: 'orange', checked: true },
	{ id: 4, text: 'todo#4', color: 'navy', checked: false },
	{ id: 5, text: 'todo#5', color: 'navy', checked: false },
];

const Container = styled.div`
	padding: 20px;
`;

const IndexPage: NextPage = () => (
	<Container>
		<TodoList todos={todos} />
	</Container>
);

export default IndexPage;
