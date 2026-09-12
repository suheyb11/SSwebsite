import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* You can add scripts with beforeInteractive strategy here */}
        {/* <script src="/assets/js/vendor/modernizr-3.5.0.min.js" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}