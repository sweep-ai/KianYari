import { useEffect } from "react";
import Header from "../components/Layout";
import Footer from "../components/Footer";
import { postBooking, faq } from "../data/copy";
import { trackEvent, EVENTS } from "../lib/sweepTracking";
import { videos } from "../data/videos";

export default function PostBookingPage() {
  useEffect(() => {
    void trackEvent(EVENTS.POST_BOOKING_VIEW, { page: "post-booking" });
  }, []);

  const steps = [
    { n: 1, title: "Watch The Welcome Video", body: "A quick intro to what happens next." },
    { n: 2, title: postBooking.confirmHeadline, body: postBooking.confirmBody },
    { n: 3, title: "Confirm Your Calendar Invite", body: "Check your email for the calendar invite and accept it." },
  ];

  return (
    <>
      <Header />
      <main className="container" style={{ padding: "3rem 1.5rem" }}>
        <h1>{postBooking.title}</h1>
        <p style={{ color: "var(--color-accent)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.06em" }}>
          {postBooking.mandatorySub}
        </p>

        <div
          style={{
            marginTop: "1.5rem",
            aspectRatio: "16/9",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            border: "1px solid var(--color-border)",
          }}
        >
          <iframe
            src={`https://player.vimeo.com/video/${videos.postBookingPreface.id}`}
            title={videos.postBookingPreface.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%", border: 0 }}
          />
        </div>

        <ol style={{ marginTop: "2rem", padding: 0, listStyle: "none" }}>
          {steps.map((s) => (
            <li
              key={s.n}
              style={{
                display: "flex",
                gap: "1rem",
                padding: "1rem 0",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--color-accent)",
                  color: "#0a1420",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {s.n}
              </span>
              <div>
                <div style={{ fontWeight: 700 }}>{s.title}</div>
                <div style={{ color: "var(--color-fg-muted)", fontSize: "0.9rem" }}>{s.body}</div>
              </div>
            </li>
          ))}
        </ol>

        <h2 style={{ marginTop: "2.5rem" }}>{postBooking.faqHeadline}</h2>
        <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          {faq.items.slice(0, 3).map((f) => (
            <div key={f.q}>
              <div style={{ fontWeight: 600 }}>{f.q}</div>
              <div style={{ color: "var(--color-fg-muted)", fontSize: "0.88rem" }}>{f.a}</div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
