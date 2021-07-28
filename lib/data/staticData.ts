export const monthList = Array(12)
	.fill('')
	.map((v, i) => `${i + 1}월`);

export const dayList = Array(31)
	.fill('')
	.map((v, i) => `${i + 1}일`);

export const yearList = Array(121)
	.fill('')
	.map((v, i) => `${2021 - i}년`);
