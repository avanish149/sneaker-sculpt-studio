import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { Archive } from "@/components/site/Archive";
import { Fabricator } from "@/components/site/Fabricator";
import { Process } from "@/components/site/Process";
import { Manifesto } from "@/components/site/Manifesto";
import { Footer } from "@/components/site/Footer";
import { CustomCursor } from "@/components/site/primitives";

const title = "NAME — 3D-Printed Sneaker Armor, Made to Order";
const description =
  "NAME designs and 3D-prints custom shoe mods: sculptural lace-to-tongue armor, printed on demand in nylon, resin, or titanium composite.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <Features />
        <Archive />
        <Fabricator />
        <Process />
        <Manifesto />
      </main>
      <Footer />
    </div>
  );
}
