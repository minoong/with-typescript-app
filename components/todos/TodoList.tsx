import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import { TodoType } from '../../types/todo';

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
`;

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
	const summary = useMemo(() => getTodoColorNums(todos), [todos]);

	Object.keys(summary).map((color, index) => console.log(color));
	return (
		<TodoListBlock>
			<div className="todo-list-header">
				<p className="todo-list-last-todo">
					남은 TODO<span>{todos.length}개</span>
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
