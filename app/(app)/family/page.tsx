"use client";

import { useState } from "react";
import { Users, Heart, Shield, CheckCircle, Eye, EyeOff, UserPlus, MessageCircle, Star, Lock, Send } from "lucide-react";

const familyMembers = [
  { id: "f1", name: "Rajesh Sharma",    relation: "Father",       initials: "RS", grad: "linear-gradient(135deg,#281621,#4A3728)", active: true,  lastSeen: "Just now"   },
  { id: "f2", name: "Sunita Sharma",    relation: "Mother",       initials: "SS", grad: "linear-gradient(135deg,#b4002a,#dc1e3c)", active: true,  lastSeen: "2 min ago"  },
  { id: "f3", name: "Preethi Sharma",   relation: "Elder Sister", initials: "PS", grad: "linear-gradient(135deg,#5C7A52,#8DB870)", active: false, lastSeen: "1h ago"     },
];

const matches = [
  { id: "1", name: "Priya Sharma",    initials: "PS", grad: "linear-gradient(135deg,#b4002a,#dc1e3c)", age: 27, city: "Mumbai",     profession: "Software Engineer", company: "Google",    compatibility: 92, trustScore: 94, verified: true },
  { id: "2", name: "Anjali Patel",    initials: "AP", grad: "linear-gradient(135deg,#9A6B00,#C89020)", age: 26, city: "Ahmedabad",  profession: "Doctor",            company: "Apollo",    compatibility: 87, trustScore: 88, verified: true },
  { id: "3", name: "Kavya Nair",      initials: "KN", grad: "linear-gradient(135deg,#5C7A52,#8DB870)", age: 28, city: "Bangalore",  profession: "Data Scientist",    company: "Flipkart",  compatibility: 84, trustScore: 91, verified: true },
];

type Permission = "view" | "shortlist" | "message" | "all";

const PERMISSIONS: { key: Permission; label: string; desc: string }[] = [
  { key: "view",      label: "View profiles",     desc: "Can browse and view match profiles"    },
  { key: "shortlist", label: "Shortlist",         desc: "Can save and shortlist profiles"       },
  { key: "message",   label: "Send interest",     desc: "Can send interests on your behalf"     },
  { key: "all",       label: "Full access",       desc: "Complete control of your profile"      },
];

