import type { j } from "../..";

export type JokesState = {
	localJokes: j.Joke[];
	jokesList: j.Joke[];
	localJokesCursor: number;
	selectedJokeId: number | undefined;
};
