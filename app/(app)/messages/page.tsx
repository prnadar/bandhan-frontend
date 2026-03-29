"use client";

import Link from "next/link";
import { useState } from "react";

/* ── hardcoded thread data (preserved from original) ── */
const threads = [
  {
    id: "1",
    name: "Priya Sharma",
    photo: "PS",
    grad: "linear-gradient(135deg,#E8426A,#E8A060)",
    lastMsg:
      "Thank you for your interest! I'd love to know more about your work at\u2026",
    time: "10:42 AM",
    unread: 2,
    verified: true,
    compatibility: 92,
    online: true,
    location: "Mumbai, MH",
    role: "Software Architect",
    tags: ["Vegetarian", "Never Married", "Post Graduate"],
    quote:
      "Looking for a partner who values quiet mornings, deep conversations, and the beauty of our shared traditions.",
  },
  {
    id: "2",
    name: "Anjali Patel",
    photo: "AP",
    grad: "linear-gradient(135deg,#9A6B00,#C89020)",
    lastMsg: "My family is from Ahmedabad, what about yours?",
    time: "Yesterday",
    unread: 0,
    verified: true,
    compatibility: 87,
    online: false,
    location: "Ahmedabad, GJ",
    role: "Business Analyst",
    tags: ["Non-Smoker", "Post Graduate"],
    quote: "Family values and ambition can go hand in hand.",
  },
  {
    id: "3",
    name: "Kavya Nair",
    photo: "KN",
    grad: "linear-gradient(135deg,#5C7A52,#8DB870)",
    lastMsg:
      "I saw you're also into trekking \u2014 have you done Kedarkantha?",
    time: "Mon",
    unread: 1,
    verified: true,
    compatibility: 84,
    online: true,
    location: "Kochi, KL",
    role: "UX Designer",
    tags: ["Vegetarian", "Never Married"],
    quote: "Adventure and tradition make the best combination.",
  },
  {
    id: "4",
    name: "Shruti Agarwal",
    photo: "SA",
    grad: "linear-gradient(135deg,#E8426A99,#9A6B0099)",
    lastMsg: "Haha yes, Delhi winters are something else",
    time: "Sun",
    unread: 0,
    verified: true,
    compatibility: 79,
    online: false,
    location: "Delhi, DL",
    role: "Marketing Director",
    tags: ["Non-Smoker", "Graduate"],
    quote: "I believe the best relationships start with laughter.",
  },
];

/* ── sample messages for active thread ── */
const sampleMessages = [
  {
    id: "m1",
    sender: "them",
    text: "Hello! I was just reviewing your profile again. I noticed we both share a deep interest in traditional classical music and architectural history.",
    time: "10:45 AM",
  },
  {
    id: "m2",
    sender: "me",
    text: "It\u2019s wonderful to meet someone who appreciates the classics. I find that architecture tells the story of a culture better than any book could.",
    time: "10:52 AM",
  },
  {
    id: "m3",
    sender: "them",
    text: "Exactly! My family has always valued those roots. Have you visited the heritage sites in Rajasthan recently? I went last winter and it was magical.",
    time: "11:05 AM",
  },
  {
    id: "m4",
    sender: "me",
    text: "I haven\u2019t been in a few years, but I\u2019m planning a trip for the spring. I\u2019d love to hear your recommendations on which palaces are must-sees for a photographer.",
    time: "11:12 AM",
  },
];

