import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import React from 'react';

import '@rainbow-me/rainbowkit/styles.css';
import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <ThemeProvider attribute='class'>
      {mounted && <Component {...pageProps} />}
    </ThemeProvider>
  );
}

export default MyApp;
