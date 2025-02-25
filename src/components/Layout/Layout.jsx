import { Suspense } from 'react';
import Header from '../Header/Header.jsx';

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={null}>{children}</Suspense>
      </main>
    </>
  );
};
