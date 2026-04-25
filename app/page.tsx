import { toHtmlRoute } from "@/lib/html-pages";

export default function HomePage() {
  return (
    <iframe
      title="NeoChef Accueil"
      src={toHtmlRoute("index.html")}
      style={{ border: 0, width: "100%", height: "100vh", display: "block" }}
    />
  );
}
