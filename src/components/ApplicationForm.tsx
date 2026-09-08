import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizSteps, contactStep, totalSteps, type ContactFields } from "../data/applicationForm";
import { trackEvent, submitLead, EVENTS } from "../lib/sweepTracking";
import "./ApplicationForm.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ApplicationForm({ open, onClose }: Props) {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState<ContactFields>({ playerName: "", parentName: "", age: "", email: "" });
  const [started, setStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const isContactStep = stepIndex === quizSteps.length;
  const step = !isContactStep ? quizSteps[stepIndex] : null;

  function ensureStarted() {
    if (!started) {
      setStarted(true);
      void trackEvent(EVENTS.QUIZ_START, { form_id: "epa-application" });
    }
  }

  function selectOption(code: string) {
    ensureStarted();
    if (!step) return;
    setAnswers((prev) => ({ ...prev, [step.id]: code }));
    void trackEvent(EVENTS.QUIZ_STEP, { step: step.id, answer: code });
  }

  function goNext() {
    if (stepIndex < totalSteps - 1) setStepIndex((i) => i + 1);
  }

  function goBack() {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
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
    const disqualified = isDisqualified();
    const idempotencyKey = `form_submit_${Date.now()}`;

    void trackEvent(
      EVENTS.FORM_SUBMIT,
      { form_id: "epa-application", disqualified, answers },
      idempotencyKey
    );

    await submitLead({
      name: contact.playerName,
      email: contact.email,
      notes: contact.parentName ? `Parent/guardian: ${contact.parentName}` : undefined,
      source: "quiz",
      funnel_step_reached: "form_submit",
      quiz_answers: { ...answers, age: contact.age, disqualified },
    });

    setSubmitting(false);
    onClose();
    navigate(disqualified ? "/#disqualified" : "/booking");
  }

  return (
    <div className="app-form-overlay" role="dialog" aria-modal="true">
      <div className="app-form-modal">
        <button className="app-form-modal__close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="app-form-modal__eyebrow">
          <span className="app-form-modal__shield">🛡</span> APPLICATION
        </div>
        <h3 className="app-form-modal__title">{isContactStep ? contactStep.title : step!.title}</h3>
        <p className="app-form-modal__prompt">{isContactStep ? contactStep.prompt : step!.prompt}</p>
        {!isContactStep && step!.helper ? <p className="app-form-modal__helper">{step!.helper}</p> : null}

        <div className="app-form-modal__progress">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span key={i} className={i <= stepIndex ? "is-active" : ""} />
          ))}
        </div>

        {!isContactStep ? (
          <div className="app-form-modal__options">
            {step!.options.map((opt) => (
              <button
                key={opt.code}
                className={`app-form-option ${answers[step!.id] === opt.code ? "is-selected" : ""}`}
                onClick={() => selectOption(opt.code)}
              >
                {opt.label}
                {answers[step!.id] === opt.code ? <span className="app-form-option__check">✓</span> : null}
              </button>
            ))}
          </div>
        ) : (
          <form className="app-form-modal__fields" onSubmit={handleSubmit} id="epa-application">
            {contactStep.fields.map((f) => (
              <label key={f.name}>
                {f.label}
                <input
                  type={f.name === "email" ? "email" : "text"}
                  placeholder={f.placeholder}
                  required={f.required}
                  value={contact[f.name as keyof ContactFields] || ""}
                  onChange={(e) => setContact((prev) => ({ ...prev, [f.name]: e.target.value }))}
                />
              </label>
            ))}
          </form>
        )}

        <div className="app-form-modal__actions">
          {stepIndex > 0 ? (
            <button type="button" className="app-form-modal__back" onClick={goBack}>
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
            <button
              type="button"
              className="app-form-modal__continue"
              disabled={!answers[step!.id]}
              onClick={goNext}
            >
              Continue ›
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
