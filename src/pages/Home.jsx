import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Headphones, Target, Star, ArrowRight, Menu, X, CheckCircle, ChevronDown } from "lucide-react";
import { submitForm } from "@/lib/submitForm";

// ─── LOGO URLS ────────────────────────────────────────────────────────────────
const LOGO_URL = "/call2day-logo-v1.png";
const SYMBOL_URL = "/call2day-logo-v1-symbol.png";

// ─── NETHERLANDS CITIES ───────────────────────────────────────────────────────
const NL_CITIES = [
"Amsterdam", "Rotterdam", "Den Haag", "Utrecht", "Eindhoven",
"Groningen", "Tilburg", "Almere", "Breda", "Nijmegen",
"Enschede", "Haarlem", "Arnhem", "Zaanstad", "Amersfoort",
"Apeldoorn", "s-Hertogenbosch", "Hoofddorp", "Maastricht", "Leiden",
"Dordrecht", "Zoetermeer", "Zwolle", "Deventer", "Delft",
"Alkmaar", "Venlo", "Leeuwarden", "Hilversum", "Middelburg"];

// ─── SCROLL REVEAL WRAPPER ───────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay }}
      className={className}>
      
      {children}
    </motion.div>);

};

// ─── AGENT SIGNUP FORM (reusable) ─────────────────────────────────────────────
const AgentSignupForm = ({ onDark = false }) => {
  const [form, setForm] = useState({
    naam: "", email: "", telefoon: "", geboortedatum: "", stad: "", locatie: "", ervaring: 3
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locatieOpen, setLocatieOpen] = useState(false);
  const [locatieSearch, setLocatieSearch] = useState("");
  const dropdownRef = useRef(null);

  const filteredCities = NL_CITIES.filter((c) =>
  c.toLowerCase().includes(locatieSearch.toLowerCase())
  );

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLocatieOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const validate = () => {
    const e = {};
    if (!form.naam.trim()) e.naam = "Verplicht";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Ongeldig e-mail";
    if (!form.telefoon.trim()) e.telefoon = "Verplicht";
    if (!form.geboortedatum) e.geboortedatum = "Verplicht";
    if (!form.stad.trim()) e.stad = "Verplicht";
    if (!form.locatie) e.locatie = "Kies een locatie";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    try {
      await submitForm("agent", {
        naam: form.naam,
        email: form.email,
        telefoon: form.telefoon,
        geboortedatum: form.geboortedatum,
        stad: form.stad,
        locatie: form.locatie,
        ervaring: String(form.ervaring),
      });
      setSubmitted(true);
    } catch {
      setErrors({ _general: "Er is iets misgegaan. Probeer het later opnieuw." });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    if (errors[field]) setErrors((e) => {const n = { ...e };delete n[field];return n;});
  };

  // Input field style — enclosed style in dark navy bg
  const inputStyle = {
    background: "#F5F0E8",
    border: "2px solid #0D0D0D",
    color: "#0D0D0D",
    padding: "10px 12px",
    width: "100%",
    fontSize: "0.875rem",
    fontFamily: "Inter, system-ui, sans-serif",
    fontWeight: 600,
    outline: "none",
    borderRadius: 0
  };

  const sliderTrackPct = form.ervaring / 10 * 100;

  if (submitted) {
    return (
      <div
        className="flex flex-col items-center justify-center text-center p-10"
        style={{ backgroundColor: "#C8F135", border: "3px solid #0D0D0D", boxShadow: "5px 5px 0px #0D0D0D", minHeight: 340 }}>
        
        <CheckCircle size={48} style={{ color: "#0D0D0D", marginBottom: 16 }} />
        <div className="heading-black text-2xl mb-2" style={{ color: "#0D0D0D" }}>Aanmelding ontvangen!</div>
        <p className="text-sm" style={{ color: "#0D0D0D", opacity: 0.8 }}>We nemen zo snel mogelijk contact met je op.</p>
      </div>);

  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        backgroundColor: "var(--belpro-navy)",
        border: "3px solid #0D0D0D",
        boxShadow: "6px 6px 0px #C8F135",
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 16
      }}>
      
      {/* Slider — jaren ervaring */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="label-upper text-xs" style={{ color: "#C8F135" }}>Jaren ervaring</label>
          <div className="text-xs font-bold" style={{ color: "#C8F135", fontSize: "1rem", lineHeight: 1 }}>
            {form.ervaring}
          </div>
        </div>
        <div className="relative" style={{ height: 24, display: "flex", alignItems: "center" }}>
          {/* Track bg */}
          <div style={{ position: "absolute", left: 0, right: 0, height: 4, backgroundColor: "rgba(245,240,232,0.2)", border: "1px solid rgba(245,240,232,0.1)" }} />
          {/* Track fill */}
          <div style={{ position: "absolute", left: 0, width: `${sliderTrackPct}%`, height: 4, backgroundColor: "#C8F135" }} />
          <input
            type="range"
            min={0}
            max={10}
            step={1}
            value={form.ervaring}
            onChange={(e) => handleChange("ervaring", Number(e.target.value))}
            style={{
              position: "relative",
              width: "100%",
              appearance: "none",
              background: "transparent",
              cursor: "pointer",
              zIndex: 2
            }}
            className="agent-slider" />
          
        </div>
      </div>

      {/* Naam — full width */}
      <div>
        <input
          type="text"
          placeholder="Voor- & Achternaam"
          value={form.naam}
          onChange={(e) => handleChange("naam", e.target.value)}
          style={inputStyle} />
        
        {errors.naam && <div className="text-xs mt-1" style={{ color: "#C8F135" }}>{errors.naam}</div>}
      </div>

      {/* Email + Telefoon */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            type="email"
            placeholder="E-mailadres"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            style={inputStyle} />
          
          {errors.email && <div className="text-xs mt-1" style={{ color: "#C8F135" }}>{errors.email}</div>}
        </div>
        <div>
          <input
            type="tel"
            placeholder="Telefoonnummer"
            value={form.telefoon}
            onChange={(e) => handleChange("telefoon", e.target.value)}
            style={inputStyle} />
          
          {errors.telefoon && <div className="text-xs mt-1" style={{ color: "#C8F135" }}>{errors.telefoon}</div>}
        </div>
      </div>

      {/* Geboortedatum + Woonplaats */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            type="date"
            placeholder="Geboortedatum"
            value={form.geboortedatum}
            onChange={(e) => handleChange("geboortedatum", e.target.value)}
            style={{ ...inputStyle, colorScheme: "light" }} />
          
          {errors.geboortedatum && <div className="text-xs mt-1" style={{ color: "#C8F135" }}>{errors.geboortedatum}</div>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Woonplaats / Stad"
            value={form.stad}
            onChange={(e) => handleChange("stad", e.target.value)}
            style={inputStyle} />
          
          {errors.stad && <div className="text-xs mt-1" style={{ color: "#C8F135" }}>{errors.stad}</div>}
        </div>
      </div>

      {/* Locatie dropdown — searchable */}
      <div ref={dropdownRef} style={{ position: "relative" }}>
        <button
          type="button"
          onClick={() => setLocatieOpen((v) => !v)}
          style={{
            ...inputStyle,
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer"
          }}>
          
          <span style={{ color: form.locatie ? "#0D0D0D" : "#999" }}>
            {form.locatie || "Locatie — kies jouw regio"}
          </span>
          <ChevronDown size={16} style={{ color: "#0D0D0D", flexShrink: 0 }} />
        </button>
        {errors.locatie && <div className="text-xs mt-1" style={{ color: "#C8F135" }}>{errors.locatie}</div>}

        {locatieOpen &&
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 2px)",
            left: 0,
            right: 0,
            backgroundColor: "#F5F0E8",
            border: "2px solid #0D0D0D",
            zIndex: 50,
            maxHeight: 200,
            overflowY: "auto",
            boxShadow: "4px 4px 0px #0D0D0D"
          }}>
          
            <div style={{ padding: "8px", borderBottom: "1px solid #0D0D0D" }}>
              <input
              type="text"
              placeholder="Zoek stad..."
              value={locatieSearch}
              onChange={(e) => setLocatieSearch(e.target.value)}
              style={{ ...inputStyle, padding: "6px 8px", fontSize: "0.8rem" }}
              autoFocus />
            
            </div>
            {filteredCities.length === 0 ?
          <div style={{ padding: "10px 12px", fontSize: "0.8rem", color: "#0D0D0D", opacity: 0.5 }}>Geen resultaten</div> :
          filteredCities.map((city) =>
          <button
            key={city}
            type="button"
            onClick={() => {
              handleChange("locatie", city);
              setLocatieOpen(false);
              setLocatieSearch("");
            }}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "8px 12px",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#0D0D0D",
              background: form.locatie === city ? "#C8F135" : "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "Inter, system-ui, sans-serif"
            }}
            onMouseEnter={(e) => {if (form.locatie !== city) e.currentTarget.style.backgroundColor = "rgba(200,241,53,0.2)";}}
            onMouseLeave={(e) => {if (form.locatie !== city) e.currentTarget.style.backgroundColor = "transparent";}}>
            
                {city}
              </button>
          )}
          </div>
        }
      </div>

      {/* Submit */}
      {errors._general && (
        <p className="text-xs text-center" style={{ color: "#C8F135", opacity: 0.9 }}>{errors._general}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="btn-brutal w-full py-3.5 text-sm font-black uppercase tracking-wider"
        style={{
          backgroundColor: "#C8F135",
          color: "#0D0D0D",
          borderColor: "#0D0D0D",
          boxShadow: "4px 4px 0px #0D0D0D",
          marginTop: 4,
          opacity: loading ? 0.8 : 1
        }}>
        
        {loading ? "Bezig..." : "Aanmelden!"}
      </button>
    </form>);

};

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total * 100 : 0;
      const bar = document.getElementById("progress-bar");
      if (bar) bar.style.width = `${progress}%`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
  { label: "Diensten", href: "#diensten" },
  { label: "Over ons", href: "#over-ons" },
  { label: "Klanten", href: "#klanten" },
  { label: "Vacatures", href: "#aanmelden" },
  { label: "Contact", href: "#contact" }];

  return (
    <>
      <div id="progress-bar" />
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{
          backgroundColor: "var(--belpro-navy)",
          borderBottom: scrolled ? "3px solid #C8F135" : "3px solid transparent"
        }}>
        
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <img
              src={LOGO_URL}
              alt="Call2Day logo"
              style={{ height: 42, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) =>
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-widest transition-colors duration-150"
              style={{ color: "#F5F0E8", letterSpacing: "0.07em" }}
              onMouseEnter={(e) => e.target.style.color = "#C8F135"}
              onMouseLeave={(e) => e.target.style.color = "#F5F0E8"}>
              
                {link.label}
              </a>
            )}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="#aanmelden"
              className="btn-brutal px-5 py-2.5 text-sm"
              style={{ backgroundColor: "#C8F135", color: "#0D0D0D" }}>
              
              Nu aanmelden
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "#F5F0E8" }}>
            
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen &&
        <div
          className="md:hidden border-t-2 px-6 py-6 flex flex-col gap-4"
          style={{ backgroundColor: "var(--belpro-navy)", borderColor: "#C8F135" }}>
          
            {navLinks.map((link) =>
          <a
            key={link.href}
            href={link.href}
            className="text-base font-bold uppercase tracking-widest"
            style={{ color: "#F5F0E8" }}
            onClick={() => setMenuOpen(false)}>
            
                {link.label}
              </a>
          )}
            <a
            href="#aanmelden"
            className="btn-brutal px-5 py-3 text-sm text-center mt-2"
            style={{ backgroundColor: "#C8F135", color: "#0D0D0D" }}
            onClick={() => setMenuOpen(false)}>
            
              Nu aanmelden
            </a>
          </div>
        }
      </nav>
    </>);

};

