export const DEFAULT_BOOKING_EMBED =
  "https://calendly.com/ky-epacademy/epa?hide_gdpr_banner=1&background_color=131312&text_color=f2f2f2&primary_color=466346";

export function getBookingEmbedUrl(): string {
  return (import.meta.env.VITE_BOOKING_EMBED_URL as string | undefined) || DEFAULT_BOOKING_EMBED;
}

export function preloadBookingConnections(): void {
  if (typeof document === "undefined") return;
  for (const href of ["https://calendly.com", "https://assets.calendly.com"]) {
    if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) continue;
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }
}
