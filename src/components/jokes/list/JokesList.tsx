import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { openModal } from '../../../store/modals/modalsSlice';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import JokeCard from './item/JokeCard';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';

import { CREATE_JOKE_MODAL } from '../../../lib/constants/modals/common';
import useIsInViewport from '../../../hooks/useIsInView';

export default function JokesList() {
	const jokes = useAppSelector((state) => state.jokes.jokesList);
	const dispatch = useAppDispatch();
	const { isInViewport, refCallback } = useIsInViewport();

	const handleCreateModalOpen = () => {
		dispatch(openModal(CREATE_JOKE_MODAL));
	};

	return (
		<>
			<Box
				sx={{ display: 'flex', justifyContent: 'end', marginBottom: 2 }}
				ref={refCallback}
			>
				{isInViewport && (
					<Button
						variant='contained'
						color='success'
						onClick={handleCreateModalOpen}
						startIcon={<AddIcon />}
					>
						New Joke
					</Button>
				)}
			</Box>
			<Grid container spacing={3} columns={{ xs: 1, sm: 2, md: 3, xl: 4 }}>
				{jokes.map((joke) => (
					<JokeCard key={joke.id} joke={joke} />
				))}
			</Grid>
		</>
	);
}
