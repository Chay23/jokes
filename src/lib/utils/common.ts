export const capitalize = (value: string) => {
	return value.replace(/^./, value[0].toUpperCase());
};

export const getLocalStorageList = (key: string): any[] => {
	return localStorage.getItem(key)
		? JSON.parse(localStorage.getItem(key)!)
		: [];
};

export const isEmptyObject = (obj: object): boolean => {
	return Object.keys(obj).length === 0;
};
