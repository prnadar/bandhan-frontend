"use client";

import { useState } from "react";
import { Users, Heart, Shield, CheckCircle, Eye, EyeOff, UserPlus, MessageCircle, Star, Lock } from "lucide-react";

const familyMembers = [
  { id: "f1", name: "Rajesh Sharma",    relation: "Father",       initials: "RS", grad: "linear-gradient(135deg,#1C0F06,#4A3728)", active: true,  lastSeen: "Just now"   },
  { id: "f2", name: "Sunita Sharma",    relation: "Mother",       initials: "SS", grad: "linear-gradient(135deg,#C4520F,#E06A1A)", active: true,  lastSeen: "2 min ago"  },
  { id: "f3", name: "Preethi Sharma",   relation: "Elder Sister", initials: "PS", grad: "linear-gradient(135deg,#5C7A52,#8DB870)", active: false, lastSeen: "1h ago"     },
];

const matches = [
  { id: "1", name: "Priya Sharma",    initials: "PS", grad: "linear-gradient(135deg,#C4520F,#E8A060)", age: 27, city: "Mumbai",     profession: "Software Engineer", company: "Google",    compatibility: 92, trustScore: 94, verified: true },
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
    <div className="px-8 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-5 h-5 text-gold" />
            <h1 className="font-display text-3xl font-light text-deep">Family Mode</h1>
          </div>
          <p className="font-body text-sm text-deep/45">Let your family participate in the search — with your permission</p>
        </div>
        <button
          onClick={() => setShowFamilyView(!showFamilyView)}
          className="flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm font-medium transition-all"
          style={{
            background: showFamilyView ? "linear-gradient(135deg,#C4520F,#E06A1A)" : "rgba(255,255,255,0.7)",
            color: showFamilyView ? "#fff" : "rgba(28,15,6,0.6)",
            border: showFamilyView ? "none" : "1px solid rgba(28,15,6,0.14)",
            minHeight: "auto",
          }}
        >
          {showFamilyView ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          {showFamilyView ? "Family view ON" : "Preview as family"}
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_300px] gap-6">
        {/* Left */}
        <div className="space-y-5">

          {/* Existing members */}
          <div className="rounded-2xl p-5" style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(154,107,0,0.14)" }}>
            <h3 className="font-display text-base font-semibold text-deep mb-4">Family Members</h3>
            <div className="space-y-3">
              {familyMembers.map((m) => (
                <div key={m.id} className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-semibold text-white flex-shrink-0"
                    style={{ background: m.grad }}
                  >
                    {m.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-semibold text-deep">{m.name}</p>
                    <p className="font-body text-xs text-deep/45">{m.relation} · {m.active ? "Active" : m.lastSeen}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${m.active ? "bg-sage" : "bg-deep/20"}`} />
                    <CheckCircle className="w-4 h-4 text-sage" />
                  </div>
                </div>
              ))}
            </div>

            {/* Invite form */}
            <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(154,107,0,0.1)" }}>
              <p className="font-body text-xs font-semibold text-deep/55 uppercase tracking-wider mb-3">Invite a Family Member</p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="family@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl font-body text-sm text-deep outline-none"
                  style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.18)" }}
                />
                <div className="grid grid-cols-3 gap-1.5">
                  {["Father", "Mother", "Sibling", "Uncle", "Aunt", "Other"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRelation(r)}
                      className="py-1.5 rounded-lg font-body text-xs font-medium transition-all"
                      style={{
                        background: relation === r ? "linear-gradient(135deg,#C4520F,#E06A1A)" : "rgba(255,255,255,0.5)",
                        color: relation === r ? "#fff" : "rgba(28,15,6,0.5)",
                        border: relation === r ? "none" : "1px solid rgba(154,107,0,0.14)",
                        minHeight: "auto",
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => { if (email) { setInvited(true); setEmail(""); } }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-body text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg,#C4520F,#E06A1A)", minHeight: "auto" }}
                >
                  <UserPlus className="w-4 h-4" />
                  {invited ? "Invitation sent!" : "Send Invitation"}
                </button>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="rounded-2xl p-5" style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(154,107,0,0.14)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-4 h-4 text-marigold" />
              <h3 className="font-display text-base font-semibold text-deep">Permissions</h3>
            </div>
            <p className="font-body text-xs text-deep/45 mb-4">Choose what family members can do on your behalf</p>
            <div className="space-y-2">
              {PERMISSIONS.map((p) => (
                <label key={p.key} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => togglePerm(p.key)}
                    className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center border transition-all cursor-pointer"
                    style={{
                      background: selectedPerms.has(p.key) ? "linear-gradient(135deg,#C4520F,#E06A1A)" : "rgba(255,255,255,0.7)",
                      border: selectedPerms.has(p.key) ? "none" : "1px solid rgba(154,107,0,0.2)",
                    }}
                  >
                    {selectedPerms.has(p.key) && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-deep/80">{p.label}</p>
                    <p className="font-body text-xs text-deep/40">{p.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Shared profiles */}
        <div className="space-y-5">
          <div className="rounded-2xl p-5" style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(154,107,0,0.14)" }}>
            <h3 className="font-display text-base font-semibold text-deep mb-1">Shared with Family</h3>
            <p className="font-body text-xs text-deep/40 mb-4">Profiles your family can see</p>
            <div className="space-y-3">
              {matches.map((m) => (
                <div
                  key={m.id}
                  className="rounded-xl p-3"
                  style={{
                    background: sharedWith.has(m.id) ? "rgba(92,122,82,0.07)" : "rgba(255,255,255,0.5)",
                    border: sharedWith.has(m.id) ? "1px solid rgba(92,122,82,0.2)" : "1px solid rgba(154,107,0,0.1)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-semibold text-white flex-shrink-0"
                      style={{ background: m.grad }}
                    >
                      {m.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="font-body text-sm font-semibold text-deep truncate">{m.name}</p>
                        {m.verified && <Shield className="w-3 h-3 text-sage flex-shrink-0" />}
                      </div>
                      <p className="font-body text-xs text-deep/45">{m.age} · {m.city}</p>
                    </div>
                    <button
                      onClick={() => toggleShare(m.id)}
                      className="p-1.5 rounded-lg transition-all"
                      style={{
                        background: sharedWith.has(m.id) ? "rgba(92,122,82,0.15)" : "rgba(28,15,6,0.05)",
                        minHeight: "auto", minWidth: "auto",
                      }}
                    >
                      {sharedWith.has(m.id)
                        ? <Eye className="w-3.5 h-3.5 text-sage" />
                        : <EyeOff className="w-3.5 h-3.5 text-deep/30" />}
                    </button>
                  </div>
                  {sharedWith.has(m.id) && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(28,15,6,0.07)" }}>
                        <div className="h-full rounded-full" style={{ width: `${m.trustScore}%`, background: "linear-gradient(90deg,#5C7A52,#8DB870)" }} />
                      </div>
                      <span className="font-body text-[10px] text-sage font-bold">Trust {m.trustScore}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Family activity feed */}
          <div className="rounded-2xl p-5" style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(154,107,0,0.14)" }}>
            <h3 className="font-display text-base font-semibold text-deep mb-4">Family Activity</h3>
            <div className="space-y-3">
              {[
                { member: "Mother", action: "Shortlisted Priya Sharma", time: "5 min ago",  icon: <Heart className="w-3.5 h-3.5 text-marigold" /> },
                { member: "Father", action: "Viewed Anjali Patel",       time: "1h ago",    icon: <Eye className="w-3.5 h-3.5 text-gold" /> },
                { member: "Sister", action: "Commented on Kavya Nair",   time: "3h ago",    icon: <MessageCircle className="w-3.5 h-3.5 text-sage" /> },
              ].map(({ member, action, time, icon }) => (
                <div key={action} className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(196,82,15,0.08)" }}>
                    {icon}
                  </div>
                  <div>
                    <p className="font-body text-xs text-deep/70"><strong>{member}</strong> {action}</p>
                    <p className="font-body text-[10px] text-deep/30">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
