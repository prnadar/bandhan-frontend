"use client";

import { useState } from "react";
import { Bell, Shield, Eye, Globe, Smartphone, CreditCard, LogOut, ChevronRight, Trash2, Download, Lock, CheckCircle } from "lucide-react";

type Section = "notifications" | "privacy" | "account" | "preferences" | "data";

const NAV: { key: Section; icon: React.ReactNode; label: string }[] = [
  { key: "notifications", icon: <Bell className="w-4 h-4" />,      label: "Notifications"   },
  { key: "privacy",       icon: <Eye className="w-4 h-4" />,        label: "Privacy & Safety"},
  { key: "preferences",   icon: <Globe className="w-4 h-4" />,      label: "Preferences"     },
  { key: "account",       icon: <Shield className="w-4 h-4" />,     label: "Account & Security"},
  { key: "data",          icon: <Download className="w-4 h-4" />,   label: "Data & Privacy"  },
];

function Toggle2({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative w-10 h-5.5 rounded-full transition-all flex-shrink-0"
      style={{
        background: on ? "linear-gradient(135deg,#E8426A,#FF8FA3)" : "rgba(28,15,6,0.12)",
        height: "22px",
        width: "40px",
        minHeight: "auto",
        minWidth: "auto",
      }}
    >
      <div
        className="absolute top-0.5 rounded-full bg-white transition-all"
        style={{ width: "18px", height: "18px", left: on ? "20px" : "2px", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }}
      />
    </button>
  );
}

