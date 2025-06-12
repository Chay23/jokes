import type { j, store } from '../../types';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorageList } from '../../lib/utils/common';
import { LOCAL_STORAGE_USER_JOKES } from '../../lib/constants/jokes/common';
import {
	removeIfLocalJoke,
	syncLocalJokes,
} from '../../lib/utils/jokes/common';

const getInitialState = (): store.JokesState => ({
	localJokes: getLocalStorageList(LOCAL_STORAGE_USER_JOKES) as j.Joke[],
	jokesList: [],
	localJokesCursor: 0,
	selectedJokeId: undefined,
});

const jokesSlice = createSlice({
	name: 'jokes',
	initialState: getInitialState(),
	reducers: {
		appendJokes: (state, action: PayloadAction<j.Joke[]>) => {
			state.jokesList.push(...action.payload);
		},
		addJoke: (state, action: PayloadAction<j.Joke>) => {
			state.jokesList.push(action.payload);
			state.localJokes.push(action.payload);
			syncLocalJokes(state.localJokes);
		},
		deleteJoke: (state) => {
			if (state.selectedJokeId) {
				const { updatedLocalJokes, updatedLocalCursor } = removeIfLocalJoke(
					state.localJokes,
					state.selectedJokeId,
					state.localJokesCursor
				);
				state.localJokes = updatedLocalJokes;
				state.localJokesCursor = updatedLocalCursor;

				state.jokesList = state.jokesList.filter(
					(item) => item.id !== state.selectedJokeId
				);
			}
		},
		refreshJoke: (state, action: PayloadAction<j.Joke>) => {
			if (state.selectedJokeId) {
				const index = state.jokesList.findIndex(
					(joke) => joke.id === state.selectedJokeId
				);

				const { updatedLocalJokes, updatedLocalCursor } = removeIfLocalJoke(
					state.localJokes,
					state.selectedJokeId,
					state.localJokesCursor
				);
				state.localJokes = updatedLocalJokes;
				state.localJokesCursor = updatedLocalCursor;

				if (index !== -1) {
					state.jokesList[index] = action.payload;
				}
			}
		},
		selectJoke: (state, action: PayloadAction<number | undefined>) => {
			state.selectedJokeId = action.payload;
		},
		updateLocalJokesCursor: (state, action: PayloadAction<number>) => {
			state.localJokesCursor = action.payload;
		},
	},
});

export const {
	appendJokes,
	addJoke,
	deleteJoke,
	refreshJoke,
	selectJoke,
	updateLocalJokesCursor,
} = jokesSlice.actions;
export default jokesSlice.reducer;
