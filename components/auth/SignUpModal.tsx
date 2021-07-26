import React, { InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '../../public/statics/x-mark.svg';
import EmailIcon from '../../public/statics/email.svg';
import PersonIcon from '../../public/statics/user.svg';
import OpenedEyeIcon from '../../public/statics/eye.svg';
import ClosedEyeIcon from '../../public/statics/eye-off.svg';
import Input from '../common/Input';

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
	}

	.sign-up-password-input-wrapper {
		svg {
			cursor: pointer;
		}
	}
`;

interface TForm extends InputHTMLAttributes<HTMLInputElement> {
	email: string;
	lastname: string;
	firstname: string;
	password: string;
}

const SignUpModal: React.FC = () => {
	const [form, setForm] = useState<TForm>({
		email: '',
		lastname: '',
		firstname: '',
		password: '',
	});
	const [hidePassword, setHidePassword] = useState(true);

	const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setForm((form) => ({
			...form,
			[name]: value,
		}));
	};

	const onToggleHidePassword = () => {
		setHidePassword((state) => !state);
	};

	return (
		<SignUpModalBlock>
			<CloseIcon className="modal-close-icon" />
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
				/>
			</div>
		</SignUpModalBlock>
	);
};

export default React.memo(SignUpModal);
