import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import CloseIcon from '../../public/statics/x-mark.svg';
import EmailIcon from '../../public/statics/email.svg';

const SignUpModalBlock = styled.div`
	width: 568px;
	padding: 32px;
	background-color: white;
	z-index: 11;

	.modal-close-icon {
		cursor: pointer;
		display: block;
		margin: 0 0 40px auto;
	}

	.input-wrapper {
		position: relative;
		margin-bottom: 16px;
		input {
			position: relative;
			width: 100%;
			height: 46px;
			padding: 0 44px 0 11px;
			border: 1px solid ${palette.gray_eb};
			border-radius: 4px;
			font-size: 16px;
			outline: none;
			::placeholder {
				color: ${palette.gray_76};
			}
		}
		svg {
			position: absolute;
			right: 11px;
			top: 11px;
		}
	}
`;

const SignUpModal: React.FC = () => {
	return (
		<SignUpModalBlock>
			<CloseIcon className="modal-close-icon" />
			<div className="input-wrapper">
				<input placeholder="email" type="email" name="email" />
				<EmailIcon />
			</div>
		</SignUpModalBlock>
	);
};

export default React.memo(SignUpModal);
