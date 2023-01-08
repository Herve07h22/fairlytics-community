import Head from "next/head";

export const SEO: React.FC<{ title?: string }> = ({ title }) => (
  <Head>
    <title>{title || "Fairlytics - mesure d'audience sans traceur."}</title>

    <meta
      name="description"
      content="Fairlytics est un outil de mesure d'audience respecteux de la vie privée des utilisateurs. Il est 100% sans cookie."
    />
    <link rel="canonical" href="https://fairlytics.tech" />

    <meta name="theme-color" content="#ffffff" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@07h22news" />
    <meta
      name="twitter:title"
      content="Fairlytics - mesure d'audience sans traceur."
    />
    <meta
      name="twitter:description"
      content="Fairlytics est un outil de mesure d'audience respecteux de la vie privée des utilisateurs. Il est 100% sans cookie."
    />
    <meta
      name="twitter:image"
      content="https://fairlytics.tech/images/twitter_large.png"
    />
    <meta name="twitter:creator" content="@07h22news" />

    <meta property="og:url" content="https://fairlytics.tech" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="Fairlytics" />
    <meta
      property="og:description"
      content="Fairlytics est un outil de mesure d'audience respecteux de la vie privée des utilisateurs. Il est 100% sans cookie."
    />
    <meta
      property="og:image"
      content="https://fairlytics.tech/images/twitter_large.png"
    />
  </Head>
);
