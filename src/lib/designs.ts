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
    id: "winter",
    name: "Winter Collection",
    season: "DROP 01 — COLD SEASON",
    headline: "Made for grey light.",
    story:
      "Winter started as a mistake. A print left overnight in an unheated studio came out matte, dense, a little frostbitten at the edges — and it looked better than anything we had made on purpose. The pieces here keep that accident: thick shells, blunt spikes, surfaces that read like ice under a streetlamp. They are built for the months when a shoe is the only colour you are wearing.",
  },
  {
    id: "chrome",
    name: "Chrome Collection",
    season: "DROP 02 — MIRROR SERIES",
    headline: "Wear the reflection.",
    story:
      "Chrome is the loud one. Every piece is polished until the room shows up in it — pavement, headlights, the person walking next to you. We spent four months learning how to print a curve smooth enough to lie about being metal. These are for the nights you want to be noticed from the ankles down.",
  },
  {
    id: "raw",
    name: "Raw Collection",
    season: "DROP 03 — UNFINISHED",
    headline: "Left exactly as printed.",
    story:
      "No polishing, no coating, no hiding the layers. Raw pieces come off the plate, get a clip test, and ship. You can count the print lines with a fingernail. It is the most honest thing we make: an object that tells you exactly how it was born, and wears its age faster than anything else in the collection.",
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
    collection: "chrome",
    storyTitle: "The first one that held.",
    story:
      "Spike 01 was the eleventh attempt and the first that survived a full day of walking. Modelled from a sketch of a rib cage, thinned until it flexed, then thickened again where the laces pull hardest. It is still the piece we hand to people who have never worn one.",
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
    collection: "chrome",
    storyTitle: "Water, stopped mid-fall.",
    story:
      "We photographed rain landing on a windshield for two hours and picked one frame. Droplet is that frame, printed in resin and sanded through six grits until the highlight runs unbroken across the whole body. Quiet from a distance, impossible to ignore up close.",
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
    collection: "winter",
    storyTitle: "Armour for a soft object.",
    story:
      "A shoe is fabric and foam pretending to be tough. Carapace is the correction — a segmented shell that plates the lace line like an insect's back and moves with every step instead of fighting it. Fifty were printed. All fifty are gone.",
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
    collection: "winter",
    storyTitle: "A ring that catches streetlight.",
    story:
      "Steel-filled filament makes Halo heavier than it looks and colder than it should be. It sits above the tongue like a small orbit, and in low light it does the only trick we ever wanted from a printed part: it disappears, then flashes.",
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
    collection: "raw",
    storyTitle: "Built in one sitting.",
    story:
      "Fin was drawn, printed and worn out of the studio inside a single evening. Nothing about it has been smoothed since. Every layer line is where the machine left it, and the edge sharpens slightly with wear — the only piece we make that gets more aggressive over time.",
  },
];
