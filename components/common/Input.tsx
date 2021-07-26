import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const InputBlock = styled.div<{ hasIcon: boolean }>`
	input {
		position: relative;
		width: 100%;
		height: 46px;
		padding: ${({ hasIcon }) => (hasIcon ? '0 44px 0 11px' : '0 11px')};
		border: 1px solid ${palette.gray_eb};
		border-radius: 4px;
		font-size: 16px;
		outline: none;
		::placeholder {
			color: ${palette.gray_76};
		}
		&:focus {
			border-color: ${palette.dark_cyan} !important;
		}
	}

	.input-icon-wrapper {
		position: absolute;
		top: 0;
		right: 11px;
		height: 100%;
		display: flex;
		align-items: center;
	}
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: JSX.Element;
}

const Input: React.FC<IProps> = ({ icon, ...props }) => {
	return (
		<InputBlock hasIcon={!!icon}>
			<input {...props} />
			<div className="input-icon-wrapper">{icon}</div>
		</InputBlock>
	);
};

export default React.memo(Input);
