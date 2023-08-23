import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='preload'
          href='/fonts/inter-var-latin.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
        <link rel='preload' href='/images/pack-A.png' as='image' />
        <link rel='preload' href='/images/pack-B.png' as='image' />
        <link rel='preload' href='/images/pack-C.png' as='image' />
      </Head>
      <body style={{ background: '#1D1D1F' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
