// Existing VSL is hosted on the client's Vimeo account already in production
// use on eliteplayeracademy.com. Reused via iframe embed rather than
// re-hosting/re-compressing on this first pass.
export const videos = {
  vsl: {
    provider: "vimeo" as const,
    id: "1205640310",
    title: "How Pro Athletes Went From Average To Elite",
  },
  postBookingPreface: {
    provider: "vimeo" as const,
    id: "1204829041",
    title: "Welcome — What Happens Next",
  },
  postBookingBreakdown: {
    provider: "vimeo" as const,
    id: "1204829744",
    title: "Your Call Breakdown",
  },
};
