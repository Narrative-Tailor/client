import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <link href="https://hangeul.pstatic.net/hangeul_static/css/maru-buri.css" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
