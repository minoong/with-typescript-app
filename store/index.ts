import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';
import rootReducer from './modules';

const makeStore = () =>
	configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
		devTools: process.env.NODE_ENV !== 'production',
	});

const wrapper = createWrapper(makeStore, {
	debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
