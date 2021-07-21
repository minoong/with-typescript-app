import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import { TodoType } from '../../types/todo';
import TrashCanIcon from '../../public/statics/trash-can.svg';
import CheckMarkIcon from '../../public/statics/check-mark.svg';
import { checkTodosAPI, deleteTodoAPI } from '../../lib/api/todos';
import { useRouter } from 'next/dist/client/router';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import produce from 'immer';

const TodoListBlock = styled.div`
	width: 100%;

	.todo-num {
		margin-left: 12px;
	}
	.todo-list-header {
		padding: 12px;
		border-bottom: 1px solid ${palette.gray};

		.todo-list-last-todo {
			font-size: 14px;
			margin: 0 0 8px;
			span {
				margin-left: 8px;
			}
		}
		.todo-list-header-color {
			display: flex;
			.todo-list-header-color-num {
				display: flex;
				margin-right: 8px;
				p {
					font-size: 14px;
					line-height: 16px;
					margin: 0;
					margin-left: 6px;
				}
				.todo-list-header-round-color {
					width: 16px;
					height: 16px;
					border-radius: 50%;
				}
			}
		}
	}
	.bg-blue {
		background-color: ${palette.blue};
	}
	.bg-green {
		background-color: ${palette.green};
	}
	.bg-navy {
		background-color: ${palette.navy};
	}
	.bg-orange {
		background-color: ${palette.orange};
	}
	.bg-red {
		background-color: ${palette.red};
	}
	.bg-yellow {
		background-color: ${palette.yellow};
	}

	.todo-list {
		.todo-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 52px;
			border-bottom: 1px solid ${palette.gray};

			.todo-left-side {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;

				.todo-color-block {
					width: 12px;
					height: 100%;
				}
				.checked-todo-text {
					color: ${palette.gray};
					text-decoration: line-through;
				}
				.todo-text {
					margin-left: 12px;
					font-size: 16px;
					flex: 1;
				}
			}

			.todo-right-side {
				display: flex;
				margin-right: 12px;
				svg {
					&:first-child {
						margin-right: 16px;
					}
				}

				.todo-trash-can {
					path {
						fill: ${palette.deep_red};
					}
				}

				.todo-check-mark {
					fill: ${palette.deep_green};
				}

				.todo-button {
					width: 20px;
					height: 20px;
					border-radius: 50%;
					border: 1px solid ${palette.gray};
					background-color: transparent;
					outline: none;
				}
			}
		}
	}
`;

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
	return (
		<Box position="relative" display="inline-flex">
			<CircularProgress variant="determinate" {...props} />
			<Box
				top={0}
				left={0}
				bottom={0}
				right={0}
				position="absolute"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<Typography variant="caption" component="div" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

interface IProps {
	todos: TodoType[];
}

const TodoList: React.FC<IProps> = ({ todos }) => {
	// const config = new Map();
	// config.set('charset', 'utf-8');

	// useScript('https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js', config);
	// const addTwo = (x: any) => x + 2;

	// const multiplyByFour = (x: any) => 4 * x;

	// const addTwoThenMultiplyByFour = pipe(addTwo, multiplyByFour);

	// console.log(addTwoThenMultiplyByFour(3)); // 20
	const [localTodos, setLocalTodos] = useState(todos);
	const router = useRouter();
	const summary = useMemo(() => getTodoColorNums(localTodos), [localTodos]);

	const checkTodo = useCallback(async (id: number) => {
		try {
			// const timer = setInterval(() => {
			// 	setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
			// }, 800);
			const data = await checkTodosAPI(id);

			if (200 === data.status) {
				setLocalTodos(
					produce((draft) => {
						const todo = draft.find((todo) => todo.id === id);

						if (todo?.checked !== undefined) {
							todo.checked = !todo.checked;
						}
					}),
				);
			}
		} catch (e) {
			console.error(e);
		}
	}, []);

	const deleteTodo = async (id: number) => {
		try {
			const { status } = await deleteTodoAPI(id);

			if (status === 200) {
				const newTodos = localTodos.filter((todo) => todo.id !== id);
				setLocalTodos(() => newTodos);
			}
		} catch (err) {
			console.error(err);
		}
	};

	// const [progress, setProgress] = React.useState(10);

	return (
		<TodoListBlock>
			{/* <CircularProgressWithLabel value={progress} /> */}
			<div className="todo-list-header">
				<p className="todo-list-last-todo">
					남은 TODO<span>{localTodos.length}개</span>
				</p>
				<div className="todo-list-header-color">
					{Object.keys(summary).map((color, index) => (
						<div className="todo-list-header-color-num" key={index}>
							<div className={`todo-list-header-round-color bg-${color}`} />
							<p>{summary[color]}개</p>
						</div>
					))}
				</div>
			</div>
			<ul className="todo-list">
				{localTodos.map((todo) => (
					<li className="todo-item" key={todo.id}>
						<div className="todo-left-side">
							<div className={`todo-color-block bg-${todo.color}`} />
							<p className={`todo-text ${todo.checked ? 'checked-todo-text' : ''}`}>{todo.text}</p>
						</div>
						<div className="todo-right-side">
							{todo.checked && (
								<>
									<TrashCanIcon className="todo-trash-can" onClick={() => deleteTodo(todo.id)} />
									<CheckMarkIcon className="todo-check-mark" onClick={() => checkTodo(todo.id)} />
								</>
							)}
							{!todo.checked && <button type="button" className="todo-button" onClick={() => checkTodo(todo.id)} />}
						</div>
					</li>
				))}
			</ul>
		</TodoListBlock>
	);
};

const getTodoColorNums = (todos: TodoType[]): { [key: string]: number } => {
	return todos.reduce((acc: { [key: string]: number }, todo: TodoType) => {
		if (acc[todo.color]) {
			acc[todo.color] += 1;
		} else {
			acc[todo.color] = 1;
		}
		return acc;
	}, {});
};

const useScript = (src: string, config: any) => {
	useEffect(() => {
		console.log(2, document.querySelector(`script[src="${src}"]`));
		let script: any = document.createElement('script');
		script.src = src;

		for (let [key, value] of config) {
			script[key] = value;
		}

		const setAttributeFromEvent = (event: Event) => {
			script?.setAttribute('data-status', event.type === 'load' ? 'ready' : 'error');
			console.log(3, document.querySelector(`script[src="${src}"]`));
			Naver();
		};

		script.setAttribute('data-status', 'loading');

		document.body.appendChild(script);

		script.addEventListener('load', setAttributeFromEvent);

		return () => {
			script.removeEventListener('load', setAttributeFromEvent);
			document.body.removeChild(script);
		};
	}, [config]);
};

declare global {
	interface Window {
		naver: any;
	}
}

const pipe =
	(...funcs: Function[]) =>
	(input: any) => {
		const finalOutput = funcs.reduce((prevOutput: any, nextFunc: any) => {
			const nextOutput = nextFunc(prevOutput);

			return nextOutput;
		}, input);

		return finalOutput;
	};

const Naver = () => {
	const { naver } = window;
	const naverLogin = new naver.LoginWithNaverId({
		clientId: `${process.env.REACT_APP_NAVER_LOGIN}`,
		callbackUrl: 'http://localhost:3000/Api/Member/Oauth',
		isPopup: false,
		loginButton: { color: 'green', type: 3, height: '50' },
		callbackHandler: true,
	});
	naverLogin.init();

	console.log(naverLogin);

	localStorage.setItem('naver.accessToken', naverLogin.accessToken);
};

export default React.memo(TodoList);
