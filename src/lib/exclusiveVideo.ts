import { useEffect, useRef, type RefObject } from "react";

type PauseFn = () => void;

const pauseHandlers = new Map<string, PauseFn>();
let activeId: string | null = null;

let vimeoScript: Promise<void> | null = null;
let youtubeScript: Promise<void> | null = null;

declare global {
  interface Window {
    Vimeo?: {
      Player: new (
        element: HTMLIFrameElement,
        options?: Record<string, unknown>
      ) => {
        on: (event: string, cb: () => void) => void;
        pause: () => Promise<void>;
      };
    };
    YT?: {
      Player: new (
        element: HTMLIFrameElement | string,
        options: {
          events?: { onStateChange?: (event: { data: number }) => void };
        }
      ) => { pauseVideo: () => void };
      PlayerState: { PLAYING: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function loadVimeoPlayerScript(): Promise<void> {
  if (window.Vimeo?.Player) return Promise.resolve();
  if (!vimeoScript) {
    vimeoScript = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://player.vimeo.com/api/player.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Vimeo player"));
      document.head.appendChild(script);
    });
  }
  return vimeoScript;
}

function loadYouTubeIframeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (!youtubeScript) {
    youtubeScript = new Promise((resolve) => {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        resolve();
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    });
  }
  return youtubeScript;
}

export function registerExclusiveVideo(id: string, pause: PauseFn): () => void {
  pauseHandlers.set(id, pause);
  return () => {
    pauseHandlers.delete(id);
    if (activeId === id) activeId = null;
  };
}

export function claimExclusivePlayback(id: string): void {
  if (activeId === id) return;
  for (const [key, pause] of pauseHandlers) {
    if (key !== id) {
      try {
        pause();
      } catch {
        /* player may be torn down */
      }
    }
  }
  activeId = id;
}

export function useExclusiveHtmlVideo(id: string) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onPlay = () => claimExclusivePlayback(id);
    el.addEventListener("play", onPlay);
    const unregister = registerExclusiveVideo(id, () => {
      if (!el.paused) el.pause();
    });

    return () => {
      el.removeEventListener("play", onPlay);
      unregister();
    };
  }, [id]);

  return ref;
}

export function useExclusiveVimeo(
  id: string,
  iframeRef: RefObject<HTMLIFrameElement | null>,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    let player: { on: (event: string, cb: () => void) => void; pause: () => Promise<void> } | null = null;
    let cancelled = false;

    void loadVimeoPlayerScript()
      .then(() => {
        if (cancelled || !iframeRef.current || !window.Vimeo) return;
        player = new window.Vimeo.Player(iframeRef.current);
        player.on("play", () => claimExclusivePlayback(id));
      })
      .catch(() => {});

    const unregister = registerExclusiveVideo(id, () => {
      void player?.pause();
    });

    return () => {
      cancelled = true;
      unregister();
    };
  }, [id, iframeRef, enabled]);
}

export function useExclusiveYouTube(
  id: string,
  iframeRef: RefObject<HTMLIFrameElement | null>,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    let player: { pauseVideo: () => void } | null = null;
    let cancelled = false;

    void loadYouTubeIframeApi()
      .then(() => {
        if (cancelled || !iframeRef.current || !window.YT) return;
        player = new window.YT.Player(iframeRef.current, {
          events: {
            onStateChange: (event) => {
              if (event.data === window.YT!.PlayerState.PLAYING) {
                claimExclusivePlayback(id);
              }
            },
          },
        });
      })
      .catch(() => {});

    const unregister = registerExclusiveVideo(id, () => {
      player?.pauseVideo();
    });

    return () => {
      cancelled = true;
      unregister();
    };
  }, [id, iframeRef, enabled]);
}
