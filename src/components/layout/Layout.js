import React, { useState, useMemo } from 'react';
import { throttle } from "lodash";
import useDimensions from 'react-cool-dimensions';
import Head from 'next/head';
import Script from 'next/script';
import Header from './Header';
import Footer from './Footer';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
// import '../styles/style.css';
import $ from 'jquery';
import { useEffect } from 'react';

export default function Layout({ pageTitle = null, description = null, children = null, appendClass }) {
  const mobileMenuBreakpoint = 800;
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const { observe, unobserve } = useDimensions({
    onResize: useMemo(
      () =>
        throttle(({ observe, unobserve, width }) => {
          setIsMobileMenu(width <= mobileMenuBreakpoint);
          unobserve();
          observe();
        }, 300),
      []
    ),
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.$ = window.jQuery = $;
      require('owl.carousel');
    }
  }, []);
  // Dynamic title and description
  let title = "SOMTEL-Somalia";
  if (pageTitle) title += ' | ' + pageTitle;

  if (!description) description = "SOMTEL-Somalia.";

  let className = "";
  if (appendClass) className += ' ' + appendClass;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes" />
        <link rel="icon" type="image/png" sizes="56x56" href="/assets/images/fav-icon/icon.png" />
        
        {/* Font Awesome CDN */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          rel="stylesheet"
        />
      </Head>

    

      {/* Modernizr script using Next.js Script component */}
      <Script 
        src="/assets/js/vendor/modernizr-3.5.0.min.js" 
        strategy="beforeInteractive" 
      />

      <div id="app-wrapper" ref={observe}>
        
        <div id="page-wrapper" className={className}>
          <Header  />
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}