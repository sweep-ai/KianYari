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
    title: "Investment Level",
    prompt: "How much are you willing to invest to reach your maximum potential?",
    helper: "Serious players invest in their development.",
    type: "single",
    options: [
      { code: "under_100", label: "Under $100", disqualify: true },
      { code: "100_499", label: "$100 – $499" },
      { code: "500_1000", label: "$500 – $1,000" },
      { code: "1000_plus", label: "$1,000+" },
    ],
  },
];

export type ContactFields = {
  playerName: string;
  parentName?: string;
  age: string;
  email: string;
};

export const contactStep = {
  title: "Your Information",
  prompt: "Almost done — tell us about you",
  fields: [
    { name: "playerName", label: "Player Name", placeholder: "Full name", required: true },
    { name: "parentName", label: "Parent Name (optional)", placeholder: "Parent or guardian", required: false },
    { name: "age", label: "Age", placeholder: "Any age", required: true },
    { name: "email", label: "Email", placeholder: "player@email.com", required: true },
  ],
};

export const totalSteps = quizSteps.length + 1;
