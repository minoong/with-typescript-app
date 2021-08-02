import { readFileSync, writeFileSync } from 'fs';
import { StoredUserType } from '../../../types/user';

const getList = () => {
	const usersBuffer = readFileSync('data/hey/user.json');
	const usersString = usersBuffer.toString();

	if (!usersString) {
		return [];
	}

	const users: StoredUserType[] = JSON.parse(usersString);

	return users;
};

const exist = ({ email }: { email: string }) => {
	const users = getList();
	return users.some((user) => user.email === email);
};

const addUser = async (users: StoredUserType[]) => {
	writeFileSync('data/hey/user.json', JSON.stringify(users));
};

export default { getList, exist, addUser };
