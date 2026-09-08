// Real EPA/KY Training brand assets, sourced from the client's existing
// eliteplayeracademy.com (hosted on base44 media CDN). Reused here — same
// brand, same client — rather than re-shot. Swap to self-hosted/compressed
// copies in /public if hotlinking becomes a reliability concern.
const CDN = "https://media.base44.com/images/public/6a0acf4385f6e39962b7107f";
const APP_CDN = "https://base44.app/api/apps/6a0acf4385f6e39962b7107f/files/mp/public/6a0acf4385f6e39962b7107f";

export const logo = `${CDN}/e1f6fe655_UntitledLogo.png`;
export const logoAlt = `${CDN}/cbd1e38a7_UntitledLogo1.png`;

// NOTE: no standalone founder headshot was found among the site's <img> assets —
// Kian only appears as a video frame inside the VSL itself. These two are
// match-action proof photography (same pool as proofGrid), used here purely
// as decorative atmosphere behind the Exclusive/Manifesto sections, per the
// funnel architecture's "proof as texture, not a literal portrait" pattern.
// Swap in a real founder headshot when the client supplies one.
export const atmosphereTextureA = `${APP_CDN}/31f78298e_a0a8521e-f246-416c-854c-6ad2c650ecc7.JPG`;
export const atmosphereTextureB = `${APP_CDN}/d8c2a892e_69e077a7-2b6d-4d08-ab82-a34c94899ce3.JPG`;

export const proofGrid = [
  `${CDN}/77d010ea8_97443833-49b3-4525-828c-5a1de57acf5b.jpg`,
  `${CDN}/5210843e0_3a914a9c-c82a-4a30-a420-b807ae5957e5.jpg`,
  `${CDN}/f44ed3660_b93e3d4c-034c-427e-9df3-8dbe1eb54d0d.jpg`,
  `${CDN}/5e6a49186_c5c39eec-b5f3-4469-86c2-37ecaeffbaf6.jpg`,
  `${CDN}/7e5202cdb_IMG_9497.jpg`,
  `${CDN}/56efa4908_DSC04111.jpg`,
  `${CDN}/1c2ac24ab_CF3A7035.jpg`,
  `${CDN}/f7b63d2e6_CF3A7407.jpg`,
  `${CDN}/751b01e1a_IMG_2400.jpg`,
  `${CDN}/5f64f0b6f_IMG_0035.jpg`,
  `${CDN}/0861f7455_IMG_0232.jpg`,
  `${CDN}/df2a04b8d_IMG_0263.jpg`,
];

export const testimonials = [
  {
    name: "Jesús Barea",
    tag: "MLS · Real Salt Lake · First Round Pick #19",
    role: "Real Salt Lake · MLS",
    photo: `${CDN}/e10490c13_2ed2c8d8-3d51-43f1-99b9-9f438e119546.jpg`,
    quote: null as string | null,
  },
  {
    name: "Harry Jolley",
    tag: "USL League 1 · Chattanooga Red Wolves SC",
    role: "Chattanooga Red Wolves SC · USL League 1",
    photo: `${CDN}/e8e5ee8f4_9b4686f8-c3c0-48ff-a5f6-567aa6f5e24f.jpg`,
    quote: null as string | null,
  },
  {
    name: "Alex Matthews",
    tag: "NCAA Division 1 All-American · Indiana University",
    role: "Indiana University · Central Midfielder",
    photo: `${CDN}/2acf8430a_be903a79-c93d-4197-803e-1d884202840e.jpg`,
    quote:
      "In my time at Missouri State, I was one of a few players who both played with and was coached by Kian. As a player, I looked up to him and paid close attention to his elite technical ability and leadership qualities which helped him achieve great success with the program. As a coach, he has great attention to detail and a tireless commitment to help players. I regularly worked with him to improve my technique, awareness and overall game understanding which helped me develop into a more well rounded player.",
  },
  {
    name: "Jonathan Kliewer",
    tag: "USL League 1 · AC Boise",
    role: "USL League 1 · Goalkeeper",
    photo: `${CDN}/43a6eefe7_2f46e1c8-1eee-4d81-b9eb-74b55a026579.jpg`,
    quote:
      "Working with Kian has been an absolute pleasure. I got the joy of playing with Kian before he transitioned into coaching, and you could see how his knowledge on the field translated to coaching. Kian helped me develop my understanding of the game, not only tactically, breaking lines and building out, but more importantly understanding the moment and what it calls for. Kian has all the skills to make an exceptional coach and I have no doubt he will.",
  },
  {
    name: "EPA Parent",
    tag: "Current EPA Athlete",
    role: "EPA Athlete",
    photo: `${CDN}/b55f056b7_9c9d7282-8088-49ea-8f18-5d6588b38ecd.jpg`,
    quote:
      "My son and a couple of his teammates started lessons with Kian as a way to complement club training and to continue improving individual skills outside of team practice. Over the past several months, I've noticed a clear positive impact on his game, especially technically and in his confidence. What stands out most is that the sessions are technically strong, and fun without adding stress or pressure. I would absolutely recommend your coaching to any young player wanting to continue developing in a positive environment.",
  },
  {
    name: "Silas",
    tag: "JUCO → Division 1 Transfer",
    role: "JUCO → Division 1 Transfer",
    photo: `${CDN}/e75d1309d_43334cd6-0a2a-462a-be7c-2d9eff537e17.jpg`,
    quote:
      "Working with Kian allowed me to improve in many areas that needed polishing in order to transfer from juco to division 1. His vast array of knowledge and attention to detail were very helpful. Any players looking to make the jump to the next level in their footballing journey would greatly benefit from work with Kian.",
  },
];
