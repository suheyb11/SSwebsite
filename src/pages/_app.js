import React from 'react';
import NextNProgress from "nextjs-progressbar";


import '../styles/globals.css'; 
import '../styles/style.css'; 
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


export default function App({ Component, pageProps }) {
  return (
    <>
      <NextNProgress />
      <Component {...pageProps} />
    </>
  )
}






