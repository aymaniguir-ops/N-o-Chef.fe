import fs from "node:fs";
import path from "node:path";

export default function HomePage() {
  const htmlPath = path.join(process.cwd(), "index.html");
  const html = fs.readFileSync(htmlPath, "utf8");

  return (
    <iframe
      title="NeoChef Accueil"
      srcDoc={html}
      style={{ border: 0, width: "100%", height: "100vh", display: "block" }}
    />
  );
}