// ─── HERO ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  return (
    <section
      id="aanmelden"
      className="min-h-screen flex flex-col justify-center pt-28 pb-16 px-6"
      style={{ backgroundColor: "#F5F0E8" }}>
      
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT — copy */}
          <div className="pt-4">
            {/* Badge */}
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 belpro-border belpro-shadow"
              style={{ backgroundColor: "#C8F135" }}>
                <span className="pulse-dot w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#0D0D0D" }} />
                <span className="label-upper text-xs" style={{ color: "#0D0D0D" }}>Werken bij Call2Day</span>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal delay={0.05}>
              <h1 className="heading-black text-5xl sm:text-6xl xl:text-7xl mb-6 leading-none" style={{ color: "#0D0D0D" }}>
                Elke beller een{" "}
                <span className="inline-block mt-2">
                  <span className="highlight-green belpro-border inline-block mr-2">échte</span>
                  <span className="highlight-green belpro-border inline-block">stem</span>
                  <span>.</span>
                </span>
              </h1>
            </Reveal>

            {/* Subtext */}
            <Reveal delay={0.1}>
              <p className="text-lg mb-6 max-w-md leading-relaxed" style={{ color: "#0D0D0D", opacity: 0.8 }}>
                Heb jij de work hard – play hard mentaliteit? Wil jij je op salesgebied verder ontwikkelen? En wil je serieuze knaken verdienen? Dan is Call2Day jouw organisatie!
              </p>
            </Reveal>

            {/* Perks */}
            <Reveal delay={0.15}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                "Aantrekkelijk salaris",
                "Royale bonusstructuur",
                "Super toffe extra's",
                "Persoonlijke coaching"].
                map((perk, i) =>
                <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={15} style={{ color: "var(--belpro-navy)", flexShrink: 0 }} />
                    <span className="text-sm font-semibold" style={{ color: "#0D0D0D" }}>{perk}</span>
                  </div>
                )}
              </div>
            </Reveal>

            {/* Social proof */}
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-5 text-sm font-bold" style={{ color: "#0D0D0D" }}>
                <span><strong>200+</strong> agents actief</span>
                <span style={{ opacity: 0.25 }}>·</span>
                <span><strong>NL · FR · EN</strong> meertalig</span>
                <span style={{ opacity: 0.25 }}>·</span>
                <span><strong>4,8/5</strong> tevredenheid</span>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — Signup Form */}
          <Reveal delay={0.1} className="w-full">
            <div>
              {/* Form header */}
              <div
                className="px-6 py-5"
                style={{ backgroundColor: "var(--belpro-navy)", border: "3px solid #0D0D0D", borderBottom: "none" }}>
                
                <div className="heading-black text-2xl mb-1" style={{ color: "#C8F135" }}>METEEN AANMELDEN!</div>
                <div className="text-sm font-bold" style={{ color: "#F5F0E8" }}>Pak je uitdagingen met beide handen aan!</div>
              </div>
              <AgentSignupForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>);

};

