import React, { useState } from "react";
import "../styles/mahasangha-responsive.css";

const NAV_SECTIONS = ["Home", "About", "Statistics", "Leaders", "Gallery", "Rules", "Contact"];

const BENEFITS = [
  { title: "Digital Membership", desc: "Register & maintain digital membership records." },
  { title: "Digital Member ID", desc: "Unique membership ID for verified members." },
  { title: "Driver Welfare Support", desc: "Collective driver welfare & social assistance." },
  { title: "News & Notices", desc: "Official announcements, notices & updates." },
  { title: "Emergency Assistance", desc: "Rapid organizational & emergency support." },
  { title: "Driver Community", desc: "Unified network across West Bengal." },
];

const STEPS = [
  { step: "01", title: "Register", desc: "Fill out the membership form with valid details." },
  { step: "02", title: "Submit Details", desc: "Review and submit your application." },
  { step: "03", title: "Verification", desc: "Organization reviews and verifies records." },
  { step: "04", title: "Membership", desc: "Access member account & digital services." },
];

export default function MahasanghaMobileHero({ onJoin, onLogin }) {
  const [activeSection, setActiveSection] = useState("Home");

  return (
    <div className="abdm-page">
      <header className="abdm-header">
        <div className="abdm-brand">
          <span className="abdm-brand-mark">A</span>
          <span className="abdm-brand-title">ABDM</span>
        </div>

        <nav className="abdm-nav-actions" aria-label="Member actions">
          <button type="button" className="abdm-nav-btn abdm-nav-btn--ghost" onClick={onLogin}>
            Member Login
          </button>
          <button type="button" className="abdm-nav-btn abdm-nav-btn--primary" onClick={onJoin}>
            Join Membership
          </button>
        </nav>
      </header>

      <div
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          padding: "10px 16px",
          borderBottom: "1px solid rgba(203, 181, 226, 0.2)",
          background: "rgba(37, 34, 62, 0.55)",
        }}
      >
        {NAV_SECTIONS.map((sec) => (
          <button
            key={sec}
            type="button"
            onClick={() => setActiveSection(sec)}
            style={{
              minHeight: "34px",
              padding: "4px 12px",
              borderRadius: "999px",
              border: "1px solid rgba(203, 181, 226, 0.3)",
              background:
                activeSection === sec ? "#5C49BF" : "rgba(249, 249, 252, 0.08)",
              color: "#F9F9FC",
              fontSize: "0.78rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
          >
            {sec}
          </button>
        ))}
      </div>

      <main className="abdm-hero">
        <section className="abdm-glass-shell" aria-label="Organization overview">
          <span className="abdm-badge">
            Regd No: IV-224/24 • {activeSection}
          </span>
          <h1 className="abdm-hero-title">ALL BENGAL DRIVER MAHASANGHA</h1>
          <p className="abdm-hero-subtitle">
            United for the Welfare of Drivers Across West Bengal
          </p>

          <div className="abdm-cta-group" style={{ marginBottom: "24px" }}>
            <button type="button" className="abdm-cta-primary" onClick={onJoin}>
              Join Membership
            </button>
            <button type="button" className="abdm-cta-secondary" onClick={onLogin}>
              Member Login
            </button>
          </div>

          <ul className="abdm-pillars">
            {BENEFITS.map((item) => (
              <li key={item.title} style={{ flexDirection: "column", gap: "4px" }}>
                <strong>{item.title}</strong>
                <span style={{ fontSize: "0.74rem", color: "#CBB5E2", fontWeight: 400 }}>
                  {item.desc}
                </span>
              </li>
            ))}
          </ul>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "10px",
              marginTop: "18px",
              textAlign: "left",
            }}
          >
            {STEPS.map((s) => (
              <div
                key={s.step}
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  background: "rgba(249, 249, 252, 0.08)",
                  border: "1px solid rgba(203, 181, 226, 0.24)",
                }}
              >
                <div style={{ color: "#CBB5E2", fontWeight: 800, fontSize: "0.85rem" }}>
                  STEP {s.step}
                </div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", marginTop: "2px" }}>
                  {s.title}
                </div>
                <div style={{ fontSize: "0.76rem", color: "#E5E7EB", marginTop: "4px" }}>
                  {s.desc}
                </div>
              </div>
            ))}
          </div>

          <footer
            style={{
              marginTop: "24px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(203, 181, 226, 0.24)",
              fontSize: "0.78rem",
              color: "#CBB5E2",
              textAlign: "left",
            }}
          >
            <div>
              Sarenga, Madhupur, Hariyatara (near Kalaikunda Petrol Pump), West Bengal - 721804
            </div>
            <div style={{ marginTop: "4px" }}>
              Phone: 8144290180 / 97495 32348 • Email: drivermahasanghaallbengal@gmail.com
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
