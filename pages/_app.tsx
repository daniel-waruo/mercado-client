import * as React from 'react';
import Head from 'next/head';
import {AppProps as BaseAppProps} from 'next/app';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';
import '../styles/PrettyPage.css'
import {NoSsr} from "@mui/material";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface AppProps extends BaseAppProps {
  emotionCache?: EmotionCache;
}

function App(props: AppProps) {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main}/>
        <title>Patterns General Traders</title>
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline/>
        <NoSsr>
          <Component {...pageProps} />
        </NoSsr>
      </ThemeProvider>

      <a style={{display: 'none'}} href="https://icons8.com/icon/tFqJwV9rQV9k/order">Order icon by Icons8</a>
    </CacheProvider>
  );
}


export default App