// ─── TICKER BAR ───────────────────────────────────────────────────────────────
const TickerBar = () => {
  const items = [
  "200+ AGENTS ACTIEF",
  "WERK IN HEEL NEDERLAND",
  "4,8/5 WERKNEMERSTEVREDENHEID",
  "10+ JAAR ERVARING",
  "ROYALE BONUSSTRUCTUUR",
  "NL · FR · EN MEERTALIG TEAM",
  "200+ AGENTS ACTIEF",
  "WERK IN HEEL NEDERLAND",
  "4,8/5 WERKNEMERSTEVREDENHEID",
  "10+ JAAR ERVARING",
  "ROYALE BONUSSTRUCTUUR",
  "NL · FR · EN MEERTALIG TEAM"];

  return (
    <section id="stats" style={{ backgroundColor: "#C8F135", borderTop: "3px solid #0D0D0D", borderBottom: "3px solid #0D0D0D", overflow: "hidden" }}>
      <div className="ticker-track py-4">
        {items.map((item, i) =>
        <span key={i} className="flex items-center gap-6 mx-6">
            <span className="label-upper text-sm" style={{ color: "#0D0D0D", whiteSpace: "nowrap" }}>{item}</span>
            <span style={{ color: "#0D0D0D", opacity: 0.4, fontSize: "1.25rem" }}>◆</span>
          </span>
        )}
      </div>
    </section>);

};

