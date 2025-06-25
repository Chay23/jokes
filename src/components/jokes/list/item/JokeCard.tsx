import type { j } from '../../../../types';

import { memo } from 'react';
import { useAppDispatch } from '../../../../hooks/redux/hooks';
import { openModal } from '../../../../store/modals/modalsSlice';
import { refreshJoke, selectJoke } from '../../../../store/jokes/jokesSlice';
import { useLazyGetRandomJokeQuery } from '../../../../lib/data/jokes/jokes';
import useIsInViewport from '../../../../hooks/useIsInView';

import Heading from '../../../UI/headings/Heading';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import {
	Box,
	ButtonGroup,
	capitalize,
	Card,
	CardActions,
	CardContent,
	Grid,
	IconButton,
	Typography,
} from '@mui/material';

import { DELETE_JOKE_MODAL } from '../../../../lib/constants/modals/common';

type Props = {
	joke: j.Joke;
};

const MemoizedJokeCard = memo(function JokeCard({ joke }: Props) {
	const [getRandomJoke] = useLazyGetRandomJokeQuery();
	const dispatch = useAppDispatch();
	const { isInViewport, refCallback } = useIsInViewport();

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
		<Grid key={joke.id} size={1} ref={refCallback}>
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
					elevation={2}
				>
					<CardContent>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								marginBottom: 1,
							}}
						>
							<Typography variant='subtitle2'>
								Type: {capitalize(joke.type)}
							</Typography>
							<Typography variant='subtitle2'>ID: #{joke.id}</Typography>
						</Box>
						<Box>
							<Heading variant='h6'>Setup:</Heading>
							<Typography>{joke.setup}</Typography>
						</Box>
						<Box>
							<Heading variant='h6' sx={{ marginTop: 2 }}>
								Punchline:
							</Heading>
							<Typography>{joke.punchline}</Typography>
						</Box>
					</CardContent>
					<CardActions
						className='card-actions'
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							opacity: 0,
							visibility: 'hidden',
							transition: 'opacity 0.3s ease, visibility 0.3s ease',
						}}
					>
						<ButtonGroup variant='contained' size='small'>
							<IconButton
								sx={{ flex: 1 }}
								onClick={handleJokeRefresh}
								aria-labe='Refresh'
							>
								<RefreshIcon />
							</IconButton>
							<IconButton
								sx={{ flex: 1 }}
								color='error'
								onClick={handleDeleteModalOpen}
								aria-label='Delete'
							>
								<DeleteIcon />
							</IconButton>
						</ButtonGroup>
					</CardActions>
				</Card>
			)}
		</Grid>
	);
});

export default MemoizedJokeCard;
