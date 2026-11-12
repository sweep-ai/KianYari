// Existing VSL is hosted on the client's Vimeo account already in production
// use on eliteplayeracademy.com. Reused via iframe embed rather than
// re-hosting/re-compressing on this first pass.
export const videos = {
  vsl: {
    provider: "vimeo" as const,
    id: "1205640310",
    hash: "4537cb0b52",
    title: "How Pro Athletes Went From Average To Elite",
  },
  postBookingPreface: {
    provider: "vimeo" as const,
    id: "1245558939",
    hash: "42c614749e",
    title: "MANDATORY: WATCH THIS VIDEO",
  },
  postBookingBreakdown: {
    provider: "vimeo" as const,
    id: "1204829744",
    title: "Your Call Breakdown",
  },
};

export const videoTestimonials = [
  {
    src: "/testimonials/t6.mp4",
    poster: "/testimonials/t6-poster.jpg",
    name: "Vanessa",
    role: "EPA Parent",
    orientation: "portrait" as const,
  },
  {
    src: "/testimonials/t1.mp4",
    poster: "/testimonials/t1-poster.jpg",
    name: "EPA Parent & Player",
    role: "Current EPA athlete family",
    orientation: "landscape" as const,
  },
  {
    src: "/testimonials/t2.mp4",
    poster: "/testimonials/t2-poster.jpg",
    name: "Harry Jolley",
    role: "Chattanooga Red Wolves SC · USL League 1",
    orientation: "portrait" as const,
  },
  {
    src: "/testimonials/t3.mp4",
    poster: "/testimonials/t3-poster.jpg",
    name: "Jesús Barea",
    role: "Real Salt Lake · MLS · First Round Pick #19",
    orientation: "portrait" as const,
  },
  {
    src: "/testimonials/t4.mp4",
    poster: "/testimonials/t4-poster.jpg",
    name: "In-Game Training",
    role: "KY Training",
    orientation: "portrait" as const,
  },
  {
    src: "/testimonials/t5.mp4",
    poster: "/testimonials/t5-poster.jpg",
    name: "From No Confidence to Scoring",
    role: "KY Training",
    orientation: "portrait" as const,
  },
];

