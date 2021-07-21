import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { addTodoAPI } from '../../lib/api/todos';
import BrushIcon from '../../public/statics/paintbrush.svg';
import palette from '../../styles/palette';
import { TodoType } from '../../types/todo';
import Footer from './Footer';

const AddTodoBlock = styled.div`
	padding: 16px;

	.add-todo-header-title {
		font-size: 21px;
	}

	.add-todo-header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.add-todo-submit-button {
			padding: 4px 8px;
			border: 1px solid black;
			border-radius: 5px;
			background-color: white;
			outline: none;
			font-size: 14px;
		}
	}

	.add-todo-colors-wrapper {
		width: 100%;
		margin-top: 16px;
		display: flex;
		justify-content: space-between;

		.add-todo-color-list {
			display: flex;
			button {
				width: 24px;
				height: 24px;
				margin-right: 16px;
				border: 0;
				outline: none;
				border-radius: 50%;
				&:last-child {
					margin: 0;
				}
				cursor: pointer;
			}
			.add-todo-selected-color {
				border: 2px solid ${palette.gray_71};
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

	textarea {
		width: 100%;
		border-radius: 5px;
		height: 300px;
		border-color: ${palette.gray};
		margin-top: 12px;
		resize: none;
		outline: none;
		padding: 12px;
		font-size: 16px;
	}
`;

const AddTodo: React.FC = () => {
	const [text, setText] = useState<string>('');
	const [selectedColor, setSelectedColor] = useState<TodoType['color']>();
	const router = useRouter();

	const addTodo = async () => {
		try {
			if (!text || !selectedColor) {
				alert('색상과 할 일을 입력하세요.');
				return;
			}

			const { status } = await addTodoAPI({ text, color: selectedColor });

			if (status === 200) {
				router.push('/todo');
			}
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<AddTodoBlock>
			<div className="add-todo-header">
				<h1 className="add-todo-header-title">Add Todo</h1>
				<button type="button" className="add-todo-submit-button" onClick={addTodo}>
					추가하기
				</button>
			</div>
			<div className="add-todo-colors-wrapper">
				<div className="add-todo-color-list">
					{['red', 'orange', 'yellow', 'green', 'blue', 'navy'].map((color, index) => (
						<button
							key={index}
							type="button"
							className={`bg-${color} add-todo-color-button
                        ${color === selectedColor ? 'add-todo-selected-color' : ''}
                        `}
							onClick={() => setSelectedColor(color as TodoType['color'])}
						/>
					))}
				</div>
				<BrushIcon />
			</div>
			<textarea value={text} placeholder="할 일을 입력해주세요." onChange={(e) => setText(e.currentTarget.value)} />
			<Footer />
		</AddTodoBlock>
	);
};

export default AddTodo;
