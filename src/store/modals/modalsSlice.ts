import type { store } from '../../types';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: store.ModalsState = {
	modals: {},
};

const jokesSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<string>) => {
			state.modals[action.payload] = { isOpen: true };
		},
		closeModal: (state, action: PayloadAction<string>) => {
			if (state.modals[action.payload]) {
				state.modals[action.payload] = { isOpen: false };
			}
		},
	},
});

export const { openModal, closeModal } = jokesSlice.actions;
export default jokesSlice.reducer;
