"use client";

import { useState } from "react";

const countries = [
  { code: "\u{1F1FA}\u{1F1F8}", name: "USA",         count: "48,200", flag: "us" },
  { code: "\u{1F1EC}\u{1F1E7}", name: "UK",          count: "22,100", flag: "gb" },
  { code: "\u{1F1E8}\u{1F1E6}", name: "Canada",      count: "18,900", flag: "ca" },
  { code: "\u{1F1E6}\u{1F1FA}", name: "Australia",   count: "14,300", flag: "au" },
  { code: "\u{1F1F8}\u{1F1EC}", name: "Singapore",   count: "11,500", flag: "sg" },
  { code: "\u{1F1E6}\u{1F1EA}", name: "UAE",         count: "9,800",  flag: "ae" },
  { code: "\u{1F1E9}\u{1F1EA}", name: "Germany",     count: "6,200",  flag: "de" },
  { code: "\u{1F1F3}\u{1F1FF}", name: "New Zealand", count: "4,100",  flag: "nz" },
];

const profiles = [
  { id: "n1", name: "Divya Menon",     initials: "DM", grad: "linear-gradient(135deg,#dc1e3c,#a0153c)", age: 29, location: "San Francisco, USA", profession: "Product Manager", company: "Meta",    compatibility: 91, visitIndia: "Dec 2025", religion: "Hindu", verified: true,  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNCqU7m0dAuG3e1-BjjfomvJkdWuTP7aKEu2_kh4E5GjKGpid742YZR9fz6Q7Msp1pAZ0Kwtn74oP5SUcu-yGA1PV5PQRGxMdY846vNtY-oYaXJpQuaIdN_X-Jb50qlEPu9uNhcheflax1VP8Bp4Cb_nnS7WAZBlX1egOWVz8qsNxC9IAHKJ_lZ3ashqw1CNbGdL7-bPlILqcDPDXhXqthE5_y9kelBdOMt_1arEhCyCfKEhIPOh-H0rz4xfg23RY-xjuNfOWtSks", bio: "Software Architect at a leading tech firm, looking for someone who values tradition and ambition.", tags: ["Masters in CS", "Classical Dancer"] },
  { id: "n2", name: "Swati Kapoor",    initials: "SK", grad: "linear-gradient(135deg,#9A6B00,#C89020)", age: 27, location: "London, UK",          profession: "Doctor",          company: "NHS",     compatibility: 88, visitIndia: "Jan 2026", religion: "Hindu", verified: true,  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGnOc3RhgLe6OWMXfKSKh7lThnDQ-d8Du7Lz0vNJI9WPaY9yklFxV3fCDRpsZHjjmnPU17rVWw7D6XNRUZD1_OyCeok1mPya-8nB5zhBzxSMVguIt7DTtRwi-M-uAyfN8rwGREpX_4-v9XVwuL-e1ge4mzMh-F8u6Mu23ptmax4EymimsSj_q0ZCJIH__Vm9ZMSZ7dz6-Ha6wqw7YxZvLqnHw7E5X6OniK2_btmshYrZDWQa73AQwBDmBX8E5PdXSmp1e7CyEf2d4", bio: "Marketing Executive with a passion for travel and sustainable living. Family is my core.", tags: ["MBA - Oxford", "Vegan"] },
  { id: "n3", name: "Ananya Rao",      initials: "AR", grad: "linear-gradient(135deg,#5C7A52,#8DB870)", age: 30, location: "Toronto, Canada",      profession: "Data Scientist",  company: "Shopify", compatibility: 85, visitIndia: "Mar 2026", religion: "Hindu", verified: true,  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAldgXcvT4l61ysHLIwNio9tx2zpV0Y2y3Z5StfJuX71UkQzGdSmu4_v5CXu65TAcIGiR_fVBxN5xrVZ-BdNen5IEJKOMlqj-iEmULZfT02mFPndqftcYBqGbdnjavZaHzggoHIUuunVCZ6eLKIPWdjGRq4GlO20oRWpkcZ1E1AtiAqXpFdXdcf9JSA9dZ98Y8KPMxDolRyS98Cpam7CYp1BPYu-PSurUe2G2Ke-9zQ11t2GapxFYz2P5F1vg9paAAs-LIEQwxlhcc", bio: "Practicing Physician, balancing a busy career with a love for Indian literature and music.", tags: ["MD", "Polyglot"] },
  { id: "n4", name: "Pooja Nambiar",   initials: "PN", grad: "linear-gradient(135deg,#7C3AED,#A78BFA)", age: 28, location: "Sydney, Australia",    profession: "Engineer",        company: "Atlassian", compatibility: 82, visitIndia: "Feb 2026", religion: "Christian", verified: false, img: "", bio: "Mechanical engineer with a love for outdoor adventures and creative cooking.", tags: ["B.Tech - IIT", "Yoga"] },
  { id: "n5", name: "Kritika Arora",   initials: "KA", grad: "linear-gradient(135deg,#0F766E,#0D9488)", age: 26, location: "Singapore",            profession: "Finance",         company: "DBS",     compatibility: 79, visitIndia: "Nov 2025", religion: "Sikh", verified: true,  img: "", bio: "Investment analyst who loves numbers by day and Indian classical music by night.", tags: ["CFA", "Harmonium"] },
  { id: "n6", name: "Nisha Pillai",    initials: "NP", grad: "linear-gradient(135deg,#BE185D,#F472B6)", age: 31, location: "Dubai, UAE",           profession: "Architect",       company: "AECOM",   compatibility: 76, visitIndia: "Dec 2025", religion: "Hindu", verified: true,  img: "", bio: "Urban designer who believes great spaces bring people together, just like great relationships.", tags: ["M.Arch", "Painter"] },
];

const features = [
  { icon: "schedule",        title: "Timezone-aware Messaging",  desc: "Schedule messages and video calls with ease, knowing your match's local time automatically." },
  { icon: "shield_person",   title: "Local Guardian Support",    desc: "Our team can facilitate in-person meetings with family representatives back in India." },
  { icon: "airplane_ticket", title: "Travel Concierge",          desc: "Preferential rates for travel and logistics when you plan a visit to meet your matches." },
  { icon: "translate",       title: "Cross-Cultural Coaching",   desc: "Expert advice on navigating lifestyle differences between India and your country of residence." },
];

export default function NriHubPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const filtered = selectedCountry
    ? profiles.filter((p) => p.location.includes(selectedCountry))
    : profiles;

  /* Show up to 3 featured cards with images; fall back to initials for the rest */
  const featuredProfiles = filtered.slice(0, 3);

  return (
    <div className="bg-surface min-h-screen text-on-surface font-body">

      {/* ── Hero Section ── */}
      <section className="relative px-6 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left editorial text */}
          <div className="z-10 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-surface-container-highest text-primary font-bold text-xs uppercase tracking-widest mb-6">
              Global gateway
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tight text-on-surface">
              Bridging Continents, <br />
              <span className="text-primary italic">Uniting Souls.</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10 font-medium">
              The exclusive global gateway for NRI professionals seeking meaningful connections rooted in heritage and shared values.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
              <button className="px-10 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-bold text-lg hover:scale-105 transition-all">
                Register Now
              </button>
              <button className="px-10 py-4 bg-white border-2 border-primary/20 text-primary rounded-full font-bold text-lg hover:bg-surface-container-low transition-all">
                Browse Profiles
              </button>
            </div>
          </div>

          {/* Right hero image + floating stat */}
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden bg-surface-container-low group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOHt_cV5bLcFGRWzyb2Y6tFDjUTZi4wuUmg2EngHxDQ80LY0DqUCojLX8KzNBdGLmbpgXijgTmYid9sJ1xl5y6xiggfPzpz5L6wGqsMHy0D7XyP5KoeUxrK5qqm4cNr67uNjrUAXtVRdHmHa_5PuBQd8UE1Rr4DlQZmBkroKxV16pJC1oSrnQCdldNai46V97LRihEe8Nhit5urHs-0cEXQvdERVOZjke3OT76-4KZmtVNx7BT8hzKmp-f2kzrga95BD6eg66AVro"
                alt="Stylised world map connecting major global Indian diaspora cities"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl max-w-[220px]">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-4xl font-headline font-black text-primary">50k+</span>
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant opacity-70">
                Verified NRI Profiles worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust / Verification Section ── */}
      <section className="bg-surface-container-low/50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[3rem] p-10 md:p-16 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-shrink-0">
              <div className="w-40 h-40 rounded-full bg-primary/5 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-7xl text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified_user
                </span>
              </div>
            </div>
            <div className="flex-grow">
              <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6 text-on-surface">
                The Gold Standard of Trust
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8 max-w-3xl">
                Our NRI-Verified status is more than a badge. It represents a rigorous 3-step authentication process including passport verification, employment history, and local address validation to ensure complete peace of mind for you and your family.
              </p>
              <div className="grid sm:grid-cols-3 gap-6">
                {["Passport Verified", "LinkedIn Authenticated", "Residence Proofed"].map(
                  (label) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 bg-surface rounded-2xl p-4"
                    >
                      <span className="material-symbols-outlined text-primary font-bold">
                        check_circle
                      </span>
                      <span className="font-bold text-sm">{label}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Browse by Hub (Country Filter) ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-headline text-4xl font-bold mb-4">Browse by Hub</h2>
            <p className="text-on-surface-variant font-medium">
              Discover matches in regions with the strongest Indian diaspora.
            </p>
          </div>
          <a
            className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all"
            href="#"
          >
            View all regions{" "}
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </a>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* All Countries pill */}
          <button
            onClick={() => setSelectedCountry(null)}
            className={`px-8 py-3.5 rounded-full font-bold flex items-center gap-2 text-sm tracking-wide transition-colors ${
              !selectedCountry
                ? "bg-primary text-white"
                : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-sm">public</span> All Countries
          </button>

          {countries.map((c) => (
            <button
              key={c.name}
              onClick={() =>
                setSelectedCountry(selectedCountry === c.name ? null : c.name)
              }
              className={`px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-colors ${
                selectedCountry === c.name
                  ? "bg-primary text-white"
                  : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
              }`}
            >
              {c.code} {c.name}
            </button>
          ))}
        </div>
      </section>

      {/* ── Featured NRI Profile Cards ── */}
      <section className="pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {featuredProfiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-[2rem] overflow-hidden group hover:-translate-y-2 transition-all"
            >
              {/* Image area */}
              <div className="relative h-[420px]">
                {profile.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={profile.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={profile.img}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: profile.grad }}
                  >
                    <span className="text-7xl font-headline font-light text-white/80">
                      {profile.initials}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Match badge */}
                <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-primary text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    favorite
                  </span>
                  <span className="font-black text-sm text-on-surface">
                    {profile.compatibility}% Match
                  </span>
                </div>

                {/* Visit India badge */}
                {profile.visitIndia && (
                  <div className="absolute bottom-5 left-5">
                    <span className="px-4 py-1.5 bg-secondary text-white text-[10px] font-black rounded-full uppercase tracking-[0.1em]">
                      Visiting India: {profile.visitIndia}
                    </span>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-headline text-2xl font-bold text-on-surface">
                      {profile.name}, {profile.age}
                    </h4>
                    <p className="text-on-surface-variant font-semibold text-sm flex items-center gap-1 mt-1 opacity-70">
                      <span className="material-symbols-outlined text-base">
                        location_on
                      </span>{" "}
                      {profile.location}
                    </p>
                  </div>
                  {profile.verified && (
                    <span
                      className="material-symbols-outlined text-primary text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  )}
                </div>
                <p className="text-on-surface-variant mb-8 line-clamp-2 italic font-medium">
                  &ldquo;{profile.bio}&rdquo;
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {profile.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 bg-surface-container-low text-[11px] font-bold rounded-full text-on-surface-variant"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="w-full py-4 rounded-2xl border-2 border-primary text-primary font-black text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6 text-on-surface">
            Your Global Journey, <span className="text-primary italic">Supported.</span>
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg font-medium">
            Beyond finding a partner, we assist in the complexities of cross-border transitions with vetted expert services.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-surface-container-low/30 p-10 rounded-[2.5rem] hover:bg-white transition-all group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-4xl">
                  {f.icon}
                </span>
              </div>
              <h5 className="font-bold text-xl mb-4 text-on-surface">{f.title}</h5>
              <p className="text-on-surface-variant text-sm leading-relaxed font-medium">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-primary rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-container to-transparent opacity-60" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-headline text-4xl md:text-5xl font-black mb-8 leading-tight">
              Ready to find your partner <br />across borders?
            </h2>
            <p className="text-xl opacity-90 mb-12 font-medium">
              Join the most trusted community for NRI professionals today and start your journey toward a lifetime of shared heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button className="px-12 py-5 bg-white text-primary rounded-full font-black text-lg hover:scale-105 transition-all">
                Get Started for Free
              </button>
              <button className="px-12 py-5 bg-white/10 border border-white/30 text-white rounded-full font-black text-lg hover:bg-white/20 transition-all">
                Browse NRI Profiles
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
