import React from 'react';
import { useSelector } from 'react-redux';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { CommonState } from '../../recoil/common';
import { RootState } from '../../store/modules';
import palette from '../../styles/palette';

const SelectorBlock = styled.div<{ isValid: boolean; validateMode: boolean }>`
	width: 100%;
	height: 46px;

	select {
		width: 100%;
		height: 100%;
		background-color: white;
		border: 1px solid ${palette.gray_eb};
		padding: 0 11px;
		border-radius: 4px;
		outline: none;
		-webkit-appearance: none;
		background-image: url('/static/svg/common/selector/angel-down.svg');
		background-position: right 11px center;
		background-repeat: no-repeat;
		font-size: 16px;

		&:focus {
			border-color: ${palette.dark_cyan};
		}
	}

	${({ isValid, validateMode }) =>
		validateMode &&
		css`
			select {
				border-color: ${isValid ? palette.dark_cyan : palette.tawny} !important;
				background-color: ${isValid ? 'white' : palette.snow};
			}
		`}
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	options?: string[];
	value?: string;
	disabledOptions?: string[];
	isValid?: boolean;
}

const Selector: React.FC<IProps> = ({ options = [], disabledOptions = [], isValid, ...props }) => {
	const validateMode = useRecoilValue(CommonState);
	return (
		<SelectorBlock isValid={!!isValid} validateMode={validateMode}>
			<select {...props}>
				{disabledOptions.map((option, index) => (
					<option key={index} value={option} disabled>
						{option}
					</option>
				))}
				{options.map((option, index) => (
					<option key={index} value={option}>
						{option}
					</option>
				))}
			</select>
		</SelectorBlock>
	);
};

export default React.memo(Selector);
