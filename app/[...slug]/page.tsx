import { notFound, redirect } from "next/navigation";

import { getBlogPostBySlug } from "@/lib/blog";

type CatchAllProps = {
  params: Promise<{ slug: string[] }>;
};

const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");

const safeDecode = (value: string): string => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const buildCandidates = (segments: string[]): string[] => {
  const rawJoined = segments.join("-");
  const decodedSegments = segments.map(safeDecode);
  const decodedJoined = decodedSegments.join("-");
  const rawLeaf = segments[segments.length - 1] ?? "";
  const decodedLeaf = decodedSegments[decodedSegments.length - 1] ?? "";

  const variants = [
    toSlug(decodedJoined),
    toSlug(rawJoined),
    toSlug(rawJoined.replace(/%/g, "")),
    toSlug(decodedLeaf),
    toSlug(rawLeaf),
    toSlug(rawLeaf.replace(/%/g, "")),
  ];

  return Array.from(new Set(variants.filter(Boolean)));
};

export default async function LegacyRedirectCatchAll({ params }: CatchAllProps) {
  const { slug } = await params;
  if (!slug?.length) {
    notFound();
  }

  const candidates = buildCandidates(slug);
  for (const candidate of candidates) {
    const post = await getBlogPostBySlug(candidate);
    if (post?.slug) {
      redirect(`/blog/${post.slug}`);
    }
  }

  notFound();
}
