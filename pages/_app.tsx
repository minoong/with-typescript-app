import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import GlobalStyle from '../styles/Global';

const _app = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<GlobalStyle />
			<Component {...pageProps} />
		</>
	);
};

export default _app;
