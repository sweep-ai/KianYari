import { quizSteps, type ContactFields } from "../data/applicationForm";

export const AGE_MIN = 8;
export const AGE_MAX = 25;
export const NAME_MIN_LENGTH = 2;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const JUNK_LOCAL_PARTS = /^(test|testing|fake|asdf|none|noemail|example|junk|spam|aaa+)$/i;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function sanitizeContact(contact: ContactFields): ContactFields {
  return {
    playerName: contact.playerName.trim().replace(/\s+/g, " "),
    parentName: contact.parentName.trim().replace(/\s+/g, " "),
    age: contact.age.trim(),
    email: normalizeEmail(contact.email),
    phone: contact.phone.trim(),
  };
}

function isJunkEmail(email: string): boolean {
  const [local, domain] = email.split("@");
  if (!local || !domain) return true;
  if (JUNK_LOCAL_PARTS.test(local)) return true;
  if (/^(test|example)\.(com|org|net)$/i.test(domain) && local.length <= 6) return true;
  return false;
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function quizIsComplete(answers: Record<string, string>): boolean {
  return quizSteps.every((step) => Boolean(answers[step.id]?.trim()));
}

export function validateContact(
  contact: ContactFields,
  answers: Record<string, string>
): Partial<Record<keyof ContactFields | "_form", string>> {
  const errors: Partial<Record<keyof ContactFields | "_form", string>> = {};

  if (!quizIsComplete(answers)) {
    errors._form = "Complete all quiz questions before submitting.";
  }

  if (contact.playerName.length < NAME_MIN_LENGTH) {
    errors.playerName = `Enter full name (at least ${NAME_MIN_LENGTH} characters).`;
  }

  if (contact.parentName && contact.parentName.length < NAME_MIN_LENGTH) {
    errors.parentName = `Enter a valid parent name (at least ${NAME_MIN_LENGTH} characters).`;
  }

  const ageNum = Number(contact.age);
  if (!Number.isInteger(ageNum) || ageNum < AGE_MIN || ageNum > AGE_MAX) {
    errors.age = `Enter age between ${AGE_MIN} and ${AGE_MAX}.`;
  }

  if (!EMAIL_RE.test(contact.email)) {
    errors.email = "Enter a valid email address.";
  } else if (isJunkEmail(contact.email)) {
    errors.email = "Enter a real email you check regularly.";
  }

  if (contact.phone && !isValidPhone(contact.phone)) {
    errors.phone = "Enter a valid phone number (10+ digits).";
  }

  return errors;
}