function Row({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5" style={{ borderBottom: "1px solid rgba(154,107,0,0.07)" }}>
      <div>
        <p className="font-body text-sm font-medium text-deep/80">{label}</p>
        {desc && <p className="font-body text-xs text-deep/40 mt-0.5">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl px-5 py-1" style={{ background: "rgba(250,246,238,0.9)", border: "1px solid rgba(154,107,0,0.12)" }}>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [section, setSection] = useState<Section>("notifications");

  // Notification toggles
  const [notifs, setNotifs] = useState({
    newInterest: true,
    messages: true,
    newMatches: true,
    profileViews: false,
    promotions: false,
    emailDigest: true,
    smsAlerts: false,
    pushNotifications: true,
  });

  // Privacy
  const [privacy, setPrivacy] = useState({
    showOnline: true,
    showLastSeen: true,
    profileBlur: false,
    hideFromExes: false,
    aadhaarVisible: false,
    phoneVisible: false,
  });

  // Preferences
  const [prefs, setPrefs] = useState({
    darkMode: false,
    language: "English",
    ageFrom: "24",
    ageTo: "32",
    religionFilter: "Hindu",
  });

  const toggleNotif  = (key: keyof typeof notifs)  => setNotifs((p)  => ({ ...p, [key]: !p[key] }));
  const togglePrivacy = (key: keyof typeof privacy) => setPrivacy((p) => ({ ...p, [key]: !p[key] }));
  const togglePrefs  = (key: keyof typeof prefs)   => setPrefs((p)   => ({ ...p, [key]: !p[key] }));

  return (
    <div className="px-8 py-8 max-w-4xl">
      <h1 className="font-display text-3xl font-light text-deep mb-6">Settings</h1>

      <div className="grid md:grid-cols-[200px_1fr] gap-6">
        {/* Nav */}
        <div className="space-y-1">
          {NAV.map((n) => (
            <button
              key={n.key}
              onClick={() => setSection(n.key)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-body text-sm font-medium text-left transition-all"
              style={{
                background: section === n.key ? "rgba(196,82,15,0.08)" : "transparent",
                color: section === n.key ? "#E8426A" : "rgba(28,15,6,0.55)",
                minHeight: "auto",
              }}
            >
              <span style={{ color: section === n.key ? "#E8426A" : "rgba(28,15,6,0.35)" }}>{n.icon}</span>
              {n.label}
            </button>
          ))}

          <div className="pt-4 mt-4" style={{ borderTop: "1px solid rgba(154,107,0,0.1)" }}>
            <button
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-body text-sm font-medium text-left transition-all text-red-400 hover:bg-red-50"
              style={{ minHeight: "auto" }}
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">

          {/* Notifications */}
          {section === "notifications" && (
            <>
              <Card>
                <Row label="New Interests" desc="When someone sends you an interest">
                  <Toggle2 on={notifs.newInterest} onToggle={() => toggleNotif("newInterest")} />
                </Row>
                <Row label="Messages" desc="New chat messages">
                  <Toggle2 on={notifs.messages} onToggle={() => toggleNotif("messages")} />
                </Row>
                <Row label="New Matches" desc="Daily match recommendations">
                  <Toggle2 on={notifs.newMatches} onToggle={() => toggleNotif("newMatches")} />
                </Row>
                <Row label="Profile Views" desc="When someone views your profile">
                  <Toggle2 on={notifs.profileViews} onToggle={() => toggleNotif("profileViews")} />
                </Row>
                <Row label="Promotions" desc="Offers, discounts, and upgrades">
                  <Toggle2 on={notifs.promotions} onToggle={() => toggleNotif("promotions")} />
                </Row>
              </Card>

              <Card>
                <Row label="Email Digest" desc="Weekly summary of your activity">
                  <Toggle2 on={notifs.emailDigest} onToggle={() => toggleNotif("emailDigest")} />
                </Row>
                <Row label="SMS Alerts" desc="Critical alerts via SMS">
                  <Toggle2 on={notifs.smsAlerts} onToggle={() => toggleNotif("smsAlerts")} />
                </Row>
                <Row label="Push Notifications" desc="Browser and app notifications">
                  <Toggle2 on={notifs.pushNotifications} onToggle={() => toggleNotif("pushNotifications")} />
                </Row>
              </Card>
            </>
          )}

          {/* Privacy */}
          {section === "privacy" && (
            <>
              <Card>
                <Row label="Show Online Status" desc="Let matches see when you're active">
                  <Toggle2 on={privacy.showOnline} onToggle={() => togglePrivacy("showOnline")} />
                </Row>
                <Row label="Show Last Seen" desc="Display last active time">
                  <Toggle2 on={privacy.showLastSeen} onToggle={() => togglePrivacy("showLastSeen")} />
                </Row>
                <Row label="Profile Blur" desc="Blur photos until interest is accepted (Platinum)">
                  <Toggle2 on={privacy.profileBlur} onToggle={() => togglePrivacy("profileBlur")} />
                </Row>
              </Card>

              <Card>
                <Row label="Aadhaar Number Visible" desc="Show masked Aadhaar to verified matches">
                  <Toggle2 on={privacy.aadhaarVisible} onToggle={() => togglePrivacy("aadhaarVisible")} />
                </Row>
                <Row label="Phone Number Visible" desc="Gold+ required to view contact details">
                  <Toggle2 on={privacy.phoneVisible} onToggle={() => togglePrivacy("phoneVisible")} />
                </Row>
              </Card>

              <div className="rounded-2xl p-4 flex items-start gap-3" style={{ background: "rgba(92,122,82,0.07)", border: "1px solid rgba(92,122,82,0.18)" }}>
                <Lock className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-sm font-semibold text-sage mb-1">Your data is protected</p>
                  <p className="font-body text-xs text-sage/70">Match4Marriage is PDPB compliant. Aadhaar is hashed and never stored in plain text. All messages are E2E encrypted.</p>
                </div>
              </div>
            </>
          )}

          {/* Preferences */}
          {section === "preferences" && (
            <>
              <Card>
                <Row label="Dark Mode" desc="Switch to dark theme">
                  <Toggle2 on={prefs.darkMode} onToggle={() => togglePrefs("darkMode")} />
                </Row>
                <Row label="Language">
                  <select
                    value={prefs.language}
                    onChange={(e) => setPrefs({ ...prefs, language: e.target.value })}
                    className="px-3 py-1.5 rounded-lg font-body text-sm text-deep outline-none"
                    style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.18)" }}
                  >
                    {["English", "Hindi", "Tamil", "Telugu", "Marathi", "Bengali", "Gujarati"].map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </Row>
              </Card>

              <Card>
                <p className="font-body text-xs font-semibold text-deep/40 uppercase tracking-wider py-3">Partner Preferences</p>
                <Row label="Age Range">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={prefs.ageFrom}
                      onChange={(e) => setPrefs({ ...prefs, ageFrom: e.target.value })}
                      className="w-16 px-2 py-1.5 rounded-lg font-body text-sm text-deep text-center outline-none"
                      style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.18)" }}
                    />
                    <span className="font-body text-xs text-deep/40">to</span>
                    <input
                      type="number"
                      value={prefs.ageTo}
                      onChange={(e) => setPrefs({ ...prefs, ageTo: e.target.value })}
                      className="w-16 px-2 py-1.5 rounded-lg font-body text-sm text-deep text-center outline-none"
                      style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.18)" }}
                    />
                  </div>
                </Row>
                <Row label="Religion">
                  <select
                    value={prefs.religionFilter}
                    onChange={(e) => setPrefs({ ...prefs, religionFilter: e.target.value })}
                    className="px-3 py-1.5 rounded-lg font-body text-sm text-deep outline-none"
                    style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,107,0,0.18)" }}
                  >
                    {["Any", "Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist"].map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </Row>
              </Card>
            </>
          )}

          {/* Account */}
          {section === "account" && (
            <>
              <Card>
                {[
                  { label: "Change Phone Number", desc: "+91 98765 43210" },
                  { label: "Change Email", desc: "prabhakar@example.com" },
                  { label: "Change Password", desc: "Last changed 3 months ago" },
                  { label: "Two-Factor Authentication", desc: "Add extra security" },
                ].map(({ label, desc }) => (
                  <Row key={label} label={label} desc={desc}>
                    <ChevronRight className="w-4 h-4 text-deep/25" />
                  </Row>
                ))}
              </Card>

              <Card>
                <Row label="Linked Google Account" desc="prabhakar@gmail.com">
                  <CheckCircle className="w-4 h-4 text-sage" />
                </Row>
                <Row label="Link LinkedIn" desc="Verify your professional credentials">
                  <button className="px-3 py-1 rounded-full font-body text-xs font-semibold text-white" style={{ background: "#0077B5", minHeight: "auto" }}>Link</button>
                </Row>
              </Card>

              <div className="rounded-2xl p-4" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}>
                <p className="font-body text-sm font-semibold text-red-500 mb-1">Danger Zone</p>
                <p className="font-body text-xs text-red-400/70 mb-3">These actions are irreversible. Please be certain.</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-full font-body text-xs font-semibold text-red-500" style={{ border: "1px solid rgba(239,68,68,0.25)", minHeight: "auto" }}>
                    Deactivate Account
                  </button>
                  <button className="px-4 py-2 rounded-full font-body text-xs font-semibold text-white" style={{ background: "#EF4444", minHeight: "auto" }}>
                    <Trash2 className="w-3.5 h-3.5 inline mr-1" />Delete Account
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Data */}
          {section === "data" && (
            <Card>
              {[
                { label: "Download My Data", desc: "Get a copy of all your Match4Marriage data (GDPR Article 20)", icon: <Download className="w-4 h-4 text-deep/40" /> },
                { label: "Privacy Policy", desc: "How we use and protect your data", icon: <Shield className="w-4 h-4 text-deep/40" /> },
                { label: "Terms of Service", desc: "Platform terms and conditions", icon: <Globe className="w-4 h-4 text-deep/40" /> },
                { label: "Cookie Preferences", desc: "Manage tracking and analytics cookies", icon: <Smartphone className="w-4 h-4 text-deep/40" /> },
              ].map(({ label, desc, icon }) => (
                <Row key={label} label={label} desc={desc}>
                  {icon}
                </Row>
              ))}
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
