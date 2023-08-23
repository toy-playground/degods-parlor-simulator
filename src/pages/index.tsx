import * as React from 'react';

import NoSSR from '@/components/NoSSR';

import MainView from '@/pages/views/Main';
// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <NoSSR>
      <MainView />
    </NoSSR>
  );
}
