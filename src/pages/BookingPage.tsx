import { useEffect } from "react";
import Footer from "../components/Footer";
import ScrollingBanner from "../components/ScrollingBanner";
import BookingWidget from "../components/BookingWidget";
import { booking } from "../data/copy";
import { trackEvent, EVENTS } from "../lib/sweepTracking";

export default function BookingPage() {
  useEffect(() => {
    void trackEvent(EVENTS.BOOKING_PAGE_VIEW, { page: "booking" });
  }, []);

  return (
    <>
      <main>
        <div className="container page-shell" style={{ textAlign: "center" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            <span className="dot" />
            {booking.kicker}
          </span>
          <h1 style={{ marginTop: "0.6rem" }}>{booking.headline}</h1>
          <p className="section-sub">{booking.sub}</p>
          <div style={{ marginTop: "2rem" }}>
            <BookingWidget />
          </div>
        </div>
        <ScrollingBanner />
      </main>
      <Footer />
    </>
  );
}