export default function FamilyPage() {
  const [invited, setInvited] = useState(false);
  const [email, setEmail] = useState("");
  const [relation, setRelation] = useState("Father");
  const [selectedPerms, setSelectedPerms] = useState<Set<Permission>>(new Set<Permission>(["view"]));
  const [sharedWith, setSharedWith] = useState<Set<string>>(new Set(["1"]));
  const [showFamilyView, setShowFamilyView] = useState(false);

  const togglePerm = (p: Permission) =>
    setSelectedPerms((prev) => {
      const next = new Set(prev);
      next.has(p) ? next.delete(p) : next.add(p);
      return next;
    });

  const toggleShare = (id: string) =>
    setSharedWith((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="px-6 md:px-12 py-8 max-w-5xl mx-auto" style={{ background: "#fff8f8", minHeight: "100vh" }}>

      {/* Hero Header */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1
              className="text-4xl md:text-5xl font-normal mb-3"
              style={{ fontFamily: "'Noto Serif', serif", color: "#281621" }}
            >
              Family Mode
            </h1>
            <p
              className="text-base max-w-xl leading-relaxed"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#5c3f3f" }}
            >
              Involve your loved ones in the journey. Collaborative matchmaking built on trust and editorial elegance.
            </p>
          </div>
          <button
            onClick={() => setShowFamilyView(!showFamilyView)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
            style={{
              background: showFamilyView ? "linear-gradient(135deg, #b4002a, #dc1e3c)" : "#fff0f5",
              color: showFamilyView ? "#fff" : "#b4002a",
              minHeight: "auto",
            }}
          >
            {showFamilyView ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {showFamilyView ? "Family view ON" : "Preview as family"}
          </button>
        </div>
      </section>

      <div className="lg:flex gap-12">
        {/* Left — Core UI */}
        <div className="flex-1 max-w-3xl space-y-12">

          {/* Family Members */}
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <h2
                className="text-2xl"
                style={{ fontFamily: "'Noto Serif', serif", color: "#281621" }}
              >
                Family Members
              </h2>
              <span
                className="text-xs uppercase tracking-widest font-bold"
                style={{ color: "#b4002a" }}
              >
                {familyMembers.filter((m) => m.active).length} Active
              </span>
            </div>
            <div className="space-y-4">
              {familyMembers.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between p-5 rounded-2xl transition-all"
                  style={{ background: "#ffffff" }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(180,0,42,0.06)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div className="flex items-center gap-5">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-base font-semibold text-white flex-shrink-0"
                      style={{ background: m.grad, fontFamily: "'Noto Serif', serif" }}
                    >
                      {m.initials}
                    </div>
                    <div>
                      <h3
                        className="text-lg font-semibold"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#281621" }}
                      >
                        {m.name}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: "#5c3f3f" }}
                      >
                        {m.relation} {m.active ? "" : `\u00b7 ${m.lastSeen}`}
                      </p>
                    </div>
                  </div>
                  <span
                    className="px-3 py-1 text-xs font-bold rounded-full"
                    style={{
                      background: m.active ? "rgba(180,0,42,0.06)" : "#ffe8f2",
                      color: m.active ? "#b4002a" : "#5c3f3f",
                    }}
                  >
                    {m.active ? "ACTIVE" : "PENDING"}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Invite Form Section */}
          <section
            className="p-8 md:p-10 space-y-8"
            style={{ background: "#fff0f5", borderRadius: "2rem" }}
          >
            <div>
              <h2
                className="text-2xl mb-2"
                style={{ fontFamily: "'Noto Serif', serif", color: "#281621" }}
              >
                Invite a Family Member
              </h2>
              <p
                className="text-sm"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#5c3f3f" }}
              >
                They will receive a secure link to join your private circle.
              </p>
            </div>

            <div className="space-y-8">
              {/* Email + Role */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    className="text-xs font-bold uppercase tracking-wider ml-1"
                    style={{ color: "#5c3f3f" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@family.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{
                      background: "#ffffff",
                      color: "#281621",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-xs font-bold uppercase tracking-wider ml-1"
                    style={{ color: "#5c3f3f" }}
                  >
                    Role
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Father", "Mother", "Sibling", "Uncle", "Aunt", "Other"].map((r) => (
                      <button
                        key={r}
                        onClick={() => setRelation(r)}
                        className="py-2.5 rounded-xl text-xs font-semibold transition-all"
                        style={{
                          background: relation === r ? "linear-gradient(135deg, #b4002a, #dc1e3c)" : "#ffffff",
                          color: relation === r ? "#fff" : "#5c3f3f",
                          minHeight: "auto",
                        }}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div className="space-y-4">
                <label
                  className="text-xs font-bold uppercase tracking-wider ml-1"
                  style={{ color: "#5c3f3f" }}
                >
                  Set Permissions
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PERMISSIONS.map((p) => (
                    <label
                      key={p.key}
                      className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all"
                      style={{ background: selectedPerms.has(p.key) ? "#ffe8f2" : "#ffffff" }}
                      onClick={() => togglePerm(p.key)}
                    >
                      <div
                        className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center transition-all"
                        style={{
                          background: selectedPerms.has(p.key) ? "linear-gradient(135deg, #b4002a, #dc1e3c)" : "#fff0f5",
                        }}
                      >
                        {selectedPerms.has(p.key) && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#281621", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {p.label}
                        </p>
                        <p className="text-xs" style={{ color: "#5c3f3f" }}>{p.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Send Button */}
              <button
                onClick={() => { if (email) { setInvited(true); setEmail(""); } }}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-sm font-bold text-white transition-transform hover:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #b4002a, #dc1e3c)",
                  boxShadow: "0 4px 16px rgba(180,0,42,0.15)",
                  minHeight: "auto",
                }}
              >
                <span>{invited ? "Invitation sent!" : "Send Invitation"}</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </section>
        </div>

        {/* Right Column — Shared Profiles & Activity */}
        <aside className="w-full lg:w-80 mt-12 lg:mt-0 space-y-12">

          {/* Shared with Family */}
          <section className="space-y-6">
            <h2
              className="text-xl"
              style={{ fontFamily: "'Noto Serif', serif", color: "#281621" }}
            >
              Shared Profiles
            </h2>
            <div className="space-y-4">
              {matches.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-4 p-3 rounded-xl transition-all"
                  style={{
                    background: sharedWith.has(m.id) ? "#ffffff" : "#ffffff",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-semibold text-white flex-shrink-0"
                    style={{ background: m.grad, fontFamily: "'Noto Serif', serif" }}
                  >
                    {m.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h4
                        className="text-sm font-bold truncate"
                        style={{ color: "#281621" }}
                      >
                        {m.name}
                      </h4>
                      {m.verified && <Shield className="w-3 h-3 flex-shrink-0" style={{ color: "#5C7A52" }} />}
                    </div>
                    <p className="text-xs" style={{ color: "#5c3f3f" }}>
                      {m.age} · {m.city} · {m.profession}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleShare(m.id)}
                    className="p-2 rounded-lg transition-all flex-shrink-0"
                    style={{
                      background: sharedWith.has(m.id) ? "rgba(180,0,42,0.08)" : "#fff0f5",
                      minHeight: "auto", minWidth: "auto",
                    }}
                  >
                    {sharedWith.has(m.id)
                      ? <Eye className="w-4 h-4" style={{ color: "#b4002a" }} />
                      : <EyeOff className="w-4 h-4" style={{ color: "#5c3f3f" }} />}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Family Activity */}
          <section
            className="p-6 rounded-3xl"
            style={{ background: "rgba(249,218,233,0.2)" }}
          >
            <h2
              className="text-xl mb-6"
              style={{ fontFamily: "'Noto Serif', serif", color: "#281621" }}
            >
              Family Activity
            </h2>
            <div className="relative space-y-8">
              {/* Timeline line */}
              <div
                className="absolute left-3 top-2 bottom-2 w-px"
                style={{ background: "rgba(229,189,188,0.3)" }}
              />
              {[
                {
                  member: "Mother",
                  action: "Shortlisted",
                  target: "Priya Sharma",
                  time: "5 MIN AGO",
                  icon: <Heart className="w-3.5 h-3.5" style={{ color: "#b4002a" }} />,
                  iconBg: "linear-gradient(135deg, #b4002a, #dc1e3c)",
                  iconColor: "white",
                  filled: true,
                },
                {
                  member: "Father",
                  action: "Viewed",
                  target: "Anjali Patel",
                  time: "1 HOUR AGO",
                  icon: <Eye className="w-3.5 h-3.5" style={{ color: "#5c3f3f" }} />,
                  iconBg: "#ffffff",
                  iconColor: "#5c3f3f",
                  filled: false,
                },
                {
                  member: "Sister",
                  action: "Commented on",
                  target: "Kavya Nair",
                  time: "3 HOURS AGO",
                  icon: <MessageCircle className="w-3.5 h-3.5" style={{ color: "#5c3f3f" }} />,
                  iconBg: "#ffffff",
                  iconColor: "#5c3f3f",
                  filled: false,
                },
              ].map(({ member, action, target, time, icon, iconBg, filled }) => (
                <div key={`${member}-${action}`} className="relative pl-10">
                  <div
                    className="absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background: filled ? iconBg : "#ffffff",
                      boxShadow: filled ? "none" : "inset 0 0 0 1px rgba(229,189,188,0.5)",
                    }}
                  >
                    {filled
                      ? <Heart className="w-3 h-3 text-white" />
                      : icon}
                  </div>
                  <p
                    className="text-sm leading-snug"
                    style={{ color: "#281621", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    <strong>{member}</strong> {action}{" "}
                    <span style={{ color: "#b4002a", fontWeight: 500 }}>{target}</span>
                    {action === "Viewed" ? "'s profile." : "."}
                  </p>
                  <span
                    className="text-[10px] uppercase tracking-wider mt-1 block"
                    style={{ color: "#5c3f3f" }}
                  >
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
