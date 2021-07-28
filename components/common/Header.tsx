import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import useModal from '../../hooks/useModal';
import palette from '../../styles/palette';
import SignUpModal from '../auth/SignUpModal';

const HeaderBlock = styled.div`
	position: sticky;
	top: 0;
	width: 100%;
	height: 80px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 80px;
	background-color: white;
	box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
	z-index: 10;
	.header-logo-wrapper {
		display: flex;
		align-items: center;
		text-decoration: none;
		.header-logo-text {
			font-weight: 800;
			color: black;
			font-size: 2rem;
		}
		.header-logo {
			margin-right: 6px;
		}
	}
	.header-auth-wrapper {
		.header-sign-up-button {
			height: 42px;
			margin-right: 8px;
			padding: 0 16px;
			border: 0;
			border-radius: 21px;
			background-color: white;
			cursor: pointer;
			outline: none;
			&:hover {
				background-color: ${palette.gray_f7};
			}
		}
		.header-sign-in-button {
			height: 42px;
			padding: 0 16px;
			border: 0;
			box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
			border-radius: 21px;
			background-color: white;
			cursor: pointer;
			outline: none;
			&:hover {
				box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
			}
		}
	}
	.modal-contents {
		width: 400px;
		height: 400px;
		background-color: white;
		z-index: 11;
	}
`;

const Header: React.FC = () => {
	const { openModal, ModalPortal, closeModal } = useModal();
	return (
		<HeaderBlock>
			<Link href="/">
				<a className="header-logo-wrapper">
					<div className="header-logo-text">Hey</div>
				</a>
			</Link>
			<div className="header-auth-wrapper">
				<button className="header-sign-up-button" type="button" onClick={openModal}>
					Sign Up
				</button>
				<button className="header-sign-in-button" type="button">
					Sign In
				</button>
			</div>
			<ModalPortal>
				<SignUpModal closeModal={closeModal} />
			</ModalPortal>
		</HeaderBlock>
	);
};

export default React.memo(Header);
