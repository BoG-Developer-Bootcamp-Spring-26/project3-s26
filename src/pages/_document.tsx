import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      className={`h-full antialiased`}
    >
      <Head>
       <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Heebo:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="min-h-full flex flex-col">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}