// ─── SERVICES ─────────────────────────────────────────────────────────────────
const Services = () => {
  const services = [
  {
    num: "01",
    icon: <Phone size={28} />,
    title: "Telesales",
    desc: "Outbound verkoopgesprekken door ervaren agents die jouw product of dienst doorgronden en deals sluiten.",
    tag: "OUTBOUND"
  },
  {
    num: "02",
    icon: <Headphones size={28} />,
    title: "Klantenservice",
    desc: "Inbound klantenondersteuning: vragen beantwoorden, klachten oplossen, en klanten behouden — in jouw naam.",
    tag: "INBOUND"
  },
  {
    num: "03",
    icon: <Target size={28} />,
    title: "Leadgeneratie",
    desc: "Gekwalificeerde leads aanleveren via gerichte belt campagnes. Wij filteren, jij sluit. Zo simpel is het.",
    tag: "B2B / B2C"
  }];

  return (
    <section id="diensten" className="py-24 px-6" style={{ backgroundColor: "#F5F0E8" }}>
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-baseline gap-4 mb-4">
            <span className="label-upper text-xs" style={{ color: "#0D0D0D", opacity: 0.5 }}>Wat wij doen</span>
          </div>
          <h2 className="heading-black text-5xl md:text-6xl mb-16" style={{ color: "#0D0D0D" }}>
            Onze <span className="highlight-green">Diensten</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) =>
          <Reveal key={i} delay={i * 0.08}>
              <div className="card-brutal p-8 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <span className="heading-black text-5xl" style={{ color: "#C8F135", WebkitTextStroke: "2px #0D0D0D" }}>
                    {s.num}
                  </span>
                  <span className="label-upper text-xs px-3 py-1 belpro-border" style={{ color: "#0D0D0D", backgroundColor: "#C8F135" }}>
                    {s.tag}
                  </span>
                </div>
                <div className="mb-4" style={{ color: "#0D0D0D" }}>{s.icon}</div>
                <h3 className="heading-black text-3xl mb-3" style={{ color: "#0D0D0D" }}>{s.title}</h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: "#0D0D0D", opacity: 0.75, flex: 1 }}>{s.desc}</p>
                <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
                style={{ color: "#0D0D0D", borderBottom: "2px solid #0D0D0D", paddingBottom: "2px", width: "fit-content" }}>
                
                  Meer info <ArrowRight size={14} />
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

};

