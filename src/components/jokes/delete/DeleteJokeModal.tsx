import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { deleteJoke, selectJoke } from '../../../store/jokes/jokesSlice';
import { closeModal } from '../../../store/modals/modalsSlice';

import { Box, Button, Typography } from '@mui/material';
import Heading from '../../UI/headings/Heading';
import Modal from '../../modals/Modal';

import { DELETE_JOKE_MODAL } from '../../../lib/constants/modals/common';

export default function DeleteJokeModal() {
	const dispatch = useAppDispatch();
	const jokeId = useAppSelector((state) => state.jokes.selectedJokeId);

	const handleModalClose = () => {
		dispatch(closeModal(DELETE_JOKE_MODAL));
	};

	const handleJokeDelete = () => {
		if (!jokeId) {
			return;
		}
		dispatch(deleteJoke());
		dispatch(selectJoke(undefined));
		handleModalClose();
	};

	return (
		<Modal id={DELETE_JOKE_MODAL} onClose={handleModalClose}>
			<Heading variant='h5' sx={{ marginBottom: 1, textAlign: 'center' }}>
				Are you sure you want to delete the joke?
			</Heading>
			<Typography
				variant='subtitle1'
				sx={{ marginBottom: 2 }}
				color='textSecondary'
			>
				Confirm that you want to delete the joke
			</Typography>
			<Box sx={{ display: 'flex', gap: 1 }}>
				<Button variant='contained' onClick={handleJokeDelete}>
					Delete
				</Button>
				<Button variant='contained' color='error' onClick={handleModalClose}>
					Cancel
				</Button>
			</Box>
		</Modal>
	);
}
