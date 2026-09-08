import LegalPage from "./LegalPage";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        Elite Player Academy ("EPA", "we") collects the information you submit through our application form
        (name, parent/guardian name, age, email) to evaluate program fit and follow up about enrollment.
      </p>
      <p style={{ marginTop: "1rem" }}>
        We use Sweep OS to track funnel activity and manage leads, and may use Microsoft Clarity and the Meta
        Pixel for analytics and ad measurement once configured. We do not sell your personal information.
      </p>
      <p style={{ marginTop: "1rem" }}>Contact ky.training8@gmail.com with any privacy questions.</p>
    </LegalPage>
  );
}