export default function MessagesPage() {
  const [searchValue, setSearchValue] = useState("");
  const [activeThread, setActiveThread] = useState(threads[0]);

  const filtered = threads.filter(
    (t) =>
      t.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      t.lastMsg.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className="flex h-[calc(100vh-5rem)] overflow-hidden bg-surface">
      {/* ── Conversations Sidebar ── */}
      <aside className="h-full w-72 md:w-96 flex-shrink-0 flex flex-col bg-surface">
        {/* Header + Search */}
        <div className="p-8 pb-4">
          <h1 className="font-headline text-3xl text-on-surface tracking-tight mb-2">
            Conversations
          </h1>
          <p className="font-body text-sm text-on-surface-variant/60 mb-6">
            Your curated connections
          </p>
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search matches..."
              className="w-full bg-surface-container-lowest rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface font-body"
            />
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-lg">
              search
            </span>
          </div>
        </div>

        {/* Thread List */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-1 pt-4">
          {filtered.map((t) => {
            const isActive = t.id === activeThread.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveThread(t)}
                className={`w-full text-left py-4 px-8 flex items-center gap-4 cursor-pointer transition-all ${
                  isActive
                    ? "bg-surface-container-highest text-primary font-semibold border-r-4 border-primary"
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-headline text-sm font-semibold text-on-primary"
                    style={{ background: t.grad }}
                  >
                    {t.photo}
                  </div>
                  {t.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-surface rounded-full" />
                  )}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3
                      className={`font-headline text-lg truncate ${
                        isActive ? "text-primary" : "text-on-surface"
                      }`}
                    >
                      {t.name}
                    </h3>
                    <span className="text-[10px] font-body uppercase tracking-wider opacity-70 flex-shrink-0 ml-2">
                      {t.time}
                    </span>
                  </div>
                  <p
                    className={`text-sm truncate font-normal ${
                      isActive
                        ? "text-on-surface/80"
                        : "text-on-surface-variant/60"
                    }`}
                  >
                    {t.lastMsg}
                  </p>
                </div>
                {/* Unread badge */}
                {t.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {t.unread}
                  </span>
                )}
              </button>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12 px-6 text-on-surface-variant/50 font-body text-sm">
              No conversations found
            </div>
          )}
        </div>

        {/* New Message CTA */}
        <div className="p-6">
          <button className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">add_comment</span>
            New Message
          </button>
        </div>
      </aside>

      {/* ── Main Chat Window ── */}
      <section className="flex-1 flex flex-col bg-surface-container-low relative">
        {/* Chat Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-surface-container-lowest/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-headline text-sm font-semibold text-on-primary"
              style={{ background: activeThread.grad }}
            >
              {activeThread.photo}
            </div>
            <div>
              <h2 className="font-headline text-xl font-bold text-on-surface">
                {activeThread.name}
              </h2>
              <div className="flex items-center gap-2">
                {activeThread.online && (
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                )}
                <span className="text-xs text-on-surface-variant/60 font-body">
                  {activeThread.online ? "Online now" : "Offline"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-on-surface-variant/50 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">videocam</span>
            </button>
            <button className="p-2 text-on-surface-variant/50 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">call</span>
            </button>
            <div className="h-8 w-px bg-outline-variant/30 mx-2" />
            <button className="p-2 text-on-surface-variant/50 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </header>

        {/* Messages History */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
          {/* Date Divider */}
          <div className="flex justify-center">
            <span className="bg-surface-container-high px-4 py-1 rounded-full text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
              Today
            </span>
          </div>

          {sampleMessages.map((msg) =>
            msg.sender === "them" ? (
              /* Recipient Message */
              <div key={msg.id} className="flex gap-4 max-w-[80%]">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-headline text-[10px] font-semibold text-on-primary self-end mb-1 flex-shrink-0"
                  style={{ background: activeThread.grad }}
                >
                  {activeThread.photo}
                </div>
                <div className="space-y-1">
                  <div className="bg-surface-container-lowest px-6 py-4 rounded-t-2xl rounded-br-2xl text-on-surface text-sm leading-relaxed">
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-on-surface-variant/50 font-body block ml-2">
                    {msg.time}
                  </span>
                </div>
              </div>
            ) : (
              /* Sender Message */
              <div
                key={msg.id}
                className="flex flex-row-reverse gap-4 max-w-[80%] ml-auto"
              >
                <div className="space-y-1">
                  <div className="bg-gradient-to-br from-primary to-secondary text-on-primary px-6 py-4 rounded-t-2xl rounded-bl-2xl text-sm leading-relaxed">
                    {msg.text}
                  </div>
                  <div className="flex justify-end items-center gap-1 mr-2">
                    <span className="text-[10px] text-on-surface-variant/50 font-body">
                      {msg.time}
                    </span>
                    <span className="material-symbols-outlined text-[12px] text-primary">
                      done_all
                    </span>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>

        {/* Message Input */}
        <footer className="p-8 bg-transparent">
          <div className="bg-surface-container-lowest rounded-2xl p-2 flex items-end gap-2 border border-outline-variant/20">
            <button className="p-3 text-on-surface-variant/50 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">add_circle</span>
            </button>
            <textarea
              className="flex-1 border-none focus:ring-0 text-on-surface bg-transparent resize-none py-3 px-2 text-sm max-h-32 no-scrollbar font-body outline-none"
              placeholder="Type your message with intention..."
              rows={1}
            />
            <button className="p-3 text-on-surface-variant/50 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">mood</span>
            </button>
            <button className="bg-primary text-on-primary p-3 rounded-xl hover:scale-105 transition-transform flex items-center justify-center">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </footer>
      </section>

      {/* ── Right Side: Mini Profile / Compatibility ── */}
      <aside className="hidden xl:flex w-80 flex-col bg-surface overflow-y-auto no-scrollbar">
        <div className="p-8 text-center">
          {/* Profile Photo Placeholder */}
          <div className="w-32 h-40 mx-auto rounded-2xl overflow-hidden mb-6 rotate-2 hover:rotate-0 transition-transform duration-500">
            <div
              className="w-full h-full flex items-center justify-center font-headline text-3xl font-bold text-on-primary"
              style={{ background: activeThread.grad }}
            >
              {activeThread.photo}
            </div>
          </div>

          <h3 className="font-headline text-2xl text-on-surface font-bold mb-1">
            {activeThread.name}
          </h3>
          <p className="text-xs text-on-surface-variant/60 font-body uppercase tracking-widest mb-6">
            {activeThread.location} &bull; {activeThread.role}
          </p>

          <div className="space-y-6 text-left">
            {/* Compatibility Score */}
            <section>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">
                Compatibility Score
              </h4>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      className="text-outline-variant/30"
                      cx="32"
                      cy="32"
                      r="28"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <circle
                      className="text-primary"
                      cx="32"
                      cy="32"
                      r="28"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeDasharray="175"
                      strokeDashoffset={
                        175 - (175 * activeThread.compatibility) / 100
                      }
                    />
                  </svg>
                  <span className="absolute font-headline text-lg font-bold">
                    {activeThread.compatibility}%
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed font-body">
                  Exceptional alignment on values, lifestyle, and heritage.
                </p>
              </div>
            </section>

            {/* Key Matches */}
            <section>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">
                Key Matches
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeThread.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary-container/20 text-on-secondary-container text-[11px] rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Quote */}
            <section className="bg-surface-container-low p-4 rounded-xl">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                {activeThread.name.split(" ")[0]}&apos;s Quote
              </h4>
              <p className="font-headline italic text-sm text-on-surface-variant leading-relaxed">
                &ldquo;{activeThread.quote}&rdquo;
              </p>
            </section>

            {/* View Profile Link */}
            <div className="pt-4 border-t border-outline-variant/20">
              <Link
                href={`/messages/${activeThread.id}`}
                className="w-full py-3 text-sm font-semibold text-primary hover:bg-primary-fixed rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">
                  visibility
                </span>
                View Full Profile
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
