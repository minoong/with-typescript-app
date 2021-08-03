import React from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { CommonState } from '../../recoil/common';
import palette from '../../styles/palette';

type InputContainerProps = {
	hasIcon: boolean;
	isValid: boolean;
	useValidation: boolean;
};

const InputBlock = styled.div<InputContainerProps>`
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
		right: 0.75rem;
		top: 11px;
		path {
			fill: ${palette.gray_aa};
		}
	}

	.input-error-message {
		margin-top: 8px;
		font-weight: 600;
		font-size: 14px;
		color: ${palette.tawny};
	}

	${({ useValidation, isValid }) =>
		useValidation &&
		!isValid &&
		css`
			input {
				background-color: ${palette.snow};
				border-color: ${palette.orange};
				& :focus {
					border-color: ${palette.orange};
				}
			}
		`}
	${({ useValidation, isValid }) =>
		useValidation &&
		isValid &&
		css`
			input {
				border-color: ${palette.green};
			}
		`}
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: JSX.Element;
	isValid?: boolean;
	useValidation?: boolean;
	errorMessage?: string;
}

const Input: React.FC<IProps> = ({ icon, isValid = false, useValidation = true, errorMessage, ...props }) => {
	const validateMode = useRecoilValue(CommonState);
	return (
		<InputBlock hasIcon={!!icon} isValid={isValid} useValidation={useValidation}>
			<input {...props} />
			<div className="input-icon-wrapper">{icon}</div>
			{useValidation && validateMode && !isValid && errorMessage && (
				<div className="input-error-message">{errorMessage}</div>
			)}
		</InputBlock>
	);
};

export default React.memo(Input);
