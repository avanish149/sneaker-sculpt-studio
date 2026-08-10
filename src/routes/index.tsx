import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Shop } from "@/components/site/Shop";
import { CustomBuild } from "@/components/site/CustomBuild";
import { About } from "@/components/site/About";
import { Footer } from "@/components/site/Footer";

const title = "NAME — 3D-Printed Shoe Attachments, Made to Order";
const description =
  "NAME 3D-prints small sculptural attachments for the front of your sneakers. One-of-one pieces, printed to order.";

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
      <Nav />
      <main>
        <Hero />
        <Shop />
        <CustomBuild />
        <About />
      </main>
      <Footer />
    </div>
  );
}
