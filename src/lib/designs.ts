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
};

export const DESIGNS: Design[] = [
  { id: "spike", code: "NAME SPIKE_001_CHROME", name: "Spike 01", label: "[PLACEHOLDER DESIGN 1]", price: "$180", material: "Chrome nylon", img: d1, size: 130 },
  { id: "droplet", code: "NAME DROPLET_002_RESIN", name: "Droplet", label: "[PLACEHOLDER DESIGN 2]", price: "$140", material: "Polished resin", img: d2, size: 120 },
  { id: "carapace", code: "NAME CARAPACE_003_CHROME", name: "Carapace", label: "[PLACEHOLDER DESIGN 3]", price: "$260", material: "Chrome nylon", img: d3, size: 150, status: "sold" },
  { id: "halo", code: "NAME HALO_004_STEEL", name: "Halo", label: "[PLACEHOLDER DESIGN 4]", price: "$220", material: "Steel-filled", img: d4, size: 135, status: "soon" },
  { id: "fin", code: "NAME FIN_005_RAW", name: "Fin", label: "[PLACEHOLDER DESIGN 5]", price: "$160", material: "Raw nylon", img: d5, size: 115 },
];

