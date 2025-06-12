import type { j } from '../../../types';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../constants/common';

export const jokesApi = createApi({
	reducerPath: 'jokesApi',
	baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
	endpoints: (builder) => ({
		getRandomJoke: builder.query<j.Joke, void>({
			query: () => '/random_joke',
		}),
		getTenJokes: builder.query<j.Joke[], void>({
			query: () => '/random_ten',
		}),
	}),
});

export const { useLazyGetRandomJokeQuery, useLazyGetTenJokesQuery } = jokesApi;
