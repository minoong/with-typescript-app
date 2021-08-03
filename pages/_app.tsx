import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import GlobalStyle from '../styles/GlobalStyle';
import CssBaseline from '@material-ui/core/CssBaseline';
import wrapper from '../store';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';

const _app = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			</Head>
			<GlobalStyle />
			<CssBaseline />
			<RecoilRoot>
				<Component {...pageProps} />
			</RecoilRoot>
			<div id="root-modal" />
		</>
	);
};

export default wrapper.withRedux(_app);
