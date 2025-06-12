import { getEnvVariable } from '../utils/env/common';

export const API_BASE_URL =
	getEnvVariable('VITE_API_BASE_URL') ||
	'https://official-joke-api.appspot.com';
