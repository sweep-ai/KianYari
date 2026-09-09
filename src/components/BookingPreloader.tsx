import { useEffect } from "react";
import { getBookingEmbedUrl, preloadBookingConnections } from "../lib/booking";
import "./BookingPreloader.css";

type Props = {
  active: boolean;
};

export default function BookingPreloader({ active }: Props) {
  const embedUrl = getBookingEmbedUrl();

  useEffect(() => {
    if (active) preloadBookingConnections();
  }, [active]);

  if (!active || !embedUrl) return null;

  return (
    <iframe
      className="booking-preloader"
      src={embedUrl}
      title="Preload booking calendar"
      tabIndex={-1}
      aria-hidden="true"
    />
  );
}
