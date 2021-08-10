import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import CheckMarkIcon from '../../public/statics/check-mark.svg';
import CloseIcon from '../../public/statics/x-mark.svg';

const PasswordWarningBlock = styled.div<{ isValid: boolean }>`
	color: ${({ isValid }) => (isValid ? palette.davidson_orange : palette.green)};
	display: flex;
	align-items: center;
	svg {
		margin-right: 8px;
	}
`;

interface IProps {
	isValid: boolean;
	text: string;
}

const PasswordWarning: React.FC<IProps> = ({ isValid, text }) => {
	return (
		<PasswordWarningBlock isValid={isValid}>
			{isValid ? <CloseIcon /> : <CheckMarkIcon />}
			{text}
		</PasswordWarningBlock>
	);
};

export default PasswordWarning;
