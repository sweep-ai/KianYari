import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  quizSteps,
  contactStep,
  totalSteps,
  type ContactFields,
  type ContactFieldName,
} from "../data/applicationForm";
import BookingPreloader from "./BookingPreloader";
import { dq } from "../data/copy";
import { sanitizeContact, validateContact } from "../lib/leadValidation";
import { trackEvent, submitLead, EVENTS, formSubmitIdempotencyKey } from "../lib/sweepTracking";
import "./ApplicationForm.css";

const AUTO_ADVANCE_MS = 450;
const EMPTY_CONTACT: ContactFields = {
  playerName: "",
  parentName: "",
  age: "",
  email: "",
  phone: "",
};

type Props = {
  open?: boolean;
  onClose?: () => void;
  variant?: "modal" | "inline";
};

type FieldErrors = Partial<Record<ContactFieldName | "_form", string>>;

export default function ApplicationForm({ open = false, onClose, variant = "modal" }: Props) {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState<ContactFields>(EMPTY_CONTACT);
  const [started, setStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [advancing, setAdvancing] = useState(false);
  const [acknowledgedOption, setAcknowledgedOption] = useState<string | null>(null);
  const [slideDir, setSlideDir] = useState<"forward" | "back">("forward");
  const [showDqResult, setShowDqResult] = useState(false);

  if (variant === "modal" && !open) return null;

  const isContactStep = stepIndex === quizSteps.length && !showDqResult;
  const step = stepIndex < quizSteps.length ? quizSteps[stepIndex] : null;

  function ensureStarted() {
    if (!started) {
      setStarted(true);
      void trackEvent(EVENTS.QUIZ_START, { form_id: "epa-application" });
    }
  }

  function selectOption(code: string) {
    if (advancing || !step) return;
    ensureStarted();
    setAnswers((prev) => ({ ...prev, [step.id]: code }));
    void trackEvent(EVENTS.QUIZ_STEP, { step: step.id, answer: code });
    setAcknowledgedOption(code);
    setAdvancing(true);
    setSlideDir("forward");

    window.setTimeout(() => {
      if (stepIndex < totalSteps - 1) setStepIndex((i) => i + 1);
      setAcknowledgedOption(null);
      setAdvancing(false);
    }, AUTO_ADVANCE_MS);
  }

  function goBack() {
    if (advancing || showDqResult || stepIndex === 0) return;
    setSlideDir("back");
    setAcknowledgedOption(null);
    setStepIndex((i) => i - 1);
  }

  function updateContact(name: ContactFieldName, value: string) {
    setContact((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
    if (submitError) setSubmitError(null);
  }

  function isDisqualified() {
    const investmentAnswer = answers["investment"];
    const investmentStep = quizSteps.find((s) => s.id === "investment");
    const opt = investmentStep?.options.find((o) => o.code === investmentAnswer);
    return Boolean(opt?.disqualify);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const sanitized = sanitizeContact(contact);
    const errors = validateContact(sanitized, answers);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitError(errors._form ?? "Fix the highlighted fields and try again.");
      setSubmitting(false);
      return;
    }

    setFieldErrors({});
    const disqualified = isDisqualified();
    const formId = "epa-application";
    const notes = [
      sanitized.parentName ? `Parent/guardian: ${sanitized.parentName}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const lead = await submitLead({
      name: sanitized.playerName,
      email: sanitized.email,
      phone: sanitized.phone || undefined,
      notes: notes || undefined,
      source: "quiz",
      funnel_step_reached: "form_submit",
      quiz_answers: { ...answers, age: sanitized.age, disqualified },
    });

    if (lead.error) {
      setSubmitError("Could not save your application. Please try again.");
      setSubmitting(false);
      console.warn("submitLead failed", lead.error);
      return;
    }

    void trackEvent(
      EVENTS.FORM_SUBMIT,
      {
        form_id: formId,
        disqualified,
        answers,
        client_id: lead.clientId,
        lead_created: lead.created,
      },
      formSubmitIdempotencyKey(formId)
    );

    setSubmitting(false);

    if (disqualified) {
      setSlideDir("forward");
      setShowDqResult(true);
      return;
    }

    onClose?.();
    navigate("/booking");
  }

  const progressIndex = showDqResult ? totalSteps : stepIndex;
  const shouldPreloadBooking = Boolean(answers.investment) && !isDisqualified();

  const card = (
    <div className={`app-form-modal ${variant === "inline" ? "app-form--inline" : ""}`}>
      {variant === "modal" && onClose && !showDqResult ? (
        <button className="app-form-modal__close" onClick={onClose} aria-label="Close">
          ✕
        </button>
      ) : null}
      <div className="app-form-modal__eyebrow">
        <span className="app-form-modal__shield">🛡</span> APPLICATION
      </div>

      <div className="app-form-modal__progress">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span key={i} className={i <= progressIndex ? "is-active" : ""} />
        ))}
      </div>

      <div
        key={showDqResult ? "dq-result" : isContactStep ? "contact" : step!.id}
        className={`app-form-modal__step app-form-modal__step--${slideDir}`}
      >
        {showDqResult ? (
          <div className="app-form-modal__dq">
            <h3 className="app-form-modal__title">{dq.headline}</h3>
            <p className="app-form-modal__prompt">{dq.body}</p>
            <a
              className="app-form-modal__youtube"
              href={dq.youtubeUrl}
              target="_blank"
              rel="noreferrer"
            >
              {dq.youtubeLabel}
            </a>
          </div>
        ) : (
          <>
            <h3 className="app-form-modal__title">{isContactStep ? contactStep.title : step!.title}</h3>
            <p className="app-form-modal__prompt">{isContactStep ? contactStep.prompt : step!.prompt}</p>
            {!isContactStep && step!.helper ? <p className="app-form-modal__helper">{step!.helper}</p> : null}

            {!isContactStep ? (
              <div className="app-form-modal__options">
                {step!.options.map((opt) => {
                  const selected = answers[step!.id] === opt.code;
                  const acknowledged = acknowledgedOption === opt.code;
                  return (
                    <button
                      key={opt.code}
                      type="button"
                      className={`app-form-option ${selected ? "is-selected" : ""} ${acknowledged ? "is-acknowledged" : ""}`}
                      disabled={advancing}
                      onClick={() => selectOption(opt.code)}
                    >
                      {opt.label}
                      {selected || acknowledged ? <span className="app-form-option__check">✓</span> : null}
                    </button>
                  );
                })}
              </div>
            ) : (
              <form className="app-form-modal__fields" onSubmit={handleSubmit} id="epa-application" noValidate>
                {contactStep.fields.map((f) => (
                  <label key={f.name} className={fieldErrors[f.name] ? "has-error" : undefined}>
                    {f.label}
                    <input
                      type={f.inputType}
                      placeholder={f.placeholder}
                      required={f.required}
                      min={f.min}
                      max={f.max}
                      autoComplete={f.autoComplete}
                      inputMode={f.inputType === "tel" ? "tel" : f.inputType === "number" ? "numeric" : undefined}
                      aria-invalid={fieldErrors[f.name] ? true : undefined}
                      value={contact[f.name]}
                      onChange={(e) => updateContact(f.name, e.target.value)}
                    />
                    {fieldErrors[f.name] ? (
                      <span className="app-form-modal__field-error">{fieldErrors[f.name]}</span>
                    ) : null}
                  </label>
                ))}
                {submitError ? <p className="app-form-modal__error">{submitError}</p> : null}
              </form>
            )}
          </>
        )}
      </div>

      {!showDqResult ? (
        <div className="app-form-modal__actions">
          {stepIndex > 0 ? (
            <button type="button" className="app-form-modal__back" onClick={goBack} disabled={advancing}>
              ‹ Back
            </button>
          ) : (
            <span />
          )}
          {isContactStep ? (
            <button type="submit" form="epa-application" className="app-form-modal__continue" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit Application"}
            </button>
          ) : (
            <span className="app-form-modal__hint">Tap an answer to continue</span>
          )}
        </div>
      ) : null}
    </div>
  );

  if (variant === "inline") {
    return (
      <>
        <BookingPreloader active={shouldPreloadBooking} />
        {card}
      </>
    );
  }

  return (
    <>
      <BookingPreloader active={shouldPreloadBooking} />
      <div className="app-form-overlay" role="dialog" aria-modal="true">
        {card}
      </div>
    </>
  );
}
