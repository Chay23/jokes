import type { j } from '../../../../types';

import { memo } from 'react';
import { useAppDispatch } from '../../../../hooks/redux/hooks';
import { openModal } from '../../../../store/modals/modalsSlice';
import { refreshJoke, selectJoke } from '../../../../store/jokes/jokesSlice';
import { useLazyGetRandomJokeQuery } from '../../../../lib/data/jokes/jokes';

import Heading from '../../../UI/headings/Heading';
import {
	Box,
	Button,
	ButtonGroup,
	capitalize,
	Card,
	CardActions,
	CardContent,
	Grid,
	Typography,
} from '@mui/material';

import {
	CREATE_JOKE_MODAL,
	DELETE_JOKE_MODAL,
} from '../../../../lib/constants/modals/common';
import useIsInViewport from '../../../../hooks/useIsInView';

type Props = {
	joke: j.Joke;
};

const MemoizedJokeCard = memo(function JokeCard({ joke }: Props) {
	const [getRandomJoke] = useLazyGetRandomJokeQuery();
	const dispatch = useAppDispatch();
	const { isInViewport, refCallback } = useIsInViewport();

	const handleCreateModalOpen = () => {
		dispatch(openModal(CREATE_JOKE_MODAL));
	};

	const handleDeleteModalOpen = () => {
		dispatch(selectJoke(joke.id));
		dispatch(openModal(DELETE_JOKE_MODAL));
	};

	const handleJokeRefresh = async () => {
		try {
			const newJoke = await getRandomJoke().unwrap();
			dispatch(selectJoke(joke.id));
			dispatch(refreshJoke(newJoke));
		} catch (error) {
			console.error('Failed to refresh the joke:', error);
		}
	};

	return (
		<Grid key={joke.id} size={{ xs: 3 }} ref={refCallback}>
			{isInViewport && (
				<Card
					sx={{
						padding: 2,
						position: 'relative',
						'&:hover .card-actions': {
							opacity: 1,
							visibility: 'visible',
						},
					}}
				>
					<CardContent>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								marginBottom: 1,
							}}
						>
							<Heading variant='h6'>Type: {capitalize(joke.type)}</Heading>
							<Heading variant='h6'>ID: #{joke.id}</Heading>
						</Box>
						<Box>
							<Heading variant='h6'>Setup:</Heading>
							<Typography>{joke.setup}</Typography>
						</Box>
						<Box>
							<Heading variant='h6'>Punchline:</Heading>
							<Typography>{joke.punchline}</Typography>
						</Box>
					</CardContent>
					<CardActions
						className='card-actions'
						sx={{
							opacity: 0,
							visibility: 'hidden',
							transition: 'opacity 0.3s ease, visibility 0.3s ease',
						}}
					>
						<ButtonGroup variant='contained'>
							<Button onClick={handleDeleteModalOpen}>Delete</Button>
							<Button onClick={handleCreateModalOpen}>Add</Button>
							<Button onClick={handleJokeRefresh}>Refresh</Button>
						</ButtonGroup>
					</CardActions>
				</Card>
			)}
		</Grid>
	);
});

export default MemoizedJokeCard;
