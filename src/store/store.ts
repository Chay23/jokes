import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { jokesApi } from '../lib/data/jokes/jokes';
import jokesReducer from './jokes/jokesSlice';
import modalsReducer from './modals/modalsSlice';

export const store = configureStore({
	reducer: {
		modals: modalsReducer,
		jokes: jokesReducer,
		[jokesApi.reducerPath]: jokesApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(jokesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
