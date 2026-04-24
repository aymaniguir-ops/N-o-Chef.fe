import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";

type SlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const fileName = slug.endsWith(".html") ? slug : `${slug}.html`;
  const htmlPath = path.join(process.cwd(), fileName);

  if (!fs.existsSync(htmlPath)) {
    notFound();
  }

  const html = fs.readFileSync(htmlPath, "utf8");

  return (
    <iframe
      title={`NeoChef ${slug}`}
      srcDoc={html}
      style={{ border: 0, width: "100%", height: "100vh", display: "block" }}
    />
  );
}