// ─── ABOUT ────────────────────────────────────────────────────────────────────
const About = () => {
  return (
    <section id="over-ons" className="py-24 px-6" style={{ backgroundColor: "var(--belpro-navy)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <Reveal>
            <div
              className="belpro-border relative overflow-hidden"
              style={{ minHeight: "420px", backgroundColor: "#0D0D0D", boxShadow: "8px 8px 0px #C8F135" }}>
              
              <img src="/images/10_jaar_plus_jaar_sector_picture.png"

              alt="Call2Day team"
              className="w-full h-full object-cover absolute inset-0"
              style={{ opacity: 0.7, mixBlendMode: "luminosity" }} />
              
              <div
                className="absolute bottom-0 left-0 right-0 px-6 py-4"
                style={{ backgroundColor: "rgba(13,13,13,0.85)", borderTop: "3px solid #C8F135" }}>
                
                <span className="label-upper text-xs" style={{ color: "#C8F135" }}>Call2Day Team · Nederland</span>
              </div>
              <div
                className="absolute top-6 left-6 belpro-border px-4 py-3"
                style={{ backgroundColor: "#C8F135", boxShadow: "4px 4px 0px #0D0D0D" }}>
                
                <div className="heading-black text-3xl" style={{ color: "#0D0D0D" }}>10+</div>
                <div className="text-xs font-bold uppercase" style={{ color: "#0D0D0D" }}>jaar in de sector</div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.05}>
              <span className="label-upper text-xs mb-4 block" style={{ color: "#C8F135" }}>Over ons</span>
              <h2 className="heading-black text-5xl md:text-6xl mb-6" style={{ color: "#F5F0E8" }}>
                Wij zijn <span className="highlight-green" style={{ color: "#0D0D0D" }}>Call2Day</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-base mb-6 leading-relaxed" style={{ color: "#F5F0E8", opacity: 0.8 }}>
                Call2Day is opgericht vanuit een simpele overtuiging: elk telefoontje verdient een échte stem. Geen robotstemmen, geen overvolle callcenters, geen gehaaste gesprekken.
              </p>
              <p className="text-base mb-8 leading-relaxed" style={{ color: "#F5F0E8", opacity: 0.8 }}>
                Ons team van ervaren Nederlandstalige agents werkt volledig in jouw naam. We denken mee met je merk, spreken je taal en vertegenwoordigen jou alsof we zelf bij je bedrijf in dienst zijn. Snelle onboarding, transparante rapportages, en altijd een vaste contactpersoon.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {["Nederlandstalig team", "Snelle onboarding", "Dagelijkse rapportages", "Vaste contactpersoon"].map((item, i) =>
                <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={16} style={{ color: "#C8F135", flexShrink: 0 }} />
                    <span className="text-sm font-semibold" style={{ color: "#F5F0E8" }}>{item}</span>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <a
                href="#contact"
                className="btn-brutal px-6 py-3.5 text-sm inline-flex items-center gap-2"
                style={{ backgroundColor: "#C8F135", color: "#0D0D0D", borderColor: "#C8F135", boxShadow: "4px 4px 0px #C8F135" }}>
                
                Leer ons kennen <ArrowRight size={16} />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>);

};

// ─── CLIENTS ──────────────────────────────────────────────────────────────────
const Clients = () => {
  const clients = ["NovaTel", "Stadshaven", "Beltrix", "Kade12", "Mondo", "Rijnport"];

  return (
    <section id="klanten" className="py-24 px-6" style={{ backgroundColor: "#F5F0E8", borderTop: "3px solid #0D0D0D" }}>
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <span className="label-upper text-xs mb-3 block" style={{ color: "#0D0D0D", opacity: 0.5 }}>Onze klanten</span>
            <h2 className="heading-black text-5xl md:text-6xl" style={{ color: "#0D0D0D" }}>
              Vertrouwd <span className="highlight-green">door</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {clients.map((client, i) =>
          <Reveal key={i} delay={i * 0.06}>
              <div
              className="belpro-border belpro-shadow flex items-center justify-center py-6 px-4 transition-all duration-150 cursor-default"
              style={{ backgroundColor: "#0D0D0D" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#C8F135";
                e.currentTarget.querySelectorAll("span").forEach((s) => s.style.color = "#0D0D0D");
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#0D0D0D";
                e.currentTarget.querySelectorAll("span").forEach((s) => s.style.color = "#F5F0E8");
              }}>
              
                <span className="font-black text-lg text-center leading-tight" style={{ color: "#F5F0E8", letterSpacing: "-0.02em" }}>
                  {client}
                </span>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

};

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const Testimonials = () => {
  const testimonials = [
  {
    quote: "Call2Day heeft onze klantenservice volledig getransformeerd. De agents zijn professioneel, snel en spreken perfect Nederlands. Onze klanttevredenheid is met 30% gestegen.",
    name: "Marieke de Vries",
    company: "NovaTel B.V.",
    stars: 5
  },
  {
    quote: "De leadkwaliteit van Call2Day is indrukwekkend. We krijgen warme leads aangeleverd die al grotendeels gekwalificeerd zijn. Onze conversie is verdubbeld in 3 maanden.",
    name: "Thomas van den Berg",
    company: "Kade12 Marketing",
    stars: 5
  },
  {
    quote: "Snelle onboarding, geen gedoe. Binnen een week waren ze al live voor ons. Vaste contactpersoon, dagelijkse updates, en altijd bereikbaar. Precies wat we nodig hadden.",
    name: "Sandra Jansen",
    company: "Stadshaven Logistics",
    stars: 5
  }];

  return (
    <section id="testimonials" className="py-24 px-6" style={{ backgroundColor: "#F5F0E8", borderTop: "3px solid #0D0D0D" }}>
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-16">
            <span className="label-upper text-xs mb-3 block" style={{ color: "#0D0D0D", opacity: 0.5 }}>Referenties</span>
            <h2 className="heading-black text-5xl md:text-6xl" style={{ color: "#0D0D0D" }}>
              Wat onze klanten <span className="highlight-green">zeggen</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) =>
          <Reveal key={i} delay={i * 0.08}>
              <div className="card-brutal p-8 relative overflow-hidden flex flex-col h-full">
                <div
                className="absolute top-2 left-4 heading-black select-none pointer-events-none"
                style={{ fontSize: "120px", color: "#0D0D0D", opacity: 0.06, lineHeight: 1 }}>
                
                  "
                </div>
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, si) =>
                <Star key={si} size={16} fill="#C8F135" style={{ color: "#C8F135" }} />
                )}
                </div>
                <p className="text-base leading-relaxed mb-6 flex-1 relative z-10" style={{ color: "#0D0D0D", opacity: 0.85 }}>
                  "{t.quote}"
                </p>
                <div className="pt-4" style={{ borderTop: "2px solid #0D0D0D" }}>
                  <div className="font-black text-base" style={{ color: "#0D0D0D" }}>{t.name}</div>
                  <div className="text-sm font-semibold" style={{ color: "#0D0D0D", opacity: 0.5 }}>{t.company}</div>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

};

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
const Contact = () => {
  const [form, setForm] = useState({ naam: "", bedrijf: "", telefoon: "", email: "", bericht: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.naam.trim()) e.naam = "Naam is verplicht";
    if (!form.bedrijf.trim()) e.bedrijf = "Bedrijfsnaam is verplicht";
    if (!form.telefoon.trim()) e.telefoon = "Telefoonnummer is verplicht";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Geldig e-mailadres verplicht";
    if (!form.bericht.trim()) e.bericht = "Bericht is verplicht";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    try {
      await submitForm("contact", { ...form });
      setSubmitted(true);
    } catch {
      setErrors({ _general: "Er is iets misgegaan. Probeer het later opnieuw." });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    if (errors[field]) setErrors((e) => {const n = { ...e };delete n[field];return n;});
  };

  return (
    <section id="contact" className="py-24 px-6" style={{ backgroundColor: "var(--belpro-navy)", borderTop: "3px solid #C8F135" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <span className="label-upper text-xs mb-4 block" style={{ color: "#C8F135" }}>Neem contact op</span>
            <h2 className="heading-black text-5xl md:text-6xl mb-6" style={{ color: "#F5F0E8" }}>
              Vraag een <span className="highlight-green" style={{ color: "#0D0D0D" }}>gratis</span><br />
              offerte aan.
            </h2>
            <p className="text-base mb-10 leading-relaxed" style={{ color: "#F5F0E8", opacity: 0.7 }}>
              Vul het formulier in en we nemen binnen 24 uur contact met je op. Geen verplichtingen, geen kleine lettertjes — gewoon een eerlijk gesprek.
            </p>
            <div className="flex flex-col gap-4">
              {[
              { label: "Telefoon", value: "+31 20 123 45 67" },
              { label: "E-mail", value: "info@call2day.be" },
              { label: "Adres", value: "Keizersgracht 123, Amsterdam" }].
              map((info, i) =>
              <div key={i} className="flex items-center gap-4">
                  <span className="label-upper text-xs w-24 flex-shrink-0" style={{ color: "#C8F135" }}>{info.label}</span>
                  <span className="text-base" style={{ color: "#F5F0E8", opacity: 0.85 }}>{info.value}</span>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {submitted ?
            <div
              className="belpro-border p-10 flex flex-col items-center justify-center text-center"
              style={{ backgroundColor: "#C8F135", boxShadow: "6px 6px 0px #C8F135", minHeight: "400px" }}>
              
                <CheckCircle size={48} style={{ color: "#0D0D0D", marginBottom: "16px" }} />
                <h3 className="heading-black text-3xl mb-3" style={{ color: "#0D0D0D" }}>Aanvraag ontvangen!</h3>
                <p className="text-base" style={{ color: "#0D0D0D", opacity: 0.8 }}>
                  We nemen binnen 24 uur contact met je op.
                </p>
              </div> :

            <form
              onSubmit={handleSubmit}
              className="belpro-border p-8 flex flex-col gap-6"
              style={{ backgroundColor: "#0D0D0D" }}
              noValidate>
              
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                { key: "naam", label: "Naam", type: "text", placeholder: "Jan de Vries" },
                { key: "bedrijf", label: "Bedrijfsnaam", type: "text", placeholder: "Acme B.V." },
                { key: "telefoon", label: "Telefoonnummer", type: "tel", placeholder: "+31 6 00 00 00 00" },
                { key: "email", label: "E-mailadres", type: "email", placeholder: "jan@bedrijf.nl" }].
                map((f) =>
                <div key={f.key} className="flex flex-col gap-1">
                      <label className="label-upper text-xs" style={{ color: "#C8F135" }}>{f.label}</label>
                      <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                    className="input-brutal" />
                  
                      {errors[f.key] && <span className="text-xs mt-1" style={{ color: "#C8F135", opacity: 0.8 }}>{errors[f.key]}</span>}
                    </div>
                )}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="label-upper text-xs" style={{ color: "#C8F135" }}>Bericht</label>
                  <textarea
                  rows={4}
                  placeholder="Vertel kort over je behoefte..."
                  value={form.bericht}
                  onChange={(e) => handleChange("bericht", e.target.value)}
                  className="input-brutal resize-none" />
                
                  {errors.bericht && <span className="text-xs mt-1" style={{ color: "#C8F135", opacity: 0.8 }}>{errors.bericht}</span>}
                </div>
                {errors._general && (
                  <p className="text-xs text-center" style={{ color: "#C8F135", opacity: 0.9 }}>{errors._general}</p>
                )}
                <button
                type="submit"
                disabled={loading}
                className="btn-brutal w-full py-4 text-sm inline-flex items-center justify-center gap-2"
                style={{
                  backgroundColor: loading ? "#aac920" : "#C8F135",
                  color: "#0D0D0D",
                  borderColor: "#C8F135",
                  boxShadow: "4px 4px 0px #C8F135",
                  opacity: loading ? 0.8 : 1
                }}>
                
                  {loading ? "Verzenden..." : <><span>Verstuur aanvraag</span><ArrowRight size={16} /></>}
                </button>
              </form>
            }
          </Reveal>
        </div>
      </div>
    </section>);

};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => {
  const quickLinks = [
  { label: "Diensten", href: "#diensten" },
  { label: "Over ons", href: "#over-ons" },
  { label: "Klanten", href: "#klanten" },
  { label: "Vacatures", href: "#aanmelden" },
  { label: "Contact", href: "#contact" }];

  return (
    <footer style={{ backgroundColor: "#0D0D0D", borderTop: "3px solid var(--belpro-navy)" }}>

      {/* ── FOOTER SIGNUP SECTION ── */}
      <div style={{ backgroundColor: "var(--belpro-navy)", borderBottom: "3px solid #C8F135" }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left — headline with large watermark text behind */}
            <div className="relative overflow-hidden">
              <div
                className="absolute -left-4 top-0 heading-black select-none pointer-events-none"
                style={{ fontSize: "clamp(60px, 10vw, 100px)", color: "#F5F0E8", opacity: 0.04, lineHeight: 1, whiteSpace: "nowrap" }}>
                
                MELD JE AAN!
              </div>
              <Reveal>
                <h2 className="heading-black text-5xl md:text-6xl mb-6 relative z-10" style={{ color: "#F5F0E8" }}>
                  MELD <span className="highlight-green" style={{ color: "#0D0D0D" }}>JE</span><br />
                  AAN!
                </h2>
                <p className="text-base leading-relaxed mb-4 relative z-10" style={{ color: "#F5F0E8", opacity: 0.8 }}>
                  Zie jij jezelf al sleke knaken verdienen en ga jij je dromen verwezenlijken? En ben je benieuwd naar al die leuke extra's?
                </p>
                <p className="text-base font-bold relative z-10" style={{ color: "#C8F135" }}>
                  Meld je nu aan voor een kennismakingsgesprek!
                </p>
              </Reveal>
            </div>

            {/* Right — form (no header, just the form block) */}
            <Reveal delay={0.1}>
              <AgentSignupForm onDark />
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── FOOTER BOTTOM ── */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Col 1 — Brand */}
          <div>
            <img
              src={LOGO_URL}
              alt="Call2Day logo"
              style={{ height: 44, objectFit: "contain", filter: "brightness(0) invert(1)", marginBottom: 16 }} />
            
            <p className="text-sm leading-relaxed" style={{ color: "#F5F0E8", opacity: 0.55 }}>
              Jouw telemarketing partner in Nederland. Professioneel, snel, en altijd met een echte stem.
            </p>
          </div>

          {/* Col 2 — Links */}
          <div>
            <div className="label-upper text-xs mb-4" style={{ color: "#C8F135" }}>Navigatie</div>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) =>
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold transition-colors"
                style={{ color: "#F5F0E8", opacity: 0.7 }}
                onMouseEnter={(e) => {e.target.style.color = "#C8F135";e.target.style.opacity = "1";}}
                onMouseLeave={(e) => {e.target.style.color = "#F5F0E8";e.target.style.opacity = "0.7";}}>
                
                  {link.label}
                </a>
              )}
            </div>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <div className="label-upper text-xs mb-4" style={{ color: "#C8F135" }}>Contact</div>
            <div className="flex flex-col gap-2 text-sm" style={{ color: "#F5F0E8", opacity: 0.7 }}>
              <span>Keizersgracht 123</span>
              <span>1015 CJ Amsterdam</span>
              <span className="mt-2">+31 20 123 45 67</span>
              <span>info@call2day.be</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "2px solid rgba(245,240,232,0.08)" }}>
          
          <span className="text-xs" style={{ color: "#F5F0E8", opacity: 0.35 }}>
            © {new Date().getFullYear()} Call2Day B.V. · KVK 12345678 · Alle rechten voorbehouden.
          </span>
          <div className="flex gap-4 text-xs" style={{ color: "#F5F0E8", opacity: 0.35 }}>
            <a href="#" onMouseEnter={(e) => e.target.style.color = "#C8F135"} onMouseLeave={(e) => {e.target.style.color = "#F5F0E8";}}>Privacybeleid</a>
            <span>·</span>
            <a href="#" onMouseEnter={(e) => e.target.style.color = "#C8F135"} onMouseLeave={(e) => {e.target.style.color = "#F5F0E8";}}>Algemene voorwaarden</a>
          </div>
        </div>
      </div>
    </footer>);

};

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ backgroundColor: "#F5F0E8", fontFamily: "Inter, system-ui, sans-serif" }}>
      <Navbar />
      <Hero />
      <TickerBar />
      <Services />
      <About />
      <Clients />
      <Testimonials />
      {/* <Contact /> */}
      <Footer />
    </div>);

}