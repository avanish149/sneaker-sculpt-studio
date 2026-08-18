import d1 from "@/assets/design-1.png";
import d2 from "@/assets/design-2.png";
import d3 from "@/assets/design-3.png";
import d4 from "@/assets/design-4.png";
import d5 from "@/assets/figurine.png";

export type Design = {
  id: string;
  name: string;
  label: string;
  price: string;
  material: string;
  code: string;
  img: string;
  size: number;
  status?: "soon" | "sold";
  collection: string;
  storyTitle: string;
  story: string;
};

export type Collection = {
  id: string;
  name: string;
  season: string;
  headline: string;
  story: string;
};

export const COLLECTIONS: Collection[] = [
  {
    id: "season-0",
    name: "Season 0",
    season: "SEASON 0 — COLD START",
    headline: "Made for grey light.",
    story:
      "Matte, dense finishes with blunt edges. Thick shells built for grey light and cold months.",
  },
  {
    id: "season-1",
    name: "Season 1",
    season: "SEASON 1 — MIRROR SERIES",
    headline: "Wear the reflection.",
    story:
      "Polished until the room shows up in it. Smooth mirrored curves for nights out.",
  },
  {
    id: "season-2",
    name: "Season 2",
    season: "SEASON 2 — UNFINISHED",
    headline: "Left exactly as printed.",
    story:
      "Straight off the print plate. Visible layer lines, no coating, no polishing.",
  },
];

export const DESIGNS: Design[] = [
  {
    id: "spike",
    code: "NAME SPIKE_001_CHROME",
    name: "Spike 01",
    label: "[PLACEHOLDER DESIGN 1]",
    price: "$180",
    material: "Chrome nylon",
    img: d1,
    size: 130,
    collection: "season-1",
    storyTitle: "Flexible rib profile",
    story:
      "Rib-cage geometry, thinned to flex and reinforced where the laces pull hardest. Our most forgiving fit.",
  },
  {
    id: "droplet",
    code: "NAME DROPLET_002_RESIN",
    name: "Droplet",
    label: "[PLACEHOLDER DESIGN 2]",
    price: "$140",
    material: "Polished resin",
    img: d2,
    size: 120,
    collection: "season-1",
    storyTitle: "Hand-polished resin",
    story:
      "Resin sanded through six grits so the highlight runs unbroken. Quiet from afar, sharp up close.",
  },
  {
    id: "carapace",
    code: "NAME CARAPACE_003_CHROME",
    name: "Carapace",
    label: "[PLACEHOLDER DESIGN 3]",
    price: "$260",
    material: "Chrome nylon",
    img: d3,
    size: 150,
    status: "sold",
    collection: "season-0",
    storyTitle: "Segmented lace-line shell",
    story:
      "A segmented shell that plates the lace line and flexes with every step. Limited run of fifty.",
  },
  {
    id: "halo",
    code: "NAME HALO_004_STEEL",
    name: "Halo",
    label: "[PLACEHOLDER DESIGN 4]",
    price: "$220",
    material: "Steel-filled",
    img: d4,
    size: 135,
    status: "soon",
    collection: "season-0",
    storyTitle: "Steel-filled halo",
    story:
      "Steel-filled and heavier than it looks. Sits above the tongue and catches low light.",
  },
  {
    id: "fin",
    code: "NAME FIN_005_RAW",
    name: "Fin",
    label: "[PLACEHOLDER DESIGN 5]",
    price: "$160",
    material: "Raw nylon",
    img: d5,
    size: 115,
    collection: "season-2",
    storyTitle: "Unfinished raw nylon",
    story:
      "Unsmoothed nylon with every layer line intact. The edge sharpens slightly with wear.",
  },
];
