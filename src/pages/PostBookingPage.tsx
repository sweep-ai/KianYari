import { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import FaqSection from "../components/FaqSection";
import RealClientStories from "../components/RealClientStories";
import ScrollingBanner from "../components/ScrollingBanner";
import { postBooking } from "../data/copy";
import { useExclusiveYouTube } from "../lib/exclusiveVideo";
import { trackEvent, EVENTS } from "../lib/sweepTracking";
import { videos } from "../data/videos";
import "./PostBookingPage.css";

type StepHeaderProps = {
  n: number;
  title: string;
  body?: string;
};

function StepHeader({ n, title, body }: StepHeaderProps) {
  return (
    <div className="post-booking-step">
      <div className="post-booking-step__label">
        <span className="post-booking-step__num">{n}</span>
        <span className="post-booking-step__name">{title}</span>
      </div>
      {body ? <p className="post-booking-step__body">{body}</p> : null}
    </div>
  );
}

export default function PostBookingPage() {
  useEffect(() => {
    void trackEvent(EVENTS.POST_BOOKING_VIEW, { page: "post-booking" });
  }, []);

  const v = videos.postBookingPreface;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const embedSrc =
    v.provider === "youtube"
      ? `https://www.youtube.com/embed/${v.id}?rel=0&enablejsapi=1`
      : `https://player.vimeo.com/video/${v.id}`;

  useExclusiveYouTube("post-booking-vsl", iframeRef);

  return (
    <>
      <main className="container page-shell">
        <h1>{postBooking.title}</h1>
        <p style={{ color: "var(--color-accent)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.06em" }}>
          {postBooking.mandatorySub}
        </p>

        <section className="post-booking-section post-booking-section--info">
          <StepHeader n={1} title="Watch The Welcome Video" body="A quick intro to what happens next." />
          <div className="post-booking-section__media">
            <iframe
              ref={iframeRef}
              src={embedSrc}
              title={v.title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        <section className="post-booking-section">
          <StepHeader n={2} title={postBooking.confirmHeadline} body={postBooking.confirmBody} />
        </section>

        <section className="post-booking-section">
          <StepHeader
            n={3}
            title="Confirm Your Calendar Invite"
            body="Check your email for the calendar invite and tap Yes to confirm."
          />
          <div className="post-booking-section__calendar">
            <img
              src="/calendar-invite.png"
              alt="Google Calendar invite — tap Yes to confirm your call"
              loading="lazy"
            />
          </div>
        </section>
      </main>

      <section id="client-results" className="post-booking-section post-booking-section--full" style={{ scrollMarginTop: "1rem" }}>
        <StepHeader n={4} title={postBooking.clientResultsHeadline} body={postBooking.clientResultsBody} />
        <RealClientStories />
        <ScrollingBanner />
        <div style={{ marginTop: "1rem" }}>
          <ScrollingBanner reverse captioned />
        </div>
      </section>

      <section className="post-booking-section post-booking-section--full post-booking-section--faq">
        <div className="container">
          <StepHeader n={5} title={postBooking.faqStepHeadline} body={postBooking.faqStepBody} />
        </div>
        <FaqSection hideTitle compact />
      </section>

      <Footer />
    </>
  );
}
