import * as React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { AppLink } from "../components/components";

export default function Home({ pageLinks }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {pageLinks.map((page) => (
          <AppLink key={page.href} {...page} />
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3001/pages");
  const pages = await res.json();

  return {
    props: {
      pageLinks: pages.map(({ title, slug }) => ({ label: title, href: slug })),
    },
  };
}
