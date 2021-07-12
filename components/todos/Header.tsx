import React, { createRef } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import palette from '../../styles/palette';
import TodoList from './TodoList';

const HeaderBlock = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 52px;
	padding: 0 12px;
	border-bottom: 1px solid ${palette.gray};
	h1 {
		font-size: 21px;
	}
`;

const Header: React.FC = () => {
	console.log('up');
	const TestComp = withCommerce(TodoList, 'zzz');
	return (
		<HeaderBlock>
			<TestComp />
			{/* <TodoList hasMounted={true} /> */}
		</HeaderBlock>
	);
};

function withCommerce(InputComponent: any, src: string) {
	return class OutputComponent extends React.Component {
		state = {
			hasMounted: false,
		};
		componentDidMount() {
			this.setState({ hasMounted: true });
		}
		render() {
			const { hasMounted } = this.state;
			return (
				<>
					<InputComponent {...this.props} />
				</>
			);
			// return <div>sdfsd</div>;
		}
	};
}

export default Header;
