import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle } from "lucide-react";

const IMG = "/images/hero-background.jpg";

const PERKS = [
  "Aantrekkelijk salaris",
  "Royale bonusstructuur",
  "Super toffe extra's",
  "Persoonlijke coaching",
];

const STATS = [
  { val: "50+", label: "agents actief" },
  { val: "NL · EN", label: "meertalig" },
  { val: "4,8/5", label: "tevredenheid" },
];

// ─── SHARED HELPERS ───────────────────────────────────────────────────────────

const Reveal = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay }}
      className={className}>
      {children}
    </motion.div>
  );
};

const Badge = ({ dark = false }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", backgroundColor: "#C8F135", border: `3px solid ${dark ? "rgba(200,241,53,0.5)" : "#0D0D0D"}`, boxShadow: dark ? "4px 4px 0 rgba(200,241,53,0.25)" : "4px 4px 0 #0D0D0D" }}>
    <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#0D0D0D", flexShrink: 0 }} />
    <span style={{ fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#0D0D0D" }}>
      Werken bij Call2Day
    </span>
  </div>
);

const Headline = ({ color = "#0D0D0D" }) => (
  <h1 style={{ fontWeight: 900, fontSize: "clamp(2.8rem, 4.5vw, 4.5rem)", lineHeight: 1, letterSpacing: "-0.04em", color, margin: 0 }}>
    Elke beller een{" "}
    <span style={{ display: "inline-block", marginTop: "6px" }}>
      <span style={{ backgroundColor: "#C8F135", border: "3px solid #0D0D0D", display: "inline-block", marginRight: "7px", padding: "0 5px" }}>
        échte
      </span>
      <span style={{ backgroundColor: "#C8F135", border: "3px solid #0D0D0D", display: "inline-block", padding: "0 5px" }}>
        stem
      </span>
      <span style={{ color }}>.</span>
    </span>
  </h1>
);

const PerksList = ({ light = false }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px" }}>
    {PERKS.map((p, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
        <CheckCircle size={14} style={{ color: light ? "#C8F135" : "#1A1F2E", flexShrink: 0 }} />
        <span style={{ fontSize: "13px", fontWeight: 600, color: light ? "#F5F0E8" : "#0D0D0D" }}>{p}</span>
      </div>
    ))}
  </div>
);

const StatsRow = ({ light = false }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "18px", fontSize: "13px", fontWeight: 700 }}>
    {STATS.map((s, i) => (
      <React.Fragment key={i}>
        {i > 0 && <span style={{ opacity: 0.25, color: light ? "#F5F0E8" : "#0D0D0D" }}>·</span>}
        <span style={{ color: light ? "#F5F0E8" : "#0D0D0D" }}>
          <strong style={{ color: light ? "#C8F135" : "#0D0D0D" }}>{s.val}</strong> {s.label}
        </span>
      </React.Fragment>
    ))}
  </div>
);

