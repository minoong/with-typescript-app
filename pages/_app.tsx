import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import GlobalStyle from '../styles/GlobalStyle';
import CssBaseline from '@material-ui/core/CssBaseline';
import wrapper from '../store';

const _app = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<GlobalStyle />
			<CssBaseline />
			<Component {...pageProps} />
			<div id="root-modal" />
		</>
	);
};

export default wrapper.withRedux(_app);
