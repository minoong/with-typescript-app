import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const ButtonBlock = styled.button`
	width: 100%;
	height: 48px;
	border: 0;
	border-radius: 4px;
	background-color: ${palette.bittersweet};
	color: white;
	font-size: 16px;
	font-weight: bold;
	outline: none;
	cursor: pointer;
`;

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

const Button: React.FC<IProps> = ({ children, ...props }) => {
	return <ButtonBlock {...props}>{children}</ButtonBlock>;
};

export default React.memo(Button);
