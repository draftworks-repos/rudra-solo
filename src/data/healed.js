import { images } from "./images.js";

export const healed = [
  {
    id: "healed-01",
    title: "Botanical Olive & Thistle",
    placement: "Forearm",
    healingTime: "Healed 6 months",
    fresh: images.healed[0].fresh,
    healed: images.healed[0].healed,
    featured: true, // larger card in asymmetric layout
  },
  {
    id: "healed-02",
    title: "Greywash Lion Portrait",
    placement: "Upper Arm",
    healingTime: "Healed 6 months",
    fresh: images.healed[1].fresh,
    healed: images.healed[1].healed,
    featured: false,
  },
  {
    id: "healed-03",
    title: "Saturated Tribal Sigil",
    placement: "Calf",
    healingTime: "Healed 6 months",
    fresh: images.healed[2].fresh,
    healed: images.healed[2].healed,
    featured: false,
  },
];

export default healed;
