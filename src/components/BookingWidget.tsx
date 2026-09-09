import { useEffect, useState } from "react";
import { getBookingEmbedUrl } from "../lib/booking";
import { trackEvent, EVENTS } from "../lib/sweepTracking";
import "./BookingWidget.css";

export default function BookingWidget() {
  const embedUrl = getBookingEmbedUrl();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!embedUrl) return;
    function onMessage(e: MessageEvent) {
      if (typeof e.data !== "object" || !e.data) return;
      const evt = (e.data as { event?: string }).event;
      if (evt === "calendly.event_scheduled") {
        void trackEvent(EVENTS.SCHEDULE, {}, `schedule_${Date.now()}`);
        window.location.assign("/post-booking");
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [embedUrl]);

  useEffect(() => {
    setLoaded(false);
  }, [embedUrl]);

  if (!embedUrl) {
    return (
      <div className="booking-widget booking-widget--fallback">
        <p>Booking calendar isn't connected yet.</p>
        <p className="booking-widget__hint">
          Set <code>VITE_BOOKING_EMBED_URL</code> to your Calendly (or other scheduler) link to enable inline
          booking here. In the meantime, DM <strong>@ky.training</strong> to grab a time.
        </p>
      </div>
    );
  }

  return (
    <div className="booking-widget">
      {!loaded ? (
        <div className="booking-widget__loading" aria-live="polite">
          <span className="booking-widget__spinner" aria-hidden="true" />
          <p>Loading calendar…</p>
        </div>
      ) : null}
      <iframe
        src={embedUrl}
        title="Book a call"
        className={loaded ? "is-ready" : "is-loading"}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
