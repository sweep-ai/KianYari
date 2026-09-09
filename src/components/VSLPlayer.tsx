import { useEffect, useRef } from "react";
import { videos } from "../data/videos";
import { useExclusiveVimeo } from "../lib/exclusiveVideo";
import { trackEvent, EVENTS } from "../lib/sweepTracking";
import "./VSLPlayer.css";

export default function VSLPlayer() {
  const v = videos.vsl;
  const hash = "hash" in v && v.hash ? `&h=${v.hash}` : "";
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useExclusiveVimeo("vsl", iframeRef);

  useEffect(() => {
    void trackEvent(EVENTS.VSL_PLAY, { placement: "funnel", video_id: v.id });
  }, [v.id]);

  return (
    <div className="vsl-player">
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${v.id}?autoplay=1&muted=1&title=0&byline=0&portrait=0${hash}`}
        title={v.title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
