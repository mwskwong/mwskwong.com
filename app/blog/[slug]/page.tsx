import { Metadata, ResolvingMetadata } from "next";
import { FC } from "react";

import getBlogBySlug from "@/lib/get-blog";
import getBlogs from "@/lib/get-blogs";

interface Props {
  params: { slug: string };
}

const Blog: FC<Props> = async ({ params: { slug } }) => {
  const blog = await getBlogBySlug(slug);
  console.log(blog);
  return <div>Blog {slug}</div>;
};

export const generateStaticParams = () =>
  getBlogs().then((blogs) => blogs.map(({ slug }) => ({ slug })));

export const generateMetadata = async (
  { params: { slug } }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const blog = await getBlogBySlug(slug);
  const path = `/blog/${slug}`;
  const { openGraph } = await parent;

  // TODO: add description
  return {
    title: blog.title,
    openGraph: {
      ...openGraph,
      title: blog.title,
      url: path,
      images: blog.coverPhoto,
    },
    alternates: { canonical: path },
  };
};

export default Blog;
