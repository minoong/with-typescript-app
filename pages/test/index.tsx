import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Todo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

const test = ({ data }: any) => {
	const [items, setItems] = useState<Todo[]>([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const [ref, inView] = useInView({ threshold: 1 });

	const getItems = useCallback(async () => {
		setLoading(true);
		await axios.get<Todo>(`https://jsonplaceholder.typicode.com/todos/${page}`).then((res) => {
			setItems((state) => [...state, res.data]);
		});

		setLoading(false);
	}, [page]);

	useEffect(() => {
		getItems();
	}, [getItems]);

	useEffect(() => {
		if (inView && !loading) {
			console.log(inView, loading);
			setPage((state) => state + 1);
		}
	}, [inView, loading]);

	return (
		<div className="list">
			{items.map((item, idx) => (
				<div className="list-item" key={item.id}>
					#{item.id}, {item.title}
				</div>
			))}
			<div className="list-item" ref={ref}>
				{loading && `loading...`}
				{!loading && `more`}
			</div>
		</div>
	);
};

// export const getServerSideProps: GetServerSideProps = async () => {
// 	// Fetch data from external API
// 	const res = await fetch(`https://jsonplaceholder.typicode.com/todos/21`);
// 	const data = await res.json();

// 	// 객체형태로 전달
// 	return { props: { data } };
// };

export default test;
