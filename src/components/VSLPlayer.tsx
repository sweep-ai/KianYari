import { useState } from "react";
import { videos } from "../data/videos";
import { trackEvent, EVENTS } from "../lib/sweepTracking";
import "./VSLPlayer.css";

export default function VSLPlayer() {
  const [playing, setPlaying] = useState(false);
  const v = videos.vsl;

  function handlePlay() {
    setPlaying(true);
    void trackEvent(EVENTS.VSL_PLAY, { placement: "funnel", video_id: v.id });
  }

  return (
    <div className="vsl-player">
      {playing ? (
        <iframe
          src={`https://player.vimeo.com/video/${v.id}?autoplay=1&title=0&byline=0&portrait=0`}
          title={v.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button className="vsl-player__facade" onClick={handlePlay} aria-label={`Play: ${v.title}`}>
          <span className="vsl-player__play">▶</span>
        </button>
      )}
    </div>
  );
}
