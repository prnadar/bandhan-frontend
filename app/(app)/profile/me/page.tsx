"use client";

import { useState, useRef } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni",
  "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha",
  "Jyeshtha", "Moola", "Purva Ashadha", "Uttara Ashadha", "Shravana",
  "Dhanishtha", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
];

const HEIGHTS = [
  "4ft 6in","4ft 7in","4ft 8in","4ft 9in","4ft 10in","4ft 11in",
  "5ft 0in","5ft 1in","5ft 2in","5ft 3in","5ft 4in","5ft 5in",
  "5ft 6in","5ft 7in","5ft 8in","5ft 9in","5ft 10in","5ft 11in",
  "6ft 0in","6ft 1in","6ft 2in","6ft 3in","6ft 4in","6ft 5in",
  "6ft 6in","7ft 0in",
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const COUNTRIES = [
  "UK","India","UAE","USA","Canada","Australia",
  "Singapore","Germany","France","Netherlands","New Zealand","Malaysia","Other",
];

const INCOME_OPTIONS = [
  "Not Specified","Below £20k","£20k–£30k","£30k–£50k",
  "£50k–£75k","£75k–£100k","Above £100k",
];

const INTERESTS_CONFIG: Record<string, string[]> = {
  Music:   ["Film Music","Devotional","Western Music","Hindi Songs","Tamil Songs","Malayalam Songs","Classical"],
  Reading: ["Newspapers","Self Help","Management","Classics","Biographies","Romance","Thrillers","Magazines"],
  Movies:  ["Malayalam","English","Hindi","Tamil","Comedy","Romance","Action","Family Stories","Documentaries"],
  Sports:  ["Cricket","Football","Tennis","Badminton","Board Games","Basketball","Swimming","Running","Gym"],
  Foods:   ["Kerala","North Indian","South Indian","Chinese","Continental","Thai","Anything"],
  Dress:   ["Indian Traditional","Indo Western","Casual","Formal","No Preference"],
};

const VERIFICATIONS = [
  { label: "Email Verified",    done: true,  pts: 20, icon: "check_circle",  tag: "EMAIL" },
  { label: "Mobile Verified",   done: true,  pts: 20, icon: "check_circle",  tag: "MOBILE" },
  { label: "ID Verified",       done: false, pts: 30, icon: "history_edu",   tag: "GOVT ID" },
  { label: "Profile Complete",  done: false, pts: 20, icon: "task_alt",      tag: "PROFILE" },
  { label: "LinkedIn",          done: false, pts: 10, icon: "link",          tag: "SOCIAL" },
];

const TABS = [
  { id: "general",   label: "General Info",         total: 25 },
  { id: "education", label: "Education & Career",   total: 8  },
  { id: "family",    label: "My Family",            total: 12 },
  { id: "interests", label: "Interests",            total: 6  },
  { id: "partner",   label: "Partner Prefs",        total: 10 },
  { id: "contact",   label: "Contact Details",      total: 11 },
  { id: "photos",    label: "My Photos",            total: 6  },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface School      { name: string; place: string; year: string; }
interface College     { name: string; course: string; place: string; year: string; }
interface Employment  { company: string; designation: string; location: string; }

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function MyProfilePage() {
  const [activeTab, setActiveTab] = useState("general");
  const [savedTab,  setSavedTab]  = useState<string | null>(null);

  // General Info
  const [general, setGeneral] = useState({
    profileCreatedBy: "", name: "", gender: "",
    dobDay: "", dobMonth: "", dobYear: "",
    height: "", weight: "", maritalStatus: "", motherTongue: "",
    religion: "", denomination: "", subCaste: "",
    complexion: "", bodyType: "", bloodGroup: "",
    star: "", chovvaDosham: "", physicalStatus: "",
    aboutMe: "", countryLivingIn: "", residentialStatus: "",
    nativePlace: "", currentLocation: "", diet: "", smoke: "", drink: "",
  });

  // Education & Career
  const [education, setEducation] = useState({
    educationLevel: "", educationDetail: "",
    occupation: "", employedIn: "", annualIncome: "",
  });
  const [schools,    setSchools]    = useState<School[]>([{ name: "", place: "", year: "" }]);
  const [colleges,   setColleges]   = useState<College[]>([{ name: "", course: "", place: "", year: "" }]);
  const [employment, setEmployment] = useState<Employment[]>([{ company: "", designation: "", location: "" }]);

  // Family
  const [family, setFamily] = useState({
    aboutFamily: "", familyType: "", familyStatus: "", familyValue: "",
    annualFamilyIncome: "",
    fatherName: "", fatherOccupation: "", fatherCompany: "", fatherDesignation: "", fatherLocation: "",
    motherName: "", motherOccupation: "", motherCompany: "", motherDesignation: "", motherLocation: "",
    brothers: "", sisters: "",
  });

  // Interests
  const [interests, setInterests] = useState<Record<string, string[]>>({
    Music: [], Reading: [], Movies: [], Sports: [], Foods: [], Dress: [],
  });

  // Partner Preferences
  const [partner, setPartner] = useState({
    ageFrom: "", ageTo: "", heightFrom: "", heightTo: "",
    maritalStatus: "", religionPref: "", denomination: "",
    motherTongue: "", education: "", occupation: "",
    diet: "", country: "", residentialStatus: "", aboutPartner: "",
  });

  // Contact
  const [contact, setContact] = useState({
    countryCode: "+44", mobile: "", altPhone: "", preferredContact: "",
    bestTimeToCall: "", contactPersonName: "", contactRelationship: "",
    address1: "", address2: "", city: "", country: "", postcode: "",
  });

  // Completion counts
  const countFilled = (obj: Record<string, string>) =>
    Object.values(obj).filter((v) => v.trim() !== "").length;

  const tabCounts: Record<string, { filled: number; total: number }> = {
    general:   { filled: countFilled(general),   total: 25 },
    education: { filled: countFilled(education), total: 8  },
    family:    { filled: countFilled(family),    total: 12 },
    interests: { filled: Object.values(interests).filter((a) => a.length > 0).length, total: 6 },
    partner:   { filled: countFilled(partner),   total: 10 },
    contact:   { filled: countFilled(contact),   total: 11 },
    photos:    { filled: 0, total: 6 },
  };

  const totalFilled = Object.values(tabCounts).reduce((a, b) => a + b.filled, 0);
  const totalFields = Object.values(tabCounts).reduce((a, b) => a + b.total, 0);
  const completeness = totalFields > 0 ? Math.round((totalFilled / totalFields) * 100) : 0;
  const trustScore = VERIFICATIONS.filter((v) => v.done).reduce((a, v) => a + v.pts, 0);

  const handleSave = (tabId: string) => {
    console.log("Saving", tabId, { general, education, family, interests, partner, contact });
    setSavedTab(tabId);
    setTimeout(() => setSavedTab(null), 2000);
  };

  const upGeneral   = (f: string, v: string) => setGeneral  ((p) => ({ ...p, [f]: v }));
  const upEducation = (f: string, v: string) => setEducation((p) => ({ ...p, [f]: v }));
  const upFamily    = (f: string, v: string) => setFamily   ((p) => ({ ...p, [f]: v }));
  const upPartner   = (f: string, v: string) => setPartner  ((p) => ({ ...p, [f]: v }));
  const upContact   = (f: string, v: string) => setContact  ((p) => ({ ...p, [f]: v }));

  const toggleInterest = (cat: string, item: string) =>
    setInterests((p) => ({
      ...p,
      [cat]: p[cat].includes(item) ? p[cat].filter((i) => i !== item) : [...p[cat], item],
    }));

  return (
    <div className="min-h-screen bg-surface p-6 md:p-12 font-body text-on-surface">
      <div className="max-w-6xl mx-auto">

        {/* ── Bento Header Layout ── */}
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-12 items-stretch">

          {/* Profile Identity Card */}
          <div className="col-span-12 md:col-span-8 bg-surface-container-low rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-full -mr-16 -mt-16" />

            {/* Avatar / Photo placeholder */}
            <div className="w-48 h-64 rounded-2xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center flex-shrink-0 relative z-10">
              <span className="font-headline text-5xl text-on-primary font-light">
                {(general.name || "?")
                  .split(" ")
                  .filter(Boolean)
                  .map((w) => w[0].toUpperCase())
                  .slice(0, 2)
                  .join("")}
              </span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-on-surface font-headline">
                {general.name || "Your Name"}
              </h1>
              <p className="text-primary font-medium tracking-wide uppercase text-xs mb-6">
                Premium Editorial Member
              </p>

              <div className="flex flex-col gap-4">
                {/* Trust Score circle */}
                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold font-headline">
                    {trustScore}
                  </div>
                  <div>
                    <p className="text-sm font-bold font-headline">Trust Score: {trustScore}/100</p>
                    <p className="text-xs text-on-surface-variant">Verify more to increase credibility</p>
                  </div>
                </div>

                {/* Verification badges */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {VERIFICATIONS.map((v) => (
                    <div
                      key={v.tag}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold border border-outline-variant/20 ${
                        v.done
                          ? "bg-surface-container-lowest"
                          : "bg-surface-container opacity-50"
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[14px] ${
                          v.done ? "text-green-600" : "text-on-surface-variant"
                        }`}
                        style={v.done ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        {v.done ? "check_circle" : v.icon}
                      </span>
                      {v.tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="col-span-12 md:col-span-4 bg-surface-container-highest rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-end mb-4">
                <h3 className="font-headline font-bold text-xl">Profile Complete</h3>
                <span className="text-primary font-bold text-3xl">{completeness}%</span>
              </div>
              <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${completeness}%` }}
                />
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Your editorial profile is taking shape. Complete the remaining sections to unlock high-intent matches.
              </p>
            </div>
            <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-sm tracking-wide mt-6 hover:scale-[1.02] transition-transform active:scale-95">
              UNLOCK MORE VIEWS
            </button>
          </div>
        </div>

        {/* ── Tabbed Interface Section ── */}
        <div className="bg-surface-container-lowest rounded-[2rem] overflow-hidden">

          {/* Tab Bar */}
          <div className="flex bg-surface-container-low px-4 md:px-8 pt-6 gap-4 md:gap-8 overflow-x-auto">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 border-b-2 text-sm tracking-wide transition-colors whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? "border-primary text-primary font-bold"
                      : "border-transparent text-on-surface-variant opacity-60 hover:opacity-100 font-medium"
                  }`}
                >
                  {tab.label.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Tab Content Area */}
          <div className="p-6 md:p-12 space-y-16">
            {activeTab === "general" && (
              <GeneralTab
                form={general} update={upGeneral}
                onSave={() => handleSave("general")} saving={savedTab === "general"}
              />
            )}
            {activeTab === "education" && (
              <EducationTab
                form={education} update={upEducation}
                schools={schools} setSchools={setSchools}
                colleges={colleges} setColleges={setColleges}
                employment={employment} setEmployment={setEmployment}
                onSave={() => handleSave("education")} saving={savedTab === "education"}
              />
            )}
            {activeTab === "family" && (
              <FamilyTab
                form={family} update={upFamily}
                onSave={() => handleSave("family")} saving={savedTab === "family"}
              />
            )}
            {activeTab === "interests" && (
              <InterestsTab
                interests={interests} toggle={toggleInterest}
                onSave={() => handleSave("interests")} saving={savedTab === "interests"}
              />
            )}
            {activeTab === "partner" && (
              <PartnerTab
                form={partner} update={upPartner}
                onSave={() => handleSave("partner")} saving={savedTab === "partner"}
              />
            )}
            {activeTab === "contact" && (
              <ContactTab
                form={contact} update={upContact}
                onSave={() => handleSave("contact")} saving={savedTab === "contact"}
              />
            )}
            {activeTab === "photos" && (
              <PhotosTab />
            )}
          </div>
        </div>

        {/* Spacer */}
        <div className="h-24" />
      </div>
    </div>
  );
}

// ─── TAB 1: General Info ───────────────────────────────────────────────────────

function GeneralTab({
  form, update, onSave, saving,
}: {
  form: Record<string, string>;
  update: (f: string, v: string) => void;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <>
      {/* Personal Details */}
      <SubSection title="Personal Details">
        <TwoCol>
          <Field label="Profile Created By">
            <FSelect value={form.profileCreatedBy} onChange={(v) => update("profileCreatedBy", v)} placeholder="Select">
              {["Self","Parent","Sibling","Friend","Relative"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
          <Field label="Full Name" required>
            <FInput value={form.name} onChange={(v) => update("name", v)} placeholder="e.g. Priya Menon" />
          </Field>
          <Field label="Gender" required>
            <FSelect value={form.gender} onChange={(v) => update("gender", v)} placeholder="Select">
              {["Male","Female"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
          <Field label="Marital Status" required>
            <FSelect value={form.maritalStatus} onChange={(v) => update("maritalStatus", v)} placeholder="Select">
              {["Never Married","Divorced","Widowed","Awaiting Divorce"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
        </TwoCol>

        {/* Date of Birth */}
        <div className="mt-8">
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60 block mb-2">
            Date of Birth <span className="text-primary font-bold">*</span>
          </label>
          <div className="grid grid-cols-3 gap-4">
            <FSelect value={form.dobDay} onChange={(v) => update("dobDay", v)} placeholder="Day">
              {Array.from({ length: 31 }, (_, i) => String(i + 1)).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </FSelect>
            <FSelect value={form.dobMonth} onChange={(v) => update("dobMonth", v)} placeholder="Month">
              {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
            </FSelect>
            <FSelect value={form.dobYear} onChange={(v) => update("dobYear", v)} placeholder="Year">
              {Array.from({ length: 60 }, (_, i) => String(2006 - i)).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </FSelect>
          </div>
        </div>

        <TwoCol className="mt-8">
          <Field label="Height" required>
            <FSelect value={form.height} onChange={(v) => update("height", v)} placeholder="e.g. 5ft 8in">
              {HEIGHTS.map((h) => <option key={h} value={h}>{h}</option>)}
            </FSelect>
          </Field>
          <Field label="Weight (kg)">
            <FInput value={form.weight} onChange={(v) => update("weight", v)} placeholder="e.g. 65" />
          </Field>
          <Field label="Complexion">
            <FSelect value={form.complexion} onChange={(v) => update("complexion", v)} placeholder="Select">
              {["Very Fair","Fair","Wheatish","Wheatish Brown","Dark"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
          <Field label="Body Type">
            <FSelect value={form.bodyType} onChange={(v) => update("bodyType", v)} placeholder="Select">
              {["Slim","Athletic","Average","Heavy"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
          <Field label="Blood Group">
            <FSelect value={form.bloodGroup} onChange={(v) => update("bloodGroup", v)} placeholder="Select">
              {["A+","A-","B+","B-","O+","O-","AB+","AB-"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
          <Field label="Physical Status">
            <FSelect value={form.physicalStatus} onChange={(v) => update("physicalStatus", v)} placeholder="Select">
              {["Normal","Physically Challenged"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
        </TwoCol>

        <div className="mt-8">
          <Field label="About Me" fullSpan>
            <FTextarea
              value={form.aboutMe}
              onChange={(v) => update("aboutMe", v)}
              placeholder="Tell potential matches about yourself, your values, and what you're looking for..."
              rows={4}
            />
          </Field>
        </div>
      </SubSection>

      {/* Religious & Cultural */}
      <SubSection title="Religious & Cultural">
        <TwoCol>
          <Field label="Mother Tongue" required>
            <FSelect value={form.motherTongue} onChange={(v) => update("motherTongue", v)} placeholder="Select">
              {["Malayalam","Tamil","Telugu","Kannada","Hindi","English","Other"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
          <Field label="Religion" required>
            <FSelect value={form.religion} onChange={(v) => update("religion", v)} placeholder="Select">
              {["Hindu","Christian","Sikh","Jain","Buddhist","Muslim","Other"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
          <Field label="Denomination / Caste" required>
            <FInput value={form.denomination} onChange={(v) => update("denomination", v)} placeholder="e.g. Nair, Iyer, Syrian Christian" />
          </Field>
          <Field label="Sub Caste">
            <FInput value={form.subCaste} onChange={(v) => update("subCaste", v)} placeholder="e.g. Kiriyathil Nair" />
          </Field>
          <Field label="Star / Nakshatra">
            <FSelect value={form.star} onChange={(v) => update("star", v)} placeholder="e.g. Ashwini">
              {NAKSHATRAS.map((n) => <option key={n} value={n}>{n}</option>)}
            </FSelect>
          </Field>
          <Field label="Chovva Dosham">
            <FSelect value={form.chovvaDosham} onChange={(v) => update("chovvaDosham", v)} placeholder="Select">
              {["Yes","No","Partial"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
        </TwoCol>
      </SubSection>

      {/* Location & Lifestyle */}
      <SubSection title="Location & Lifestyle">
        <TwoCol>
          <Field label="Country Living In" required>
            <FSelect value={form.countryLivingIn} onChange={(v) => update("countryLivingIn", v)} placeholder="Select">
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </FSelect>
          </Field>
          <Field label="Residential Status" required>
            <FSelect value={form.residentialStatus} onChange={(v) => update("residentialStatus", v)} placeholder="Select">
              {["Citizen","Permanent Resident","Work Permit","Student Visa","Temporary Visa"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
          <Field label="Native Place" required>
            <FInput value={form.nativePlace} onChange={(v) => update("nativePlace", v)} placeholder="e.g. Thrissur, Kerala" />
          </Field>
          <Field label="Current Location / City" required>
            <FInput value={form.currentLocation} onChange={(v) => update("currentLocation", v)} placeholder="e.g. London, UK" />
          </Field>
          <Field label="Diet">
            <FSelect value={form.diet} onChange={(v) => update("diet", v)} placeholder="Select">
              {["Vegetarian","Non-Vegetarian","Eggetarian","Vegan","Jain"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
          <Field label="Smoke">
            <FSelect value={form.smoke} onChange={(v) => update("smoke", v)} placeholder="Select">
              {["No","Occasionally","Yes"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
          <Field label="Drink">
            <FSelect value={form.drink} onChange={(v) => update("drink", v)} placeholder="Select">
              {["No","Occasionally","Yes"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
        </TwoCol>
      </SubSection>

      <SaveButton onSave={onSave} saving={saving} label="Save General Info" />
    </>
  );
}

// ─── TAB 2: Education & Career ─────────────────────────────────────────────────

function EducationTab({
  form, update, schools, setSchools, colleges, setColleges,
  employment, setEmployment, onSave, saving,
}: {
  form: Record<string, string>;
  update: (f: string, v: string) => void;
  schools: School[];     setSchools:    (s: School[]) => void;
  colleges: College[];   setColleges:   (c: College[]) => void;
  employment: Employment[]; setEmployment: (e: Employment[]) => void;
  onSave: () => void; saving: boolean;
}) {
  return (
    <>
      <SubSection title="Education">
        <TwoCol>
          <Field label="Education Level" required>
            <FSelect value={form.educationLevel} onChange={(v) => update("educationLevel", v)} placeholder="Select">
              {["High School","Diploma","Bachelor's","Master's","Doctorate","Professional Degree","Other"].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </FSelect>
          </Field>
          <Field label="Education in Detail">
            <FInput value={form.educationDetail} onChange={(v) => update("educationDetail", v)} placeholder="e.g. B.Tech Computer Science, IIT Madras" />
          </Field>
        </TwoCol>

        {/* Schools */}
        <div className="mt-8">
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60 block mb-4">
            Schools
          </label>
          {schools.map((s, i) => (
            <RepRow
              key={i}
              onRemove={schools.length > 1 ? () => setSchools(schools.filter((_, idx) => idx !== i)) : undefined}
            >
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4">
                <Field label="School Name">
                  <FInput
                    value={s.name}
                    onChange={(v) => setSchools(schools.map((r, idx) => idx === i ? { ...r, name: v } : r))}
                    placeholder="e.g. St. Joseph's School"
                  />
                </Field>
                <Field label="Place">
                  <FInput
                    value={s.place}
                    onChange={(v) => setSchools(schools.map((r, idx) => idx === i ? { ...r, place: v } : r))}
                    placeholder="e.g. Kochi"
                  />
                </Field>
                <Field label="Year">
                  <FInput
                    value={s.year}
                    onChange={(v) => setSchools(schools.map((r, idx) => idx === i ? { ...r, year: v } : r))}
                    placeholder="e.g. 2010"
                  />
                </Field>
              </div>
            </RepRow>
          ))}
          <AddBtn onClick={() => setSchools([...schools, { name: "", place: "", year: "" }])} />
        </div>

        {/* Colleges */}
        <div className="mt-8">
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60 block mb-4">
            Colleges
          </label>
          {colleges.map((c, i) => (
            <RepRow
              key={i}
              onRemove={colleges.length > 1 ? () => setColleges(colleges.filter((_, idx) => idx !== i)) : undefined}
            >
              <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_1fr] gap-4">
                <Field label="College Name">
                  <FInput
                    value={c.name}
                    onChange={(v) => setColleges(colleges.map((r, idx) => idx === i ? { ...r, name: v } : r))}
                    placeholder="e.g. MG University"
                  />
                </Field>
                <Field label="Course">
                  <FInput
                    value={c.course}
                    onChange={(v) => setColleges(colleges.map((r, idx) => idx === i ? { ...r, course: v } : r))}
                    placeholder="e.g. B.Com Finance"
                  />
                </Field>
                <Field label="Place">
                  <FInput
                    value={c.place}
                    onChange={(v) => setColleges(colleges.map((r, idx) => idx === i ? { ...r, place: v } : r))}
                    placeholder="e.g. Kottayam"
                  />
                </Field>
                <Field label="Year">
                  <FInput
                    value={c.year}
                    onChange={(v) => setColleges(colleges.map((r, idx) => idx === i ? { ...r, year: v } : r))}
                    placeholder="e.g. 2016"
                  />
                </Field>
              </div>
            </RepRow>
          ))}
          <AddBtn onClick={() => setColleges([...colleges, { name: "", course: "", place: "", year: "" }])} />
        </div>
      </SubSection>

      <SubSection title="Career">
        {/* Employment */}
        <div className="mb-8">
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60 block mb-4">
            Employment History
          </label>
          {employment.map((e, i) => (
            <RepRow
              key={i}
              onRemove={employment.length > 1 ? () => setEmployment(employment.filter((_, idx) => idx !== i)) : undefined}
            >
              <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr] gap-4">
                <Field label="Company Name">
                  <FInput
                    value={e.company}
                    onChange={(v) => setEmployment(employment.map((r, idx) => idx === i ? { ...r, company: v } : r))}
                    placeholder="e.g. Infosys, NHS, Barclays"
                  />
                </Field>
                <Field label="Designation">
                  <FInput
                    value={e.designation}
                    onChange={(v) => setEmployment(employment.map((r, idx) => idx === i ? { ...r, designation: v } : r))}
                    placeholder="e.g. Senior Software Engineer"
                  />
                </Field>
                <Field label="Location">
                  <FInput
                    value={e.location}
                    onChange={(v) => setEmployment(employment.map((r, idx) => idx === i ? { ...r, location: v } : r))}
                    placeholder="e.g. London"
                  />
                </Field>
              </div>
            </RepRow>
          ))}
          <AddBtn onClick={() => setEmployment([...employment, { company: "", designation: "", location: "" }])} />
        </div>

        <TwoCol>
          <Field label="Occupation" required>
            <FSelect value={form.occupation} onChange={(v) => update("occupation", v)} placeholder="Select">
              {["Software Engineer","Doctor","Engineer","Business","Teacher","Accountant","Lawyer","Other"].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </FSelect>
          </Field>
          <Field label="Employed In" required>
            <FSelect value={form.employedIn} onChange={(v) => update("employedIn", v)} placeholder="Select">
              {["Government","Private","Business/Self-Employed","Not Employed","Other"].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </FSelect>
          </Field>
          <Field label="Annual Income">
            <FSelect value={form.annualIncome} onChange={(v) => update("annualIncome", v)} placeholder="Select">
              {INCOME_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
        </TwoCol>
      </SubSection>

      <SaveButton onSave={onSave} saving={saving} label="Save Education & Career" />
    </>
  );
}

// ─── TAB 3: My Family ──────────────────────────────────────────────────────────

function FamilyTab({
  form, update, onSave, saving,
}: {
  form: Record<string, string>;
  update: (f: string, v: string) => void;
  onSave: () => void; saving: boolean;
}) {
  return (
    <>
      <SubSection title="Family Overview">
        <Field label="About My Family" required fullSpan>
          <FTextarea
            value={form.aboutFamily}
            onChange={(v) => update("aboutFamily", v)}
            placeholder="Describe your family background, values, traditions, and what makes your family special..."
            rows={3}
          />
        </Field>
        <TwoCol className="mt-8">
          <Field label="Family Type">
            <FSelect value={form.familyType} onChange={(v) => update("familyType", v)} placeholder="Select">
              {["Joint","Nuclear","Extended"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
          <Field label="Family Status">
            <FSelect value={form.familyStatus} onChange={(v) => update("familyStatus", v)} placeholder="Select">
              {["Middle Class","Upper Middle Class","Affluent","High Net Worth"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
          <Field label="Family Values">
            <FSelect value={form.familyValue} onChange={(v) => update("familyValue", v)} placeholder="Select">
              {["Traditional","Moderate","Liberal"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
          <Field label="Annual Family Income">
            <FSelect value={form.annualFamilyIncome} onChange={(v) => update("annualFamilyIncome", v)} placeholder="Select">
              {INCOME_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
        </TwoCol>
      </SubSection>

      <SubSection title="Father's Details">
        <TwoCol>
          <Field label="Name">
            <FInput value={form.fatherName} onChange={(v) => update("fatherName", v)} placeholder="Father's full name" />
          </Field>
          <Field label="Occupation" required>
            <FInput value={form.fatherOccupation} onChange={(v) => update("fatherOccupation", v)} placeholder="e.g. Retired Government Officer" />
          </Field>
          <Field label="Company / Organisation">
            <FInput value={form.fatherCompany} onChange={(v) => update("fatherCompany", v)} placeholder="e.g. KSEB, Tata Motors" />
          </Field>
          <Field label="Designation">
            <FInput value={form.fatherDesignation} onChange={(v) => update("fatherDesignation", v)} placeholder="e.g. Chief Engineer" />
          </Field>
          <Field label="Location">
            <FInput value={form.fatherLocation} onChange={(v) => update("fatherLocation", v)} placeholder="e.g. Thrissur, Kerala" />
          </Field>
        </TwoCol>
      </SubSection>

      <SubSection title="Mother's Details">
        <TwoCol>
          <Field label="Name">
            <FInput value={form.motherName} onChange={(v) => update("motherName", v)} placeholder="Mother's full name" />
          </Field>
          <Field label="Occupation" required>
            <FInput value={form.motherOccupation} onChange={(v) => update("motherOccupation", v)} placeholder="e.g. Homemaker, Teacher" />
          </Field>
          <Field label="Company / Organisation">
            <FInput value={form.motherCompany} onChange={(v) => update("motherCompany", v)} placeholder="If employed" />
          </Field>
          <Field label="Designation">
            <FInput value={form.motherDesignation} onChange={(v) => update("motherDesignation", v)} placeholder="e.g. Principal" />
          </Field>
          <Field label="Location">
            <FInput value={form.motherLocation} onChange={(v) => update("motherLocation", v)} placeholder="e.g. Thrissur, Kerala" />
          </Field>
        </TwoCol>
      </SubSection>

      <SubSection title="Siblings">
        <TwoCol>
          <Field label="Brothers (count + marital status)">
            <FInput
              value={form.brothers}
              onChange={(v) => update("brothers", v)}
              placeholder="e.g. 1 elder brother, married"
            />
          </Field>
          <Field label="Sisters (count + marital status)">
            <FInput
              value={form.sisters}
              onChange={(v) => update("sisters", v)}
              placeholder="e.g. 2 sisters, both unmarried"
            />
          </Field>
        </TwoCol>
      </SubSection>

      <SaveButton onSave={onSave} saving={saving} label="Save Family Details" />
    </>
  );
}

// ─── TAB 4: Interests & Hobbies ────────────────────────────────────────────────

function InterestsTab({
  interests, toggle, onSave, saving,
}: {
  interests: Record<string, string[]>;
  toggle: (cat: string, item: string) => void;
  onSave: () => void; saving: boolean;
}) {
  return (
    <>
      {Object.entries(INTERESTS_CONFIG).map(([category, items]) => (
        <SubSection key={category} title={category}>
          <div className="flex flex-wrap gap-3">
            {items.map((item) => {
              const selected = interests[category]?.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => toggle(category, item)}
                  className={`font-body text-sm font-medium px-5 py-2.5 rounded-full transition-all active:scale-95 ${
                    selected
                      ? "bg-gradient-to-r from-primary to-primary-container text-on-primary"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </SubSection>
      ))}
      <SaveButton onSave={onSave} saving={saving} label="Save Interests" />
    </>
  );
}

// ─── TAB 5: Partner Preferences ────────────────────────────────────────────────

function PartnerTab({
  form, update, onSave, saving,
}: {
  form: Record<string, string>;
  update: (f: string, v: string) => void;
  onSave: () => void; saving: boolean;
}) {
  return (
    <>
      <SubSection title="Age & Physical Preferences">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8">
          <Field label="Age From">
            <FInput type="number" value={form.ageFrom} onChange={(v) => update("ageFrom", v)} placeholder="e.g. 24" />
          </Field>
          <Field label="Age To">
            <FInput type="number" value={form.ageTo} onChange={(v) => update("ageTo", v)} placeholder="e.g. 32" />
          </Field>
          <Field label="Height From">
            <FSelect value={form.heightFrom} onChange={(v) => update("heightFrom", v)} placeholder="Min height">
              {HEIGHTS.map((h) => <option key={h} value={h}>{h}</option>)}
            </FSelect>
          </Field>
          <Field label="Height To">
            <FSelect value={form.heightTo} onChange={(v) => update("heightTo", v)} placeholder="Max height">
              {HEIGHTS.map((h) => <option key={h} value={h}>{h}</option>)}
            </FSelect>
          </Field>
        </div>
        <TwoCol className="mt-8">
          <Field label="Marital Status" required>
            <FSelect value={form.maritalStatus} onChange={(v) => update("maritalStatus", v)} placeholder="Any">
              {["Any","Never Married","Divorced","Widowed"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
          <Field label="Diet Preference">
            <FSelect value={form.diet} onChange={(v) => update("diet", v)} placeholder="Any">
              {["Any","Vegetarian","Non-Vegetarian","Eggetarian","Vegan"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
        </TwoCol>
      </SubSection>

      <SubSection title="Background Preferences">
        <TwoCol>
          <Field label="Religion Preference">
            <FSelect value={form.religionPref} onChange={(v) => update("religionPref", v)} placeholder="Any">
              {["Any","Hindu","Christian","Sikh","Jain","Buddhist","Muslim"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
          <Field label="Mother Tongue" required>
            <FSelect value={form.motherTongue} onChange={(v) => update("motherTongue", v)} placeholder="Any">
              {["Any","Malayalam","Tamil","Telugu","Kannada","Hindi","English"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
          <Field label="Denomination / Caste" required>
            <FInput value={form.denomination} onChange={(v) => update("denomination", v)} placeholder="Any or specify, e.g. Nair" />
          </Field>
          <Field label="Education">
            <FSelect value={form.education} onChange={(v) => update("education", v)} placeholder="Any">
              {["Any", "High School", "Diploma", "Graduate / Bachelor's", "Post Graduate / Master's", "Doctorate / PhD", "Professional Degree (MBBS / LLB / CA)", "Trade / Vocational"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
          <Field label="Occupation" required>
            <FInput value={form.occupation} onChange={(v) => update("occupation", v)} placeholder="e.g. Software / Doctor / Business" />
          </Field>
          <Field label="Country Preference">
            <FSelect value={form.country} onChange={(v) => update("country", v)} placeholder="Any">
              {["Any", ...COUNTRIES].map((c) => <option key={c} value={c}>{c}</option>)}
            </FSelect>
          </Field>
          <Field label="Residential Status" required>
            <FSelect value={form.residentialStatus} onChange={(v) => update("residentialStatus", v)} placeholder="Any">
              {["Any","Citizen","Permanent Resident","Work Permit","Student Visa"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
        </TwoCol>
      </SubSection>

      <SubSection title="Partner Description">
        <Field label="About My Ideal Partner" fullSpan>
          <FTextarea
            value={form.aboutPartner}
            onChange={(v) => update("aboutPartner", v)}
            placeholder="Describe the kind of person you're looking for -- their values, personality, and what matters most to you in a life partner..."
            rows={4}
          />
        </Field>
      </SubSection>

      <SaveButton onSave={onSave} saving={saving} label="Save Partner Preferences" />
    </>
  );
}

// ─── TAB 6: Contact Details ────────────────────────────────────────────────────

function ContactTab({
  form, update, onSave, saving,
}: {
  form: Record<string, string>;
  update: (f: string, v: string) => void;
  onSave: () => void; saving: boolean;
}) {
  return (
    <>
      <SubSection title="Phone & Contact">
        <TwoCol>
          <Field label="Mobile Number" required>
            <div className="flex gap-3">
              <FSelect
                value={form.countryCode}
                onChange={(v) => update("countryCode", v)}
                placeholder="+44"
                className="w-24 flex-shrink-0"
              >
                {["+44","+91","+971","+1","+61","+65","+49","+33","+31"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </FSelect>
              <FInput value={form.mobile} onChange={(v) => update("mobile", v)} placeholder="e.g. 7700 900 123" />
            </div>
          </Field>
          <Field label="Alternate Phone">
            <FInput value={form.altPhone} onChange={(v) => update("altPhone", v)} placeholder="e.g. +91 98765 43210" />
          </Field>
          <Field label="Preferred Contact Method">
            <FSelect value={form.preferredContact} onChange={(v) => update("preferredContact", v)} placeholder="Select">
              {["Mobile","Email","WhatsApp"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
          <Field label="Best Time to Call">
            <FSelect value={form.bestTimeToCall} onChange={(v) => update("bestTimeToCall", v)} placeholder="Select">
              {["Morning","Afternoon","Evening","Anytime"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
        </TwoCol>
      </SubSection>

      <SubSection title="Contact Person">
        <TwoCol>
          <Field label="Contact Person Name" required>
            <FInput value={form.contactPersonName} onChange={(v) => update("contactPersonName", v)} placeholder="e.g. Rajan Menon" />
          </Field>
          <Field label="Relationship to Profile">
            <FSelect value={form.contactRelationship} onChange={(v) => update("contactRelationship", v)} placeholder="Select">
              {["Self","Parent","Sibling","Relative","Friend"].map((o) => <option key={o} value={o}>{o}</option>)}
            </FSelect>
          </Field>
        </TwoCol>
      </SubSection>

      <SubSection title="Address">
        <div className="flex flex-col gap-8">
          <Field label="Address Line 1" required fullSpan>
            <FInput value={form.address1} onChange={(v) => update("address1", v)} placeholder="e.g. 12 Maple Road" />
          </Field>
          <Field label="Address Line 2" fullSpan>
            <FInput value={form.address2} onChange={(v) => update("address2", v)} placeholder="Flat / Apartment / Area" />
          </Field>
          <TwoCol>
            <Field label="City" required>
              <FInput value={form.city} onChange={(v) => update("city", v)} placeholder="e.g. Birmingham" />
            </Field>
            <Field label="Postcode" required>
              <FInput value={form.postcode} onChange={(v) => update("postcode", v)} placeholder="e.g. B1 1AA" />
            </Field>
            <Field label="Country" required>
              <FSelect value={form.country} onChange={(v) => update("country", v)} placeholder="Select country">
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </FSelect>
            </Field>
          </TwoCol>
        </div>
      </SubSection>

      <SaveButton onSave={onSave} saving={saving} label="Save Contact Details" />
    </>
  );
}

// ─── TAB 7: Photos ──────────────────────────────────────────────────────────

function PhotosTab() {
  const [photos, setPhotos] = useState<{ id: string; url: string; isPrimary: boolean }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setUploading(true);
    const newPhotos = Array.from(files).slice(0, 6 - photos.length).map((file) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
      isPrimary: photos.length === 0,
    }));
    setTimeout(() => {
      setPhotos((prev) => [...prev, ...newPhotos]);
      setUploading(false);
    }, 800);
  };

  const makePrimary = (id: string) => {
    setPhotos((prev) => prev.map((p) => ({ ...p, isPrimary: p.id === id })));
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      if (filtered.length > 0 && !filtered.some((p) => p.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      return filtered;
    });
  };

  const remaining = 6 - photos.length;

  return (
    <div className="flex flex-col gap-12">

      {/* Header */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <span className="w-10 h-[1px] bg-outline-variant" />
          <h2 className="font-headline text-2xl font-bold">My Photos</h2>
        </div>
        <p className="text-sm text-on-surface-variant font-body leading-relaxed">
          Upload up to 6 photos. Your primary photo appears on your profile card.
          Profiles with photos get <strong className="text-primary">8x more responses</strong>.
        </p>
      </div>

      {/* Upload zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        className={`rounded-2xl p-10 text-center transition-all cursor-pointer ${
          dragOver
            ? "bg-surface-container-high"
            : "bg-surface-container-low"
        } ${remaining === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={remaining === 0}
        />
        <div className="mb-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-primary text-2xl">cloud_upload</span>
          </div>
          <p className="font-body font-semibold text-on-surface mb-1">
            {uploading ? "Uploading..." : remaining === 0 ? "Photo limit reached" : "Drop photos here or click to browse"}
          </p>
          <p className="text-sm text-on-surface-variant">
            JPG, PNG, WebP -- Max 5MB each -- {remaining} slot{remaining !== 1 ? "s" : ""} remaining
          </p>
        </div>
        {!uploading && remaining > 0 && (
          <button className="px-8 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-bold text-sm tracking-wide hover:opacity-90 transition-all active:scale-95">
            Select Photos
          </button>
        )}
      </div>

      {/* Photo grid */}
      {photos.length > 0 && (
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60 block mb-4">
            Your Photos ({photos.length}/6)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className={`relative rounded-2xl overflow-hidden aspect-square group ${
                  photo.isPrimary ? "ring-3 ring-primary" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt="Profile photo" className="w-full h-full object-cover" />

                {/* Primary badge */}
                {photo.isPrimary && (
                  <div className="absolute top-2 left-2 bg-primary text-on-primary text-[10px] font-bold px-3 py-1 rounded-full">
                    PRIMARY
                  </div>
                )}

                {/* Actions overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end justify-center gap-2 p-3">
                  {!photo.isPrimary && (
                    <button
                      onClick={(e) => { e.stopPropagation(); makePrimary(photo.id); }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white/90 text-primary"
                    >
                      Set Primary
                    </button>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); removePhoto(photo.id); }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-primary/85 text-on-primary"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: remaining }).map((_, i) => (
              <div
                key={`empty-${i}`}
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-2xl bg-surface-container-low flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-on-surface-variant/30 text-2xl">add_a_photo</span>
                <span className="text-[11px] text-on-surface-variant/40 font-body">Add Photo</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Privacy note */}
      <div className="flex gap-3 items-start p-5 bg-surface-container-low rounded-2xl">
        <span className="material-symbols-outlined text-primary text-lg flex-shrink-0 mt-0.5">shield</span>
        <div>
          <p className="font-body text-sm font-semibold text-on-surface mb-1">Privacy Protected</p>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Your photos are only visible to verified members. You can set any photo as your primary profile picture.
          </p>
        </div>
      </div>

      {/* Save button */}
      {photos.length > 0 && (
        <div className="pt-12 border-t border-outline-variant/10 flex justify-end">
          <button className="px-12 py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-bold text-lg hover:opacity-90 transition-all active:scale-95">
            Save Photos
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Shared UI Components ──────────────────────────────────────────────────────

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <span className="w-10 h-[1px] bg-outline-variant" />
        <h2 className="font-headline text-2xl font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function TwoCol({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 ${className || ""}`}>
      {children}
    </div>
  );
}

function Field({
  label, children, required, fullSpan,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  fullSpan?: boolean;
}) {
  return (
    <div className={`space-y-2 ${fullSpan ? "col-span-full" : ""}`}>
      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60 block">
        {label}
        {required && <span className="text-primary font-bold ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function FInput({
  value, onChange, placeholder, type,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type || "text"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-surface-container-low border-none rounded-xl py-4 px-6 text-on-surface font-medium font-body text-sm placeholder:text-on-surface-variant/40 focus:outline-none focus:bg-surface-container-high transition-colors"
    />
  );
}

function FSelect({
  value, onChange, placeholder, children, className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className || ""}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-surface-container-low border-none rounded-xl py-4 px-6 pr-10 text-on-surface font-medium font-body text-sm appearance-none focus:outline-none focus:bg-surface-container-high transition-colors cursor-pointer"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant/50">
        <span className="material-symbols-outlined text-lg">expand_more</span>
      </div>
    </div>
  );
}

function FTextarea({
  value, onChange, placeholder, rows,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows || 3}
      className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-on-surface font-medium font-body text-sm resize-none leading-relaxed placeholder:text-on-surface-variant/40 focus:outline-none focus:bg-surface-container-high transition-colors"
    />
  );
}

function RepRow({ children, onRemove }: { children: React.ReactNode; onRemove?: () => void }) {
  return (
    <div className="relative bg-surface-container-low rounded-2xl p-5 mb-4">
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
          title="Remove"
        >
          <span className="material-symbols-outlined text-base">close</span>
        </button>
      )}
      {children}
    </div>
  );
}

function AddBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary bg-transparent hover:bg-primary/5 rounded-xl px-5 py-2.5 transition-colors active:scale-95"
    >
      <span className="material-symbols-outlined text-lg">add</span>
      Add Another
    </button>
  );
}

function SaveButton({
  onSave, saving, label,
}: {
  onSave: () => void;
  saving: boolean;
  label: string;
}) {
  return (
    <div className="pt-12 border-t border-outline-variant/10 flex justify-end">
      <button
        onClick={onSave}
        className={`px-12 py-5 rounded-full font-bold text-lg tracking-wide transition-all active:scale-95 ${
          saving
            ? "bg-green-600 text-white"
            : "bg-gradient-to-r from-primary to-primary-container text-on-primary hover:opacity-90"
        }`}
      >
        {saving ? "Saved!" : label}
      </button>
    </div>
  );
}
