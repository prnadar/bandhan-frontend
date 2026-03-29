"use client";

import { useState } from "react";

const familyMembers = [
  { id: "f1", name: "Rajesh Sharma",    relation: "Father",       initials: "RS", grad: "linear-gradient(135deg,#1a0a14,#4A3728)", active: true,  lastSeen: "Just now"   },
  { id: "f2", name: "Sunita Sharma",    relation: "Mother",       initials: "SS", grad: "linear-gradient(135deg,#dc1e3c,#a0153c)", active: true,  lastSeen: "2 min ago"  },
  { id: "f3", name: "Preethi Sharma",   relation: "Elder Sister", initials: "PS", grad: "linear-gradient(135deg,#5C7A52,#8DB870)", active: false, lastSeen: "1h ago"     },
];

const matches = [
  { id: "1", name: "Priya Sharma",    initials: "PS", grad: "linear-gradient(135deg,#dc1e3c,#a0153c)", age: 27, city: "Mumbai",     profession: "Software Engineer", company: "Google",    compatibility: 92, trustScore: 94, verified: true },
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

const RELATIONS = ["Father", "Mother", "Sibling", "Uncle", "Aunt", "Other"];

const activityFeed = [
  {
    member: "Sunita Sharma",
    action: "shortlisted",
    target: "Priya Sharma",
    time: "2 HOURS AGO",
    icon: "favorite",
    iconFill: true,
    iconBg: "bg-primary",
    iconColor: "text-white",
  },
  {
    member: "Rajesh Sharma",
    action: "viewed",
    target: "Anjali Patel",
    time: "YESTERDAY",
    icon: "visibility",
    iconFill: false,
    iconBg: "bg-white",
    iconColor: "text-on-surface",
    border: true,
  },
  {
    member: "You",
    action: "added",
    target: "Preethi Sharma",
    time: "3 DAYS AGO",
    icon: "person_add",
    iconFill: false,
    iconBg: "bg-white",
    iconColor: "text-on-surface",
    border: true,
  },
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

  const activeCount = familyMembers.filter((m) => m.active).length;

  return (
    <div className="min-h-screen bg-surface">
      {/* Main two-column layout */}
      <div className="lg:flex gap-12 px-6 md:px-12 py-8 max-w-7xl mx-auto">
        {/* Center Column: Core UI */}
        <div className="flex-1 max-w-3xl space-y-12">
          {/* Hero Header */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-headline text-5xl md:text-6xl text-on-surface">
                Family Mode
              </h1>
              <button
                onClick={() => setShowFamilyView(!showFamilyView)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  showFamilyView
                    ? "bg-gradient-to-r from-primary to-primary-container text-on-primary"
                    : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showFamilyView ? "visibility" : "visibility_off"}
                </span>
                {showFamilyView ? "Family view ON" : "Preview as family"}
              </button>
            </div>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
              Involve your loved ones in the journey. Collaborative matchmaking
              built on trust and editorial elegance.
            </p>
          </section>

          {/* Family Members List */}
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <h2 className="font-headline text-2xl text-on-surface">
                Family Members
              </h2>
              <span className="text-xs uppercase tracking-widest text-primary font-bold">
                {activeCount} Active
              </span>
            </div>
            <div className="grid gap-4">
              {familyMembers.map((m) => (
                <div
                  key={m.id}
                  className="group bg-surface-container-lowest p-6 rounded-2xl flex items-center justify-between transition-all hover:bg-white"
                >
                  <div className="flex items-center gap-5">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-base font-semibold text-white flex-shrink-0"
                      style={{ background: m.grad }}
                    >
                      {m.initials}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-on-surface">
                        {m.name}
                      </h3>
                      <p className="text-sm text-on-surface-variant">
                        {m.relation} &bull;{" "}
                        {m.active ? "Active" : m.lastSeen}
                      </p>
                    </div>
                  </div>
                  {m.active ? (
                    <span className="px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-full">
                      ACTIVE
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-surface-container text-on-surface-variant text-xs font-bold rounded-full">
                      PENDING
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Invite Form Section */}
          <section className="bg-surface-container-low p-8 md:p-10 rounded-[2rem] space-y-8">
            <div>
              <h2 className="font-headline text-2xl mb-2 text-on-surface">
                Invite a Family Member
              </h2>
              <p className="text-sm text-on-surface-variant">
                They will receive a secure link to join your private circle.
              </p>
            </div>

            <form
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                if (email) {
                  setInvited(true);
                  setEmail("");
                }
              }}
            >
              {/* Email + Role */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@family.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (invited) setInvited(false);
                    }}
                    className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-high transition-all outline-none text-on-surface placeholder:text-on-surface-variant/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1">
                    Role
                  </label>
                  <div className="relative">
                    <select
                      value={relation}
                      onChange={(e) => setRelation(e.target.value)}
                      className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-high transition-all outline-none appearance-none text-on-surface"
                    >
                      {RELATIONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1">
                  Set Permissions
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PERMISSIONS.map((p) => (
                    <label
                      key={p.key}
                      className="flex items-center gap-3 p-4 bg-surface-container-lowest rounded-xl cursor-pointer hover:bg-white transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPerms.has(p.key)}
                        onChange={() => togglePerm(p.key)}
                        className="w-5 h-5 rounded text-primary border-none focus:ring-offset-0 focus:ring-primary bg-surface-container-low"
                      />
                      <div>
                        <span className="text-sm font-medium text-on-surface">
                          {p.label}
                        </span>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                          {p.desc}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-xl hover:scale-[0.98] transition-transform flex justify-center items-center gap-2"
              >
                <span>{invited ? "Invitation sent!" : "Send Invitation"}</span>
                <span className="material-symbols-outlined text-sm">
                  {invited ? "check_circle" : "send"}
                </span>
              </button>
            </form>
          </section>
        </div>

        {/* Right Column: Activity & Sharing */}
        <aside className="w-full lg:w-80 mt-12 lg:mt-0 space-y-12 flex-shrink-0">
          {/* Shared Profiles */}
          <section className="space-y-6">
            <h2 className="font-headline text-xl text-on-surface">
              Shared Profiles
            </h2>
            <div className="space-y-4">
              {matches.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                    sharedWith.has(m.id)
                      ? "bg-surface-container-lowest"
                      : "bg-surface-container-low/50"
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-semibold text-white flex-shrink-0"
                    style={{ background: m.grad }}
                  >
                    {m.initials}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center gap-1">
                      <h4 className="text-sm font-bold truncate text-on-surface">
                        {m.name}
                      </h4>
                      {m.verified && (
                        <span className="material-symbols-outlined text-[14px] text-primary flex-shrink-0">
                          verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant">
                      {m.age} &bull; {m.city}
                    </p>
                    {sharedWith.has(m.id) && (
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="flex-1 h-1 rounded-full overflow-hidden bg-outline-variant/20">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-container"
                            style={{ width: `${m.trustScore}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-primary">
                          Trust {m.trustScore}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => toggleShare(m.id)}
                    className="flex-shrink-0"
                    aria-label={
                      sharedWith.has(m.id)
                        ? `Unshare ${m.name}`
                        : `Share ${m.name}`
                    }
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        sharedWith.has(m.id)
                          ? "text-primary"
                          : "text-outline-variant"
                      }`}
                      style={
                        sharedWith.has(m.id)
                          ? { fontVariationSettings: "'FILL' 1" }
                          : undefined
                      }
                    >
                      {sharedWith.has(m.id) ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Family Activity Timeline */}
          <section className="bg-surface-container-highest/20 p-6 rounded-3xl">
            <h2 className="font-headline text-xl mb-6 text-on-surface">
              Family Activity
            </h2>
            <div className="relative space-y-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-outline-variant/30">
              {activityFeed.map((item) => (
                <div key={item.time + item.member} className="relative pl-8">
                  <div
                    className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center ${item.iconBg} ${
                      item.border
                        ? "border border-outline-variant/50"
                        : ""
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[14px] ${item.iconColor}`}
                      style={
                        item.iconFill
                          ? { fontVariationSettings: "'FILL' 1" }
                          : undefined
                      }
                    >
                      {item.icon}
                    </span>
                  </div>
                  <p className="text-sm leading-snug text-on-surface">
                    <span className="font-bold">{item.member}</span>{" "}
                    {item.action}{" "}
                    <span className="text-primary font-medium">
                      {item.target}
                    </span>
                    {item.action === "added" ? " to the circle." : "'s profile."}
                  </p>
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-tighter mt-1 block">
                    {item.time}
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
