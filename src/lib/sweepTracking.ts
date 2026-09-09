// Sweep OS funnel tracking — see Sweep OS Funnel Integration Guide.
// FUNNEL_ID is fixed per Kian's instruction (this funnel's Sweep OS record).
// Event names below are custom-defined for this funnel (also per Kian's
// instruction) — mirror them exactly into the Sweep OS Funnels > Steps tab.
const DIRECT_API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "");
const FUNNEL_ID = import.meta.env.VITE_FUNNEL_ID || "af2f3b22-0ab4-40c1-8ba0-5240df806677";

/** Same-origin proxy on Vercel avoids browser CORS to api.sweepai.site. */
function sweepUrl(path: "events" | "leads"): string {
  if (DIRECT_API_BASE) return `${DIRECT_API_BASE}/funnels/${path}`;
  return `/api/funnels/${path}`;
}

export const EVENTS = {
  PAGE_VIEW: "page_view",
  VSL_PLAY: "vsl_play",
  QUIZ_START: "quiz_start",
  QUIZ_STEP: "quiz_step",
  FORM_SUBMIT: "form_submit",
  BOOKING_PAGE_VIEW: "booking_page_view",
  SCHEDULE: "schedule",
  POST_BOOKING_VIEW: "post_booking_view",
} as const;

function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let v = localStorage.getItem("sweep_visitor_id");
  if (!v) {
    v = `visitor_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem("sweep_visitor_id", v);
  }
  return v;
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let s = sessionStorage.getItem("sweep_session_id");
  if (!s) {
    s = `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    sessionStorage.setItem("sweep_session_id", s);
  }
  return s;
}

export function formSubmitIdempotencyKey(formId: string): string {
  return `form_submit_${getSessionId()}_${formId}`;
}

export async function trackEvent(
  eventName: string,
  metadata: Record<string, unknown> = {},
  idempotencyKey?: string
): Promise<void> {
  if (!FUNNEL_ID) return;
  const body: Record<string, unknown> = {
    funnel_id: FUNNEL_ID,
    event_name: eventName,
    visitor_id: getVisitorId(),
    session_id: getSessionId(),
    metadata: {
      ...metadata,
      page_url: typeof window !== "undefined" ? window.location.href : undefined,
      page_title: typeof document !== "undefined" ? document.title : undefined,
      referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
    },
    event_timestamp: new Date().toISOString(),
  };
  if (idempotencyKey) body.idempotency_key = idempotencyKey;

  try {
    const res = await fetch(sweepUrl("events"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    });
    if (!res.ok) {
      const detail = await res.json().catch(() => ({}));
      console.warn("trackEvent failed", eventName, res.status, detail);
    }
  } catch (e) {
    console.warn("trackEvent failed", eventName, e);
  }
}

export type LeadPayload = {
  email?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  instagram?: string;
  notes?: string;
  source?: string;
  quiz_answers?: Record<string, unknown>;
  funnel_step_reached?: string;
};

export async function submitLead(fields: LeadPayload): Promise<{ clientId?: string; created?: boolean; error?: string }> {
  if (!FUNNEL_ID) return { error: "FUNNEL_ID not configured" };
  try {
    const res = await fetch(sweepUrl("leads"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ funnel_id: FUNNEL_ID, ...fields }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { error: (data as { detail?: string }).detail ?? res.statusText };
    const row = data as { client_id: string; created: boolean };
    return { clientId: row.client_id, created: row.created };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "network error" };
  }
}
