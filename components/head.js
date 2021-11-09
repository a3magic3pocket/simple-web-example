import Head from "next/head";

export default function CustomHead({ title, description }) {
  const joinedTitle = `SIMPLE-LOCKER - ${title}`;
  return (
    <Head>
      <meta charset="utf-8" />
      <title>{joinedTitle}</title>
      <meta name="author" content="a3magic3pocket" />
      <meta name="description" content={description} />
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      <link rel="icon" href="favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon-precomposed" href="favicon.ico" />
      <meta property="og:title" content={joinedTitle} />
      <meta property="og:image" content="favicon.ico" />
      <meta property="og:description" content={description} />
    </Head>
  );
}
