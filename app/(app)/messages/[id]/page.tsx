"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const threadProfiles: Record<string, { name: string; photo: string; grad: string; compatibility: number; city: string }> = {
  "1": { name: "Priya Sharma",   photo: "PS", grad: "linear-gradient(135deg,#E8426A,#E8A060)", compatibility: 92, city: "Mumbai" },
  "2": { name: "Anjali Patel",   photo: "AP", grad: "linear-gradient(135deg,#9A6B00,#C89020)",  compatibility: 87, city: "Ahmedabad" },
  "3": { name: "Kavya Nair",     photo: "KN", grad: "linear-gradient(135deg,#5C7A52,#8DB870)",  compatibility: 84, city: "Bangalore" },
  "4": { name: "Shruti Agarwal", photo: "SA", grad: "linear-gradient(135deg,#E8426A99,#9A6B0099)", compatibility: 79, city: "Delhi" },
};

const initialMessages: Record<string, { id: string; from: "me" | "them"; text: string; time: string }[]> = {
  "1": [
    { id: "1", from: "them", text: "Namaste! Thank you for sending an interest. I went through your profile and it's really impressive 😊", time: "10:30 AM" },
    { id: "2", from: "me",   text: "Namaste Priya! Thank you so much. I was genuinely impressed by your work at Google and your passion for Carnatic music.", time: "10:35 AM" },
    { id: "3", from: "them", text: "That's so kind! I saw you're into trekking too — have you done any Himalayan treks?", time: "10:38 AM" },
    { id: "4", from: "me",   text: "Yes! Done Kedarkantha and Hampta Pass. Planning Roopkund next year. Do you trek?", time: "10:40 AM" },
    { id: "5", from: "them", text: "Oh wow, Kedarkantha is on my list! I've only done Triund so far. Would love to hear more about your work — what are you building at the startup?", time: "10:42 AM" },
  ],
  "2": [
    { id: "1", from: "them", text: "Hello! I saw your profile and thought we have a lot in common. My family is from Ahmedabad, what about yours?", time: "Yesterday 6:00 PM" },
    { id: "2", from: "me",   text: "Hi Anjali! Nice to connect. My family is from Rajasthan originally, settled in Mumbai.", time: "Yesterday 6:45 PM" },
  ],
  "3": [
    { id: "1", from: "them", text: "I saw you're also into trekking — have you done Kedarkantha?", time: "Mon 3:20 PM" },
  ],
  "4": [
    { id: "1", from: "me",   text: "Hi Shruti! Lovely to connect. Delhi winters are harsh I imagine!", time: "Sun 11:10 AM" },
    { id: "2", from: "them", text: "Haha yes, Delhi winters are something else 😄", time: "Sun 11:30 AM" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Material icon helper                                               */
/* ------------------------------------------------------------------ */

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {name}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function ChatPage({ params }: { params: { id: string } }) {
  const profile = threadProfiles[params.id] || threadProfiles["1"];
  const [messages, setMessages] = useState(initialMessages[params.id] || []);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), from: "me", text: input.trim(), time: "Just now" },
    ]);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-surface font-body">
      {/* ================================================================ */}
      {/*  Main chat column                                                 */}
      {/* ================================================================ */}
      <div className="flex flex-1 flex-col min-w-0">

        {/* ── Header ── */}
        <header className="flex items-center gap-4 px-6 py-4 bg-surface-container-lowest shrink-0">
          {/* Back button */}
          <Link
            href="/messages"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest transition-colors"
            aria-label="Back to messages"
          >
            <Icon name="arrow_back" className="text-[20px]" />
          </Link>

          {/* Avatar */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center font-headline text-sm font-bold text-on-primary shrink-0"
            style={{ background: profile.grad }}
          >
            {profile.photo}
          </div>

          {/* Name and status */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-headline text-base font-semibold text-on-surface truncate">
                {profile.name}
              </h1>
              <Icon name="verified" className="text-[16px] text-primary shrink-0" />
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
              <span className="text-xs text-on-surface-variant">
                Online &middot; {profile.city} &middot;{" "}
                <span className="font-semibold text-primary">{profile.compatibility}% match</span>
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            <button
              aria-label="Voice call"
              className="flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant bg-surface-container-low hover:bg-surface-container-highest transition-colors"
            >
              <Icon name="call" className="text-[20px]" />
            </button>
            <button
              aria-label="Video call"
              className="flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant bg-surface-container-low hover:bg-surface-container-highest transition-colors"
            >
              <Icon name="videocam" className="text-[20px]" />
            </button>
            <Link
              href={`/profile/${params.id}`}
              aria-label="More options"
              className="flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant bg-surface-container-low hover:bg-surface-container-highest transition-colors"
            >
              <Icon name="more_vert" className="text-[20px]" />
            </Link>
          </div>
        </header>

        {/* ── E2E encryption notice ── */}
        <div className="flex items-center justify-center gap-1.5 py-2 bg-surface-container-low shrink-0">
          <Icon name="lock" className="text-[14px] text-primary opacity-70" />
          <span className="text-[11px] font-body text-on-surface-variant opacity-60">
            Messages are end-to-end encrypted &middot; Signal Protocol
          </span>
        </div>

        {/* ── Message list ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-1 bg-surface">
          {messages.map((msg, idx) => {
            const isMe = msg.from === "me";
            const prevMsg = messages[idx - 1];
            const isSameSenderAsPrev = prevMsg?.from === msg.from;

            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"} ${
                  isSameSenderAsPrev ? "mt-1" : "mt-3"
                }`}
              >
                <div className="max-w-[75%]">
                  {/* Bubble */}
                  <div
                    className={
                      isMe
                        ? "bg-gradient-to-br from-primary to-secondary text-on-primary rounded-t-2xl rounded-bl-2xl px-4 py-2.5 font-body text-sm leading-relaxed"
                        : "bg-surface-container-lowest text-on-surface rounded-t-2xl rounded-br-2xl px-4 py-2.5 font-body text-sm leading-relaxed"
                    }
                  >
                    {msg.text}
                  </div>

                  {/* Timestamp + read receipt */}
                  <div
                    className={`flex items-center gap-1 mt-1 ${
                      isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span className="text-xs text-on-surface-variant opacity-60">
                      {msg.time}
                    </span>
                    {isMe && (
                      <Icon name="done_all" className="text-[14px] text-primary" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* ── Input bar ── */}
        <div className="flex items-center gap-3 px-4 py-3 bg-surface-container-lowest shrink-0">
          <button
            aria-label="Attach file"
            className="flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant bg-surface-container-low hover:bg-surface-container-highest transition-colors shrink-0"
          >
            <Icon name="attach_file" className="text-[20px]" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a message..."
            className="flex-1 h-11 px-5 font-body text-sm text-on-surface bg-surface-container-low rounded-full outline-none placeholder:text-on-surface-variant placeholder:opacity-50 focus:bg-surface-container-highest transition-colors"
          />

          <button
            onClick={send}
            aria-label="Send message"
            disabled={!input.trim()}
            className={`flex items-center justify-center w-11 h-11 rounded-full shrink-0 transition-all ${
              input.trim()
                ? "bg-gradient-to-r from-primary to-primary-container text-on-primary cursor-pointer"
                : "bg-surface-container-low text-on-surface-variant opacity-40 cursor-default"
            }`}
          >
            <Icon name="send" className="text-[20px]" />
          </button>
        </div>
      </div>

      {/* ================================================================ */}
      {/*  Right-side mini profile panel (hidden on small screens)          */}
      {/* ================================================================ */}
      <aside className="hidden lg:flex w-80 flex-col bg-surface-container-lowest shrink-0 border-l border-outline-variant/30">
        {/* Profile card */}
        <div className="flex flex-col items-center pt-10 pb-6 px-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center font-headline text-2xl font-bold text-on-primary mb-4"
            style={{ background: profile.grad }}
          >
            {profile.photo}
          </div>
          <h2 className="font-headline text-lg font-semibold text-on-surface">
            {profile.name}
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">
            {profile.city}
          </p>
          <div className="flex items-center gap-1 mt-2">
            <Icon name="favorite" className="text-[16px] text-primary" />
            <span className="text-sm font-semibold text-primary">
              {profile.compatibility}% Compatible
            </span>
          </div>
        </div>

        {/* Quick info */}
        <div className="px-6 space-y-4">
          <div className="bg-surface-container-low rounded-2xl p-4 space-y-3">
            <h3 className="font-body text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              Quick Info
            </h3>
            {[
              { icon: "location_on", label: profile.city },
              { icon: "verified_user", label: "Profile Verified" },
              { icon: "shield", label: "ID Verified" },
            ].map((item) => (
              <div key={item.icon} className="flex items-center gap-3">
                <Icon name={item.icon} className="text-[18px] text-primary" />
                <span className="text-sm text-on-surface">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Shared interests */}
          <div className="bg-surface-container-low rounded-2xl p-4 space-y-3">
            <h3 className="font-body text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              Shared Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Travel", "Music", "Cooking", "Fitness"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-surface-container-highest text-on-surface-variant"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* View full profile link */}
          <Link
            href={`/profile/${params.id}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary text-sm font-semibold transition-opacity hover:opacity-90"
          >
            <Icon name="person" className="text-[18px]" />
            View Full Profile
          </Link>
        </div>
      </aside>
    </div>
  );
}
