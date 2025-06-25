import { closeModal } from '../../../store/modals/modalsSlice';
import { useAppDispatch } from '../../../hooks/redux/hooks';
import { useForm } from 'react-hook-form';
import { addJoke } from '../../../store/jokes/jokesSlice';

import { Box, Button, TextField } from '@mui/material';
import Modal from '../../modals/Modal';
import Heading from '../../UI/headings/Heading';

import { CREATE_JOKE_MODAL } from '../../../lib/constants/modals/common';

type Input = {
	type: string;
	setup: string;
	punchline: string;
};

export default function CreateJokeModal() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		reset,
	} = useForm<Input>({ defaultValues: { type: '', setup: '', punchline: '' } });
	const dispatch = useAppDispatch();

	const handleModalClose = () => {
		dispatch(closeModal(CREATE_JOKE_MODAL));
		reset();
	};

	const onFormSubmit = () => {
		dispatch(
			addJoke({
				id: Date.now(),
				...getValues(),
			})
		);
		handleModalClose();
	};

	return (
		<Modal
			id={CREATE_JOKE_MODAL}
			onClose={handleModalClose}
			sx={{ minWidth: 400 }}
		>
			<Box sx={{ display: 'flex' }}>
				<Heading variant='h5'>Create a new joke</Heading>
			</Box>
			<Box
				component='form'
				sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
				onSubmit={handleSubmit(onFormSubmit)}
			>
				<TextField
					label='Type'
					{...register('type', {
						required: 'You need to enter the type of joke',
					})}
					error={!!errors.type}
					helperText={errors.type ? errors.type.message : ''}
				/>
				<TextField
					label='Setup'
					{...register('setup', {
						required: 'You need to enter the setup of the joke',
					})}
					error={!!errors.setup}
					helperText={errors.setup ? errors.setup.message : ''}
				/>
				<TextField
					label='Punchline'
					{...register('punchline', {
						required: 'You need to enter the punchline of the joke',
					})}
					error={!!errors.punchline}
					helperText={errors.punchline ? errors.punchline.message : ''}
				/>
				<Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
					<Button variant='contained' type='submit'>
						Create
					</Button>
					<Button variant='contained' color='error' onClick={handleModalClose}>
						Cancel
					</Button>
				</Box>
			</Box>
		</Modal>
	);
}
