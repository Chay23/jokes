import type { j } from '../../types';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLazyGetTenJokesQuery } from '../../lib/data/jokes/jokes';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks';
import {
	appendJokes,
	updateLocalJokesCursor,
} from '../../store/jokes/jokesSlice';

import Paper from '@mui/material/Paper';
import JokesError from './error/JokesError';
import JokesList from './list/JokesList';
import CreateJokeModal from './create/CreateJokeModal';
import LoadingJokes from './loading/LoadingJokes';
import DeleteJokeModal from './delete/DeleteJokeModal';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

import {
	MAX_RETRIES,
	MAX_JOKES_NUMBER,
} from '../../lib/constants/jokes/common';

export default function Jokes() {
	const [trigger, result] = useLazyGetTenJokesQuery();
	const localJokes = useAppSelector((state) => state.jokes.localJokes);
	const localJokesCursor = useAppSelector(
		(state) => state.jokes.localJokesCursor
	);
	const jokes = useAppSelector((state) => state.jokes.jokesList);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const maxRetries = useRef(0);
	const existingIds = useMemo(() => new Set(jokes.map((j) => j.id)), [jokes]);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (localJokes.length > MAX_JOKES_NUMBER) {
			dispatch(updateLocalJokesCursor(MAX_JOKES_NUMBER));
			dispatch(appendJokes(localJokes.slice(0, MAX_JOKES_NUMBER)));
			return;
		}
		trigger();
	}, []);

	useEffect(() => {
		const remainingLocalJokes = localJokes.slice(
			localJokesCursor,
			localJokesCursor + MAX_JOKES_NUMBER
		);

		if (remainingLocalJokes.length > MAX_JOKES_NUMBER) {
			dispatch(appendJokes(localJokes.slice(0, MAX_JOKES_NUMBER)));
			dispatch(updateLocalJokesCursor(localJokesCursor + MAX_JOKES_NUMBER));
			return;
		}

		if (!result.data) {
			setIsLoadingMore(false);
			return;
		}

		if (remainingLocalJokes.length) {
			appendUniqueJokes([
				...remainingLocalJokes,
				...result.data.slice(0, -remainingLocalJokes.length),
			]);
			dispatch(updateLocalJokesCursor(localJokes.length));
			return;
		}

		appendUniqueJokes(result.data);
	}, [result.data]);

	const handleLoadMore = () => {
		maxRetries.current = 0;
		setIsLoadingMore(true);
		trigger();
	};

	const appendUniqueJokes = (newJokes: j.Joke[]) => {
		const uniqueJokes = newJokes.filter((j) => !existingIds.has(j.id));

		if (maxRetries.current === MAX_RETRIES) {
			setIsLoadingMore(false);
			return;
		}
		if (uniqueJokes.length < newJokes.length) {
			maxRetries.current++;
			return trigger();
		}
		setIsLoadingMore(false);
		dispatch(appendJokes(newJokes));
	};

	return (
		<>
			<Paper elevation={2} sx={{ padding: 3 }}>
				{result.isError && <JokesError />}
				{result.isLoading && <LoadingJokes />}
				{!result.isError && (
					<>
						<JokesList />
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: 3,
							}}
						>
							<Button
								variant='contained'
								onClick={handleLoadMore}
								startIcon={
									isLoadingMore && (
										<CircularProgress color='inherit' size={20} />
									)
								}
							>
								Load More
							</Button>
							{maxRetries.current == MAX_RETRIES && (
								<Typography sx={{ marginTop: 2 }}>
									Amount of retries exceeded. Try to load more jokes again.
								</Typography>
							)}
						</Box>
					</>
				)}
			</Paper>
			<CreateJokeModal />
			<DeleteJokeModal />
		</>
	);
}
