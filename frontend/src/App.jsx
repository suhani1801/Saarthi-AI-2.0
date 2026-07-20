import { useState } from "react";

export default function App() {
  const [result, setResult] = useState(null);

  const handleCheck = () => {
    setResult({
      scheme: "PM Scholarship Scheme",
      reason:
        "Based on your age, income, and occupation, you may be eligible for education support and scholarship benefits.",
    });

    // vibration cue
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  const speakResult = () => {
    if (!result) return;
    const utterance = new SpeechSynthesisUtterance(
      `${result.scheme}. ${result.reason}`
    );
    speechSynthesis.speak(utterance);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#0f172a",
        color: "white",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
          Saarthi AI 2.0
        </h1>

        <p style={{ color: "#cbd5e1", marginBottom: "2rem" }}>
          Inclusive AI-powered Government Scheme Recommendation Platform
        </p>

        {/* Accessibility Bar */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          <button style={btn}>🎤 Voice Input</button>
          <button style={btn}>🌗 High Contrast</button>
          <button style={btn}>🌍 हिंदी / मराठी</button>
          <button style={btn}>📳 Vibration Mode</button>
        </div>

        {/* Form */}
        <div
          style={{
            background: "#1e293b",
            padding: "2rem",
            borderRadius: "16px",
          }}
        >
          <h2>Check Your Eligibility</h2>

          <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
            <input placeholder="Age" style={input} />
            <input placeholder="State" style={input} />
            <input placeholder="Annual Income" style={input} />
            <input placeholder="Occupation" style={input} />
            <input placeholder="Category" style={input} />

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
              }}
            >
              🔍 Get AI Recommendation
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div
            style={{
              marginTop: "2rem",
              background: "#052e16",
              padding: "1.5rem",
              borderRadius: "16px",
            }}
          >
            <h2>Recommended Scheme</h2>
            <h3>{result.scheme}</h3>
            <p>{result.reason}</p>

            <button
              onClick={speakResult}
              style={{
                marginTop: "1rem",
                background: "#16a34a",
                color: "white",
                padding: "0.8rem 1rem",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              🔊 Read Aloud
            </button>
          </div>
        )}

        {/* Features */}
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
        background: "#1e293b",
        padding: "1.2rem",
        borderRadius: "12px",
      }}
    >
      <h3>{title}</h3>
      <p style={{ color: "#cbd5e1" }}>{desc}</p>
    </div>
  );
}

const input = {
  padding: "0.9rem",
  borderRadius: "10px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "white",
};

const btn = {
  background: "#334155",
  color: "white",
  border: "none",
  padding: "0.7rem 1rem",
  borderRadius: "10px",
  cursor: "pointer",
};