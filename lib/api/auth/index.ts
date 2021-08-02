import client from '..';
import { UserType } from '../../../types/user';

interface SignUpAPIBody {
	email: string;
	firstname: string;
	lastname: string;
	password: string;
	birthday: string;
}

export const signupAPI = (body: SignUpAPIBody) => client.post<UserType>(`/api/hey/auth/signup`, body);
