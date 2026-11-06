import { images } from "./images.js";

// Mockup video preview for reel playback
const MOCKUP_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

export const reels = [
  {
    id: "reel-01",
    src: MOCKUP_VIDEO,
    poster: images.reelPosters[0].src,
    alt: images.reelPosters[0].alt,
    position: images.reelPosters[0].position,
    views: "14.2K",
    caption: "Pulling a single pass 3RL line with zero wobble",
    style: "Fine Line",
    igUrl: "https://instagram.com",
  },
  {
    id: "reel-02",
    src: MOCKUP_VIDEO,
    poster: images.reelPosters[1].src,
    alt: images.reelPosters[1].alt,
    position: images.reelPosters[1].position,
    views: "38.5K",
    caption: "Smooth greywash fade technique on bicep piece",
    style: "Black & Grey",
    igUrl: "https://instagram.com",
  },
  {
    id: "reel-03",
    src: MOCKUP_VIDEO,
    poster: images.reelPosters[2].src,
    alt: images.reelPosters[2].alt,
    position: images.reelPosters[2].position,
    views: "22.9K",
    caption: "Ribcage stencil placement walkthrough",
    style: "Fine Line",
    igUrl: "https://instagram.com",
  },
  {
    id: "reel-04",
    src: MOCKUP_VIDEO,
    poster: images.reelPosters[3].src,
    alt: images.reelPosters[3].alt,
    position: images.reelPosters[3].position,
    views: "41.0K",
    caption: "Solid black packing without trauma or blowouts",
    style: "Blackwork",
    igUrl: "https://instagram.com",
  },
  {
    id: "reel-05",
    src: MOCKUP_VIDEO,
    poster: images.reelPosters[4].src,
    alt: images.reelPosters[4].alt,
    position: images.reelPosters[4].position,
    views: "18.3K",
    caption: "Micro realism iris detail done in one 3h session",
    style: "Realism",
    igUrl: "https://instagram.com",
  },
  {
    id: "reel-06",
    src: MOCKUP_VIDEO,
    poster: images.reelPosters[5].src,
    alt: images.reelPosters[5].alt,
    position: images.reelPosters[5].position,
    views: "29.7K",
    caption: "The mirror reveal moment: collarbone flora",
    style: "Fine Line",
    igUrl: "https://instagram.com",
  },
];

export default reels;