// Visual-only form mock — conveys layout, no real functionality
const FormMock = ({ borderColor = "#0D0D0D" }) => (
  <div style={{ border: `3px solid ${borderColor}`, borderTop: "none", backgroundColor: "#F5F0E8" }}>
    <div style={{ padding: "22px 22px 8px", display: "flex", flexDirection: "column", gap: "11px" }}>
      {[
        ["Naam", "Jan de Vries"],
        ["E-mail", "jan@email.com"],
        ["Telefoon", "+32 470 …"],
        ["Geboortedatum", ""],
      ].map(([label, ph]) => (
        <div key={label}>
          <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px", color: "#0D0D0D" }}>{label}</div>
          <div style={{ border: `2px solid ${borderColor}`, padding: "9px 13px", fontSize: "13px", color: "#0D0D0D", opacity: ph ? 0.4 : 0.15, backgroundColor: "#fff" }}>{ph || " "}</div>
        </div>
      ))}
    </div>
    <div style={{ padding: "12px 22px 22px" }}>
      <div style={{ backgroundColor: "#C8F135", border: `3px solid ${borderColor}`, boxShadow: `4px 4px 0 ${borderColor}`, padding: "13px", textAlign: "center", fontWeight: 900, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer" }}>
        Verstuur Aanmelding →
      </div>
    </div>
  </div>
);

const FormHeader = ({ borderColor = "#0D0D0D" }) => (
  <div style={{ padding: "18px 22px", backgroundColor: "#1A1F2E", border: `3px solid ${borderColor}`, borderBottom: "none" }}>
    <div style={{ fontWeight: 900, fontSize: "20px", letterSpacing: "-0.03em", color: "#C8F135", marginBottom: "3px" }}>
      METEEN AANMELDEN!
    </div>
    <div style={{ fontSize: "12px", fontWeight: 700, color: "#F5F0E8", opacity: 0.8 }}>
      Pak je uitdagingen met beide handen aan!
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT 1 — "Cinematic Dark"
// Full-bleed office image, strong navy-to-transparent gradient, cream text.
// The Call2Day logo wall in the photo echoes the form's navy card.
// ─────────────────────────────────────────────────────────────────────────────
const HeroV1 = () => (
  <section
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingTop: "7rem",
      paddingBottom: "4rem",
      padding: "7rem 1.5rem 4rem",
      position: "relative",
      overflow: "hidden",
      backgroundImage: `url(${IMG})`,
      backgroundSize: "cover",
      backgroundPosition: "center 30%",
    }}>
    {/* Cinematic gradient: hard navy left → dissolves right revealing office */}
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(26,31,46,0.96) 0%, rgba(26,31,46,0.88) 38%, rgba(26,31,46,0.45) 65%, rgba(26,31,46,0.1) 100%)" }} />

    <div style={{ maxWidth: "80rem", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "start" }}>

        {/* LEFT */}
        <div style={{ paddingTop: "1rem" }}>
          <Reveal>
            <div style={{ marginBottom: "2rem" }}><Badge dark /></div>
          </Reveal>
          <Reveal delay={0.05}>
            <div style={{ marginBottom: "1.25rem" }}><Headline color="#F5F0E8" /></div>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: "1.05rem", marginBottom: "1.5rem", maxWidth: "28rem", lineHeight: 1.65, color: "#F5F0E8", opacity: 0.82 }}>
              Heb jij een echte work hard, play hard-mentaliteit? Wil jij jezelf verder ontwikkelen in sales? Dan is Call2Day de plek voor jou!
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div style={{ marginBottom: "1.5rem" }}><PerksList light /></div>
          </Reveal>
          <Reveal delay={0.18}>
            <StatsRow light />
          </Reveal>
        </div>

        {/* RIGHT — form card floats over the bright office part */}
        <Reveal delay={0.1}>
          <div style={{ backdropFilter: "blur(1px)" }}>
            <FormHeader borderColor="#C8F135" />
            <FormMock borderColor="#0D0D0D" />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT 2 — "Hard Split"
