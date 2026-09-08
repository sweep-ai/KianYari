import { useEffect } from "react";
import { trackEvent, EVENTS } from "../lib/sweepTracking";
import "./BookingWidget.css";

const BOOKING_EMBED_URL = import.meta.env.VITE_BOOKING_EMBED_URL as string | undefined;

export default function BookingWidget() {
  useEffect(() => {
    if (!BOOKING_EMBED_URL) return;
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
  }, []);

  if (!BOOKING_EMBED_URL) {
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
      <iframe src={BOOKING_EMBED_URL} title="Book a call" />
    </div>
  );
}
