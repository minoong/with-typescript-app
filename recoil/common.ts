import { atom } from 'recoil';

const CommonState = atom({
	key: 'validateMode',
	default: false,
});

export { CommonState };
