import { notFound } from "next/navigation";
import { htmlFileExists, toHtmlRoute } from "@/lib/html-pages";

type SlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const fileName = slug.endsWith(".html") ? slug : `${slug}.html`;

  if (!htmlFileExists(fileName)) {
    notFound();
  }

  return (
    <iframe
      title={`NeoChef ${slug}`}
      src={toHtmlRoute(fileName)}
      style={{ border: 0, width: "100%", height: "100vh", display: "block" }}
    />
  );
}
