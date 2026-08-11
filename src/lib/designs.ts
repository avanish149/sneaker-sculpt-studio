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
  img: string;
  size: number;
};

export const DESIGNS: Design[] = [
  { id: "spike", name: "Spike 01", label: "[PLACEHOLDER DESIGN 1]", price: "$180", material: "Chrome nylon", img: d1, size: 130 },
  { id: "droplet", name: "Droplet", label: "[PLACEHOLDER DESIGN 2]", price: "$140", material: "Polished resin", img: d2, size: 120 },
  { id: "carapace", name: "Carapace", label: "[PLACEHOLDER DESIGN 3]", price: "$260", material: "Chrome nylon", img: d3, size: 150 },
  { id: "halo", name: "Halo", label: "[PLACEHOLDER DESIGN 4]", price: "$220", material: "Steel-filled", img: d4, size: 135 },
  { id: "fin", name: "Fin", label: "[PLACEHOLDER DESIGN 5]", price: "$160", material: "Raw nylon", img: d5, size: 115 },
];