// 50/50 brutalist two-panel. Cream left with all content + form.
// Full-height image right — image anchored to show workers + logo wall.
// Stat chips float over the image at the bottom.
// ─────────────────────────────────────────────────────────────────────────────
const HeroV2 = () => (
  <section style={{ minHeight: "100vh", display: "flex", overflow: "hidden" }}>

    {/* LEFT — cream panel */}
    <div style={{ flex: "0 0 50%", backgroundColor: "#F5F0E8", display: "flex", flexDirection: "column", justifyContent: "center", padding: "7rem 2.5rem 3rem", borderRight: "4px solid #0D0D0D", overflowY: "auto" }}>
      <Reveal>
        <div style={{ marginBottom: "1.75rem" }}><Badge /></div>
      </Reveal>
      <Reveal delay={0.05}>
        <div style={{ marginBottom: "1rem" }}><Headline /></div>
      </Reveal>
      <Reveal delay={0.1}>
        <p style={{ fontSize: "1rem", marginBottom: "1.5rem", lineHeight: 1.65, opacity: 0.76, maxWidth: "24rem" }}>
          Heb jij een echte work hard, play hard-mentaliteit? Salescarrière met echte beloningen bij Call2Day.
        </p>
      </Reveal>
      <Reveal delay={0.14}>
        <div style={{ marginBottom: "1.5rem" }}><PerksList /></div>
      </Reveal>
      <Reveal delay={0.17}>
        <div style={{ marginBottom: "2rem" }}><StatsRow /></div>
      </Reveal>
      <Reveal delay={0.2}>
        <FormHeader />
        <FormMock />
      </Reveal>
    </div>

    {/* RIGHT — full-height image */}
    <div style={{ flex: "0 0 50%", position: "relative", overflow: "hidden" }}>
      <img
        src={IMG}
        alt="Call2Day kantoor"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "28% center", display: "block" }}
      />
      {/* Subtle bottom scrim for stat chips */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "160px", background: "linear-gradient(to top, rgba(13,13,13,0.8) 0%, transparent 100%)" }} />
      {/* Stat chips */}
      <div style={{ position: "absolute", bottom: "1.75rem", left: "1.75rem", right: "1.75rem", display: "flex", gap: "10px" }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ flex: 1, backgroundColor: "#C8F135", border: "3px solid #0D0D0D", boxShadow: "3px 3px 0 #0D0D0D", padding: "10px 14px", textAlign: "center" }}>
            <div style={{ fontWeight: 900, fontSize: "1rem", letterSpacing: "-0.03em" }}>{s.val}</div>
            <div style={{ fontWeight: 600, fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.65 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT 3 — "Panoramic Strip"
// Cream background. Wide headline at top. The image runs full-width as a
// cinematic horizontal band — stats overlaid on it. Copy + form below.
// Leverages the panoramic 5120×2194 aspect ratio of the photo.
// ─────────────────────────────────────────────────────────────────────────────
const HeroV3 = () => (
  <section style={{ minHeight: "100vh", backgroundColor: "#F5F0E8", paddingTop: "7rem", paddingBottom: "4rem" }}>
    <div style={{ maxWidth: "82rem", margin: "0 auto", padding: "0 1.5rem" }}>

      {/* Top — badge + large headline */}
      <Reveal>
        <div style={{ marginBottom: "1.5rem" }}><Badge /></div>
      </Reveal>
      <Reveal delay={0.05}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontWeight: 900, fontSize: "clamp(3.2rem, 6.5vw, 5.5rem)", lineHeight: 1, letterSpacing: "-0.05em", maxWidth: "55%" }}>
            Elke beller een{" "}
            <span style={{ display: "inline-block", marginTop: "6px" }}>
              <span style={{ backgroundColor: "#C8F135", border: "3px solid #0D0D0D", display: "inline-block", marginRight: "8px", padding: "0 5px" }}>échte</span>
              <span style={{ backgroundColor: "#C8F135", border: "3px solid #0D0D0D", display: "inline-block", padding: "0 5px" }}>stem</span>
              <span>.</span>
            </span>
          </h1>
        </div>
      </Reveal>

      {/* Panoramic image strip */}
      <Reveal delay={0.1}>
        <div style={{ position: "relative", marginBottom: "2.5rem", border: "3px solid #0D0D0D", boxShadow: "7px 7px 0 #0D0D0D", overflow: "hidden", height: "310px" }}>
          <img
            src={IMG}
            alt="Call2Day kantoor"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }}
          />
          {/* Bottom gradient scrim */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55%", background: "linear-gradient(to top, rgba(26,31,46,0.88) 0%, transparent 100%)" }} />
          {/* Stats overlaid on image */}
          <div style={{ position: "absolute", bottom: "1.5rem", left: "2rem", right: "2rem", display: "flex", gap: "3rem", alignItems: "flex-end" }}>
            {STATS.map((s, i) => (
              <div key={i}>
                <div style={{ fontWeight: 900, fontSize: "1.8rem", letterSpacing: "-0.04em", color: "#C8F135", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontWeight: 600, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#F5F0E8", opacity: 0.75, marginTop: "3px" }}>{s.label}</div>
              </div>
            ))}
          </div>
          {/* Top-right label */}
          <div style={{ position: "absolute", top: "1rem", right: "1rem", backgroundColor: "#C8F135", border: "2px solid #0D0D0D", padding: "5px 12px", fontWeight: 700, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Onze vloer →
          </div>
        </div>
      </Reveal>

      {/* Bottom — copy left, form right */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
        <Reveal delay={0.14}>
          <div>
            <p style={{ fontSize: "1.05rem", marginBottom: "1.5rem", lineHeight: 1.65, opacity: 0.76 }}>
              Heb jij een echte work hard, play hard-mentaliteit? Wil jij jezelf verder ontwikkelen in sales? En wil je daar ook mooi voor beloond worden?
            </p>
            <PerksList />
          </div>
        </Reveal>
        <Reveal delay={0.18}>
          <FormHeader />
          <FormMock />
        </Reveal>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT 4 — "Green Wash"
// Office image fills the entire section. A subtle brand-green color wash
// (mix-blend: multiply) tints the office in the brand palette.
// Content is centered — big hero headline, stats, then form card.
// ─────────────────────────────────────────────────────────────────────────────
const HeroV4 = () => (
  <section
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "7rem 1.5rem 4rem",
      position: "relative",
      overflow: "hidden",
    }}>
    {/* Background layers */}
    <div style={{ position: "absolute", inset: 0 }}>
      <img src={IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 32%" }} />
      {/* Brand green tint wash */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "#C8F135", opacity: 0.22, mixBlendMode: "multiply" }} />
      {/* Readability dark veil */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(13,13,13,0.72) 0%, rgba(13,13,13,0.52) 50%, rgba(13,13,13,0.72) 100%)" }} />
    </div>

    <div style={{ maxWidth: "80rem", margin: "0 auto", width: "100%", position: "relative", zIndex: 1, textAlign: "center" }}>

      <Reveal>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}><Badge dark /></div>
      </Reveal>

      {/* Big centered headline */}
      <Reveal delay={0.06}>
        <h1 style={{ fontWeight: 900, fontSize: "clamp(3.5rem, 7vw, 6.5rem)", lineHeight: 1, letterSpacing: "-0.05em", color: "#F5F0E8", marginBottom: "1.5rem" }}>
          Elke beller een{" "}
          <span style={{ backgroundColor: "#C8F135", color: "#0D0D0D", border: "3px solid #0D0D0D", padding: "0 8px", whiteSpace: "nowrap", display: "inline-block" }}>
            échte stem
          </span>
          <span style={{ color: "#F5F0E8" }}>.</span>
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p style={{ fontSize: "1.1rem", marginBottom: "2.5rem", maxWidth: "34rem", lineHeight: 1.65, color: "#F5F0E8", opacity: 0.85, margin: "0 auto 2.5rem" }}>
          Work hard, play hard. Salescarrière met echte beloningen. Jij bij Call2Day!
        </p>
      </Reveal>

      {/* Stats row — centered */}
      <Reveal delay={0.13}>
        <div style={{ display: "flex", justifyContent: "center", gap: "0", marginBottom: "3rem" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: "16px 28px", textAlign: "center", borderRight: i < STATS.length - 1 ? "2px solid rgba(200,241,53,0.3)" : "none" }}>
              <div style={{ fontWeight: 900, fontSize: "2rem", letterSpacing: "-0.04em", color: "#C8F135", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.09em", color: "#F5F0E8", opacity: 0.65, marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Centered form card */}
      <Reveal delay={0.16}>
        <div style={{ maxWidth: "38rem", margin: "0 auto" }}>
          <FormHeader borderColor="#C8F135" />
          <FormMock borderColor="#0D0D0D" />
        </div>
      </Reveal>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT 5 — "Framed Office"
// Content + form on the left. The office image lives inside a large brutalist
// frame on the right — thick black border, inner green border, slight rotation
// (-2deg) for kinetic energy, navy shadow block behind it.
// A caption strip at the base: "Onze vloer. Jouw toekomst."
// ─────────────────────────────────────────────────────────────────────────────
const HeroV5 = () => (
  <section style={{ minHeight: "100vh", backgroundColor: "#F5F0E8", display: "flex", flexDirection: "column", justifyContent: "center", padding: "7rem 1.5rem 4rem" }}>
    <div style={{ maxWidth: "82rem", margin: "0 auto", width: "100%" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: "2.5rem", alignItems: "center" }}>

        {/* LEFT — copy + form */}
        <div>
          <Reveal>
            <div style={{ marginBottom: "1.75rem" }}><Badge /></div>
          </Reveal>
          <Reveal delay={0.05}>
            <div style={{ marginBottom: "1rem" }}><Headline /></div>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: "1rem", marginBottom: "1.5rem", lineHeight: 1.65, opacity: 0.74, maxWidth: "26rem" }}>
              Heb jij een echte work hard, play hard-mentaliteit? Wil jij jezelf verder ontwikkelen in sales? Dan is Call2Day de plek voor jou!
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div style={{ marginBottom: "1.4rem" }}><PerksList /></div>
          </Reveal>
          <Reveal delay={0.17}>
            <div style={{ marginBottom: "2rem" }}><StatsRow /></div>
          </Reveal>
          <Reveal delay={0.2}>
            <FormHeader />
            <FormMock />
          </Reveal>
        </div>

        {/* RIGHT — brutalist image frame */}
        <Reveal delay={0.08}>
          <div style={{ position: "relative", padding: "14px" }}>
            {/* Navy shadow-block behind the frame (gives depth) */}
            <div style={{
              position: "absolute",
              inset: 0,
              transform: "rotate(-2deg) translate(12px, 14px)",
              backgroundColor: "#1A1F2E",
              border: "3px solid #0D0D0D",
            }} />
            {/* Outer frame — rotated */}
            <div style={{
              position: "relative",
              transform: "rotate(-2deg)",
              border: "5px solid #0D0D0D",
              backgroundColor: "#0D0D0D",
            }}>
              {/* Inner green accent border */}
              <div style={{ border: "3px solid #C8F135", overflow: "hidden" }}>
                <img
                  src={IMG}
                  alt="Call2Day kantoor"
                  style={{ width: "100%", height: "460px", objectFit: "cover", objectPosition: "22% center", display: "block" }}
                />
              </div>
              {/* Caption strip */}
              <div style={{
                backgroundColor: "#C8F135",
                borderTop: "3px solid #0D0D0D",
                padding: "13px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span style={{ fontWeight: 900, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#0D0D0D" }}>
                  Onze vloer. Jouw toekomst.
                </span>
                <span style={{ fontWeight: 900, fontSize: "12px", color: "#0D0D0D" }}>50+ agents →</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// ─── PREVIEW WRAPPER ──────────────────────────────────────────────────────────

const VARIANTS = [
  {
    n: "1",
    title: "Cinematic Dark",
    desc: "Full-bleed image background · navy gradient overlay · text glows on dark",
    Component: HeroV1,
  },
  {
    n: "2",
    title: "Hard Split",
    desc: "50/50 two-panel · cream + form left · full-height image right · stat chips",
    Component: HeroV2,
  },
  {
    n: "3",
    title: "Panoramic Strip",
    desc: "Cream background · wide image band between headline and form · stats overlaid",
    Component: HeroV3,
  },
  {
    n: "4",
    title: "Green Wash",
    desc: "Image background · brand-green color tint · centered headline + form",
    Component: HeroV4,
  },
  {
    n: "5",
    title: "Framed Office",
    desc: "Content + form left · image in a rotated brutalist frame right",
    Component: HeroV5,
  },
];

const HeroPreview = () => (
  <div style={{ backgroundColor: "#0D0D0D" }}>
    {/* Sticky top bar */}
    <div style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      backgroundColor: "#C8F135",
      borderBottom: "3px solid #0D0D0D",
      padding: "14px 28px",
      display: "flex",
      alignItems: "center",
      gap: "20px",
    }}>
      <span style={{ fontWeight: 900, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#0D0D0D" }}>
        HERO DESIGNS — 5 varianten
      </span>
      <span style={{ fontWeight: 500, fontSize: "12px", color: "#0D0D0D", opacity: 0.55 }}>
        Scroll om te vergelijken · Kies je favoriet
      </span>
      <a href="/" style={{ marginLeft: "auto", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#0D0D0D", textDecoration: "none", opacity: 0.6 }}>
        ← Terug naar site
      </a>
    </div>

    {VARIANTS.map(({ n, title, desc, Component }) => (
      <div key={n} style={{ borderBottom: "6px solid #0D0D0D" }}>
        {/* Section label */}
        <div style={{
          backgroundColor: "#1A1F2E",
          padding: "18px 28px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          borderBottom: "3px solid #0D0D0D",
        }}>
          <div style={{
            backgroundColor: "#C8F135",
            border: "3px solid #0D0D0D",
            width: "38px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            fontSize: "17px",
            flexShrink: 0,
            color: "#0D0D0D",
          }}>
            {n}
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: "15px", color: "#C8F135", letterSpacing: "-0.02em" }}>{title}</div>
            <div style={{ fontWeight: 500, fontSize: "11px", color: "#F5F0E8", opacity: 0.55, marginTop: "2px" }}>{desc}</div>
          </div>
        </div>
        <Component />
      </div>
    ))}

    {/* Footer */}
    <div style={{ padding: "24px 28px", textAlign: "center" }}>
      <p style={{ color: "#F5F0E8", opacity: 0.4, fontSize: "12px", fontWeight: 500 }}>
        Forms above are visual mockups. The real AgentSignupForm will be wired in after you pick a design.
      </p>
    </div>
  </div>
);

export default HeroPreview;
