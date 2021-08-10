export const validPassword = (password: string, lastname: string, email: string) => {
	return !password || !lastname || password.includes(lastname) || password.includes(email.split('@')[0]);
};

export const validPasswordLange = (password: string) => /^.{8,20}$/.test(password);

export const hasNumberOrSymbol = (password: string) => /^.*(?=.*\d)(?=.*[!@#$%^&+=]).*$/.test(password);
