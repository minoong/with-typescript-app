import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Data from '../../../../lib/data/hey';
import { StoredUserType } from '../../../../types/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const { email, firstname, lastname, password, birthday } = req.body;

		if (!email || !firstname || !lastname || !password || !birthday) {
			res.statusCode = 400;
			return res.send('필수 데이터가 없습니다.');
		}

		const userExist = Data.user.exist({ email });

		if (userExist) {
			res.statusCode = 409;
			res.json({ message: '중복임' });
		}

		const hashedPassword = bcrypt.hashSync(password, 8);

		const users = Data.user.getList();

		let userId;

		if (users.length === 0) {
			userId = 1;
		} else {
			userId = users[users.length - 1].id + 1;
		}

		const newUser: StoredUserType = {
			id: userId,
			email,
			firstname,
			lastname,
			password: hashedPassword,
			birthday,
			profileImage: '/static/image/user/default_user_profile_image.jpg',
		};

		Data.user.addUser([...users, newUser]);

		const token = jwt.sign(`${newUser.id}`, process.env.JWT_SECRET_KEY!);

		const expires = new Date();
		expires.setMinutes(expires.getMinutes() + 5);

		console.log(expires.getHours(), expires.toISOString(), expires.toUTCString());
		console.log(expires.getMinutes());

		res.setHeader('Set-Cookie', `acess_token=${token}; Path=/; expires=${expires.toUTCString()}; HttpOnly;`);

		const newUserWithoutPassword: Partial<Pick<StoredUserType, 'password'>> = newUser;

		delete newUserWithoutPassword.password;

		res.statusCode = 200;
		return res.send(newUserWithoutPassword);
	}
};
