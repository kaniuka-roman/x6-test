export const accountTypes = [
	{ id: 1, name: 'Personal' },
	{ id: 2, name: 'Designer' },
	{ id: 3, name: 'Studio' },
	{ id: 4, name: 'Brand / Startup' },
] as const;

export type AccountType = (typeof accountTypes[number])['name'];