import React, { HTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '../../public/statics/x-mark.svg';
import EmailIcon from '../../public/statics/email.svg';
import PersonIcon from '../../public/statics/user.svg';
import OpenedEyeIcon from '../../public/statics/eye.svg';
import ClosedEyeIcon from '../../public/statics/eye-off.svg';
import Input from '../common/Input';
import 'react-datepicker/dist/react-datepicker.css';
import palette from '../../styles/palette';
import Selector from '../common/Selector';
import { dayList, monthList, yearList } from '../../lib/data/staticData';
import Button from '../common/Button';

const SignUpModalBlock = styled.form`
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
	}

	.sign-up-password-input-wrapper {
		svg {
			cursor: pointer;
		}
	}

	.sigh-up-birthday-label {
		font-size: 16px;
		font-weight: bold;
		margin-top: 16px;
		margin-bottom: 8px;
	}

	.sign-up-birthday-info {
		margin-bottom: 16px;
		color: ${palette.charcoal};
	}

	.sign-up-birthday-sel-wrapper {
		display: flex;
		margin-bottom: 24px;
		.sign-up-birthday-month {
			margin-right: 16px;
			flex: 1 1 33.3%;
		}
		.sign-up-birthday-day {
			margin-right: 16px;
			flex: 1 1 33.3%;
		}
		.sign-up-birthday-year {
			margin-right: 16px;
			flex: 1 1 33.3%;
		}
	}

	.sign-up-submit-wrapper {
		margin-bottom: 16px;
		padding-bottom: 16px;
		border-bottom: 1px solid ${palette.gray_eb};
	}
`;

interface TForm extends HTMLAttributes<HTMLSelectElement | HTMLInputElement> {
	email: string;
	lastname: string;
	firstname: string;
	password: string;
	month: string;
	day: string;
	year: string;
}

interface IProps {
	closeModal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
	const [form, setForm] = useState<TForm>({
		email: '',
		lastname: '',
		firstname: '',
		password: '',
		month: '',
		day: '',
		year: '',
	});
	const [hidePassword, setHidePassword] = useState(true);

	const onChangeForm = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = event.target;
		setForm((form) => ({
			...form,
			[name]: value,
		}));
	};

	const onToggleHidePassword = () => {
		setHidePassword((hidePassword) => !hidePassword);
	};

	return (
		<SignUpModalBlock>
			<CloseIcon className="modal-close-icon" onClick={closeModal} />
			<div className="input-wrapper">
				<Input
					placeholder="이메일"
					type="email"
					icon={<EmailIcon />}
					name="email"
					value={form.email}
					onChange={onChangeForm}
				/>
			</div>
			<div className="input-wrapper">
				<Input
					placeholder="이름(예:호청)"
					type="text"
					icon={<PersonIcon />}
					name="lastname"
					value={form.lastname}
					onChange={onChangeForm}
				/>
			</div>
			<div className="input-wrapper">
				<Input
					placeholder="성(예:이)"
					type="text"
					icon={<PersonIcon />}
					name="firstname"
					value={form.firstname}
					onChange={onChangeForm}
				/>
			</div>
			<div className="input-wrapper sign-up-password-input-wrapper">
				<Input
					placeholder="패스워드"
					type={hidePassword ? 'password' : 'text'}
					icon={
						hidePassword ? (
							<ClosedEyeIcon onClick={onToggleHidePassword} />
						) : (
							<OpenedEyeIcon onClick={onToggleHidePassword} />
						)
					}
					name="password"
					value={form.password}
					onChange={onChangeForm}
					autoComplete="off"
				/>
			</div>
			<div className="sigh-up-birthday-label">생일</div>
			<div className="sign-up-birthday-info">
				만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른 이용자에게 제공되지 않습니다.
			</div>

			<div className="sign-up-birthday-sel-wrapper">
				<div className="sign-up-birthday-month">
					<Selector
						name="month"
						options={monthList}
						disabledOptions={['월']}
						defaultValue="월"
						onChange={onChangeForm}
					/>
				</div>
				<div className="sign-up-birthday-day">
					<Selector name="day" options={dayList} disabledOptions={['일']} defaultValue="일" onChange={onChangeForm} />
				</div>
				<div className="sign-up-birthday-year">
					<Selector name="year" options={yearList} disabledOptions={['년']} defaultValue="년" onChange={onChangeForm} />
				</div>
			</div>

			<div className="sign-up-submit-wrapper">
				<Button type="submit">Sign Up</Button>
			</div>
		</SignUpModalBlock>
	);
};

export default React.memo(SignUpModal);
