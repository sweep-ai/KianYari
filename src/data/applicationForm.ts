export type QuizOption = { code: string; label: string; disqualify?: boolean };
export type QuizStep = {
  id: string;
  title: string;
  prompt: string;
  helper?: string;
  type: "single";
  options: QuizOption[];
};

export const quizSteps: QuizStep[] = [
  {
    id: "playing_level",
    title: "Playing Level",
    prompt: "Where are you now?",
    type: "single",
    options: [
      { code: "recreational", label: "Recreational" },
      { code: "competitive_club", label: "Competitive / Club" },
      { code: "academy", label: "Academy" },
      { code: "high_school", label: "High School" },
      { code: "college_prospect", label: "College Prospect" },
    ],
  },
  {
    id: "goals",
    title: "Your Goals",
    prompt: "What is your primary goal?",
    type: "single",
    options: [
      { code: "improve_skills", label: "Improve my skills" },
      { code: "make_school_team", label: "Make the school team" },
      { code: "play_college_soccer", label: "Play college soccer" },
      { code: "become_elite_player", label: "Become an elite player" },
      { code: "recruiting_guidance", label: "Get recruiting guidance" },
    ],
  },
  {
    id: "struggle",
    title: "Your Biggest Challenge",
    prompt: "What's your biggest struggle?",
    type: "single",
    options: [
      { code: "confidence", label: "Confidence" },
      { code: "training_consistency", label: "Training Consistency" },
      { code: "technical_ability", label: "Technical Ability" },
      { code: "fitness", label: "Fitness" },
      { code: "recruiting_knowledge", label: "Recruiting Knowledge" },
      { code: "discipline", label: "Discipline" },
    ],
  },
  {
    id: "investment",
    title: "Commitment",
    prompt: "If things are a perfect fit, are you willing to invest into professional expertise to hit your goals?",
    type: "single",
    options: [
      { code: "yes_sign_up", label: "Yes absolutely sign me up right now" },
      { code: "potentially_learn_more", label: "Potentially, I need to learn more" },
      { code: "just_curious", label: "No, I'm just curious right now", disqualify: true },
    ],
  },
];

export type ContactFieldName = "playerName" | "parentName" | "age" | "email" | "phone";

export type ContactFields = {
  playerName: string;
  parentName: string;
  age: string;
  email: string;
  phone: string;
};

export type ContactFieldConfig = {
  name: ContactFieldName;
  label: string;
  placeholder: string;
  required: boolean;
  inputType: "text" | "email" | "tel" | "number";
  min?: number;
  max?: number;
  autoComplete?: string;
};

export const contactStep = {
  title: "Your Information",
  prompt: "Almost done — tell us about you",
  fields: [
    {
      name: "playerName",
      label: "Player Name",
      placeholder: "Full name",
      required: true,
      inputType: "text",
      autoComplete: "name",
    },
    {
      name: "parentName",
      label: "Parent Name (optional)",
      placeholder: "Parent or guardian",
      required: false,
      inputType: "text",
      autoComplete: "name",
    },
    {
      name: "age",
      label: "Age",
      placeholder: "e.g. 16",
      required: true,
      inputType: "number",
      min: 8,
      max: 25,
      autoComplete: "off",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "player@email.com",
      required: true,
      inputType: "email",
      autoComplete: "email",
    },
    {
      name: "phone",
      label: "Phone (optional)",
      placeholder: "(555) 123-4567",
      required: false,
      inputType: "tel",
      autoComplete: "tel",
    },
  ] satisfies ContactFieldConfig[],
};

export const totalSteps = quizSteps.length + 1;
