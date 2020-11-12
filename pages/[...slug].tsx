import * as React from "react";
import Head from "next/head";
import { Primary } from "../layouts/primary";
import { Secondary } from "../layouts/secondary";
import { AppLink, Box, RichText } from "../components/components";
import { useRouter } from "next/router";

const layoutMap = {
  primary: Primary,
  secondary: Secondary,
};

type LayoutType = keyof typeof layoutMap;

function getLayout(page: PageProps) {
  return layoutMap[page.layout];
}

const componentMap = {
  Link: AppLink,
  Box,
  RichText,
};

type ComponentModel = {
  id: keyof typeof componentMap;
  props: any;
  components: ComponentModel[];
};

function getComponents(models: ComponentModel[]) {
  if (!models) {
    return null;
  }

  return models.map(getComponent);
}

function getComponent(model: ComponentModel, index: number) {
  const Component = componentMap[model.id];

  if (!Component) {
    console.warn(`Component with id ${model.id} not found.`);
    return null;
  }

  return (
    <Component
      {...model.props}
      slot={model.components && getComponents(model.components)}
      key={index}
    />
  );
}

type PageProps = {
  title: string;
  slug: string;
  layout: LayoutType;
  components: ComponentModel[];
  timestamp: number;
};

function MyPage(props: PageProps) {
  const router = useRouter();
  const Layout = getLayout(props);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div>Page generated at: {props.timestamp}</div>
      <Layout>{getComponents(props.components)}</Layout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3001/pages?slug=${params.slug}`, {
    headers: { Accept: "application/json" },
  });

  const [page] = (await res.json()) || [];

  return {
    props: {
      ...page,
      timestamp: new Date().toLocaleTimeString("da-DK", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }),
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  // Call an external API endpoint to get pages
  const res = await fetch("http://localhost:3001/pages");
  const pages = await res.json();

  // Get the paths we want to pre-render based on pages
  const paths = pages.map((page) => `/${page.slug}`);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

export default MyPage;
