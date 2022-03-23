import React from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-xl min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
