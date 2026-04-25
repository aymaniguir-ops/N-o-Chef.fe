import { NextResponse } from "next/server";
import { readHtmlFile } from "@/lib/html-pages";

type HtmlRouteContext = {
  params: Promise<{ slug: string[] }>;
};

export async function GET(_: Request, { params }: HtmlRouteContext) {
  const { slug } = await params;
  const fileName = slug.join("/");
  const html = readHtmlFile(fileName);

  if (!html) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
