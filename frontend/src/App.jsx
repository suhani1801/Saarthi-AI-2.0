import { useState } from "react";

export default function App() {
  const [result, setResult] = useState(null);
  const [highContrast, setHighContrast] = useState(false);
  const [language, setLanguage] = useState("en");
  const [vibrationEnabled, setVibrationEnabled] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    age: "",
    state: "",
    income: "",
    occupation: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheck = () => {
    let recommendation = null;
    const age = parseInt(formData.age || "0", 10);
    const income = parseInt(formData.income || "0", 10);
    const occupation = formData.occupation.toLowerCase();

    // Default Fallback Scheme
    recommendation = {
      scheme: "National Scholarship Portal (NSP)",
      description:
        "A one-stop solution through which various services starting from student application, application receipt, processing, sanction and disbursal of various scholarships to students are enabled.",
      reason: "Based on your profile, you may be eligible for central and state scholarship support programs.",
      benefits: [
        "Direct financial assistance for students",
        "Single portal for central, state, and UGC schemes",
        "Transparent and direct bank transfer"
      ],
      documents: ["Government ID Card", "Income Certificate", "Student ID / Bonafide Certificate"],
      website: "https://scholarships.gov.in",
    };

    if (occupation.includes("farmer")) {
      recommendation = {
        scheme: "PM-KISAN Samman Nidhi",
        description:
          "A Central Sector scheme with 100% funding from the Government of India to supplement the financial needs of land-holding farmers.",
        reason: "Applicable based on your agricultural occupation and landholding status.",
        benefits: [
          "₹6,000 per year provided in three equal installments",
          "Direct Benefit Transfer (DBT) directly into linked bank accounts"
        ],
        documents: ["Government ID Card", "Bank Passbook", "Land Ownership Documents"],
        website: "https://pmkisan.gov.in",
      };
    } else if (occupation.includes("student") && income < 800000) {
      recommendation = {
        scheme: "PM Scholarship Scheme (PMSS)",
        description:
          "Encourages higher technical and professional education for eligible students and dependent wards.",
        reason: "Students with family income below the threshold qualify for higher education support.",
        benefits: [
          "Monthly stipend/scholarship for higher professional courses",
          "Financial assistance directly transferred to student bank accounts"
        ],
        documents: ["Government ID Card", "Income Certificate", "College ID & Marksheets"],
        website: "https://scholarships.gov.in",
      };
    } else if (income < 500000) {
      recommendation = {
        scheme: "Ayushman Bharat - PM-JAY",
        description:
          "The world's largest government-funded health assurance scheme aimed at providing health cover to low-income and vulnerable families.",
        reason: "Low-income households qualify for government-backed healthcare insurance.",
        benefits: [
          "Cashless secondary and tertiary healthcare coverage",
          "Health coverage up to ₹5 lakh per family per year",
          "Covers pre-existing conditions from day one"
        ],
        documents: ["Government ID Card", "Ration Card", "Ayushman Health Card"],
        website: "https://beneficiary.nha.gov.in",
      };
    } else if (age >= 18 && age <= 35) {
      recommendation = {
        scheme: "PM Mudra Yojana (PMMY)",
        description:
          "Provides collateral-free loans to micro and small enterprises to help young entrepreneurs launch or scale their businesses.",
        reason: "Young adults seeking self-employment or business funding qualify for Mudra support.",
        benefits: [
          "Micro loans up to ₹10 lakh across Shishu, Kishore, and Tarun categories",
          "No collateral required for small business setups"
        ],
        documents: ["Government ID Card", "PAN Card", "Business Plan / Enterprise Proof"],
        website: "https://www.mudra.org.in",
      };
    }

    setResult(recommendation);

    if (vibrationEnabled && navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  const handleVoiceInput = () => {
    alert("🎤 Voice input feature will be available in the next version.");
  };

  const toggleContrast = () => setHighContrast(!highContrast);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  const toggleVibration = () => {
    const nextVib = !vibrationEnabled;
    setVibrationEnabled(nextVib);
    if (nextVib && navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  const speakResult = () => {
    if (!result) return;
    const utterance = new SpeechSynthesisUtterance(
      `${result.scheme}. ${result.description}. ${result.reason}`
    );
    speechSynthesis.speak(utterance);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: highContrast ? "#000000" : "#f8fafc",
        color: highContrast ? "#ffffff" : "#0f172a",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            color: highContrast ? "#60a5fa" : "#1e3a8a",
            marginBottom: "0.5rem",
          }}
        >
          Saarthi AI 2.0
        </h1>
        <p
          style={{
            color: highContrast ? "#cbd5e1" : "#475569",
            marginBottom: "2rem",
            fontSize: "1.1rem",
            lineHeight: "1.6",
          }}
        >
          Inclusive AI-powered Government Scheme Recommendation Platform
        </p>

        {/* Accessibility Bar */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          <button style={btn} onClick={handleVoiceInput}>🎤 Voice Input</button>
          <button style={btn} onClick={toggleContrast}>
            🌗 High Contrast ({highContrast ? "On" : "Off"})
          </button>
          <button style={btn} onClick={toggleLanguage}>
            🌍 {language === "en" ? "English" : "Hindi / Marathi"}
          </button>
          <button style={btn} onClick={toggleVibration}>
            📳 Vibration ({vibrationEnabled ? "On" : "Off"})
          </button>
        </div>

        {/* Form */}
        <div
          style={{
            background: highContrast ? "#1e293b" : "#ffffff",
            padding: "2rem",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
          }}
        >
          <h2>Check Your Eligibility</h2>

          <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
            <input
              placeholder="Age"
              style={input}
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            <input
              placeholder="State"
              style={input}
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
            <input
              placeholder="Annual Income (₹)"
              style={input}
              name="income"
              value={formData.income}
              onChange={handleChange}
            />
            <input
              placeholder="Occupation (e.g. Farmer, Student)"
              style={input}
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
            <input
              placeholder="Category"
              style={input}
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
            <button
              onClick={handleCheck}
              style={{
                background: "#2563eb",
                color: "white",
                padding: "0.9rem",
                border: "none",
                borderRadius: "10px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              🔍 Get AI Recommendation
            </button>
          </div>
        </div>

        {/* Dynamic Scheme Result Display */}
        {result && (
          <div
            style={{
              marginTop: "2rem",
              background: highContrast ? "#0f172a" : "#eff6ff",
              border: "2px solid #2563eb",
              color: highContrast ? "#ffffff" : "#1e293b",
              padding: "2rem",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(37, 99, 235, 0.15)",
            }}
          >
            <span style={{ fontSize: "0.9rem", color: "#2563eb", fontWeight: "bold", textTransform: "uppercase" }}>
              ✅ AI Recommended Scheme
            </span>
            <h2 style={{ color: highContrast ? "#60a5fa" : "#1d4ed8", marginTop: "0.5rem", marginBottom: "0.75rem" }}>
              {result.scheme}
            </h2>

            {/* Scheme Description */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ margin: "0 0 0.25rem 0", color: "#2563eb" }}>📝 Scheme Description</h4>
              <p style={{ margin: 0, lineHeight: "1.5" }}>{result.description}</p>
            </div>

            {/* Match Reason */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ margin: "0 0 0.25rem 0", color: "#2563eb" }}>💡 Why You Qualify</h4>
              <p style={{ margin: 0, lineHeight: "1.5" }}>{result.reason}</p>
            </div>

            <hr style={{ margin: "20px 0", border: "0", borderTop: "1px solid #cbd5e1" }} />

            {/* Benefits */}
            <h4>🎁 Key Benefits</h4>
            <ul style={{ paddingLeft: "1.2rem", lineHeight: "1.6" }}>
              {result.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>

            {/* Documents */}
            <h4>📄 Required Documents</h4>
            <ul style={{ paddingLeft: "1.2rem", lineHeight: "1.6" }}>
              {result.documents.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>

            {/* Official Website Link */}
            <div style={{ marginTop: "1.5rem", padding: "1rem", background: highContrast ? "#1e293b" : "#ffffff", borderRadius: "10px", border: "1px solid #bfdbfe" }}>
              <h4 style={{ margin: "0 0 0.5rem 0" }}>🔗 Official Application Portal</h4>
              <a
                href={result.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#2563eb",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  textDecoration: "underline",
                  display: "inline-block",
                }}
              >
                Apply Online at {result.website} →
              </a>
            </div>

            {/* Text-To-Speech Button */}
            <button
              onClick={speakResult}
              style={{
                marginTop: "1.5rem",
                background: "#16a34a",
                color: "white",
                padding: "0.8rem 1.2rem",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              🔊 Read Aloud Description
            </button>
          </div>
        )}

        {/* Feature Highlights */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
            marginTop: "3rem",
          }}
        >
          <Feature title="Voice Assistance" desc="STT + TTS accessibility" />
          <Feature title="AI Matching" desc="Rule engine + vector ranking" />
          <Feature title="Multilingual" desc="Hindi, Marathi, English" />
          <Feature title="Offline Ready" desc="Local caching for rural users" />
        </div>
      </div>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "1.2rem",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem 0" }}>{title}</h3>
      <p style={{ color: "#64748b", margin: 0 }}>{desc}</p>
    </div>
  );
}

const input = {
  padding: "0.9rem",
  borderRadius: "10px",
  border: "1px solid #334155",
  background: "white",
  color: "#0f172a",
};

const btn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "0.75rem 1rem",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
};