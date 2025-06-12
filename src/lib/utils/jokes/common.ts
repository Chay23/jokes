import type { j } from '../../../types';
import { LOCAL_STORAGE_USER_JOKES } from '../../constants/jokes/common';

export const syncLocalJokes = (jokes: j.Joke[]) => {
	localStorage.setItem(LOCAL_STORAGE_USER_JOKES, JSON.stringify(jokes));
};

export const removeIfLocalJoke = (
	localJokes: j.Joke[],
	id: number,
	cursor: number
) => {
	const localIndex = localJokes.findIndex((joke) => joke.id === id);
	if (localIndex === -1) {
		return { updatedLocalJokes: localJokes, updatedLocalCursor: cursor };
	}
	const updatedLocalJokes = localJokes.filter((item) => item.id !== id);
	const updatedLocalCursor = cursor >= localIndex ? cursor - 1 : cursor;

	syncLocalJokes(updatedLocalJokes);

	return { updatedLocalJokes, updatedLocalCursor };
};
