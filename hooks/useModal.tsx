import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ModalPortalBlock = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	.modal-background {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.75);
		z-index: 10;
	}
`;

interface IProps {
	children: React.ReactNode;
}

const useModal = () => {
	const [modalOpened, setModalOpened] = useState(false);

	const openModal = () => {
		setModalOpened(() => true);
	};
	const closeModal = () => {
		setModalOpened(() => false);
	};

	const ModalPortal: React.FC<IProps> = React.memo(({ children }) => {
		const ref = useRef<Element | null>(null);
		const [mounted, setMounted] = useState(false);

		useEffect(() => {
			setMounted(true);
			if (document) {
				const dom = document.querySelector('#root-modal');
				ref.current = dom;
			}
		}, []);

		if (!ref.current || !mounted || !modalOpened) return null;

		return (
			<ModalPortalBlock>
				<div className="modal-background" role="presentation" onClick={closeModal} />
				{children}
			</ModalPortalBlock>
		);
	});

	return {
		openModal,
		closeModal,
		ModalPortal,
	};
};

export default useModal;
