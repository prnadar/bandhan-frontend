"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Send, Lock, Phone, Video, MoreHorizontal, CheckCheck } from "lucide-react";

const threadProfiles: Record<string, { name: string; photo: string; grad: string; compatibility: number; city: string }> = {
  "1": { name: "Priya Sharma",   photo: "PS", grad: "linear-gradient(135deg,#C4520F,#E8A060)", compatibility: 92, city: "Mumbai" },
  "2": { name: "Anjali Patel",   photo: "AP", grad: "linear-gradient(135deg,#9A6B00,#C89020)",  compatibility: 87, city: "Ahmedabad" },
  "3": { name: "Kavya Nair",     photo: "KN", grad: "linear-gradient(135deg,#5C7A52,#8DB870)",  compatibility: 84, city: "Bangalore" },
  "4": { name: "Shruti Agarwal", photo: "SA", grad: "linear-gradient(135deg,#C4520F99,#9A6B0099)", compatibility: 79, city: "Delhi" },
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
    <div className="h-screen flex flex-col max-w-2xl">
      {/* Header */}
      <div
        className="flex items-center gap-4 px-6 py-4 flex-shrink-0"
        style={{ background: "rgba(250,246,238,0.96)", borderBottom: "1px solid rgba(154,107,0,0.12)", backdropFilter: "blur(20px)" }}
      >
        <Link href="/messages" className="text-deep/50 hover:text-deep transition-colors" style={{ minHeight: "auto", minWidth: "auto" }}>
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-semibold text-white flex-shrink-0"
          style={{ background: profile.grad }}
        >
          {profile.photo}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-base font-semibold text-deep">{profile.name}</h2>
            <Shield className="w-3.5 h-3.5 text-sage" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage inline-block" />
            <span className="font-body text-xs text-deep/45">{profile.city} · {profile.compatibility}% match</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full flex items-center justify-center text-deep/40 hover:text-deep hover:bg-marigold/8 transition-colors" style={{ minHeight: "auto", minWidth: "auto" }}>
            <Phone className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full flex items-center justify-center text-deep/40 hover:text-deep hover:bg-marigold/8 transition-colors" style={{ minHeight: "auto", minWidth: "auto" }}>
            <Video className="w-4 h-4" />
          </button>
          <Link href={`/profile/${params.id}`} className="w-9 h-9 rounded-full flex items-center justify-center text-deep/40 hover:text-deep hover:bg-marigold/8 transition-colors" style={{ minHeight: "auto", minWidth: "auto" }}>
            <MoreHorizontal className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* E2E notice */}
      <div className="flex items-center justify-center gap-1.5 py-2 px-4" style={{ background: "rgba(92,122,82,0.06)", borderBottom: "1px solid rgba(92,122,82,0.1)" }}>
        <Lock className="w-3 h-3 text-sage" />
        <span className="font-body text-xs text-sage/80">Messages are end-to-end encrypted · Signal Protocol</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3" style={{ background: "rgba(250,246,238,0.5)" }}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[75%]">
              <div
                className="rounded-2xl px-4 py-2.5 font-body text-sm leading-relaxed"
                style={
                  msg.from === "me"
                    ? { background: "linear-gradient(135deg,#C4520F,#E06A1A)", color: "#fff", borderBottomRightRadius: "6px" }
                    : { background: "rgba(250,246,238,0.98)", color: "#1C0F06", border: "1px solid rgba(154,107,0,0.14)", borderBottomLeftRadius: "6px" }
                }
              >
                {msg.text}
              </div>
              <div className={`flex items-center gap-1 mt-1 ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                <span className="font-body text-[10px] text-deep/35">{msg.time}</span>
                {msg.from === "me" && <CheckCheck className="w-3 h-3 text-sage" />}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="px-4 py-3 flex items-center gap-3 flex-shrink-0"
        style={{ background: "rgba(250,246,238,0.96)", borderTop: "1px solid rgba(154,107,0,0.12)" }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message…"
          className="flex-1 rounded-full px-4 py-2.5 font-body text-sm text-deep placeholder-deep/35 outline-none"
          style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(154,107,0,0.18)", height: "44px" }}
        />
        <button
          onClick={send}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all flex-shrink-0"
          style={{
            background: input.trim() ? "linear-gradient(135deg,#C4520F,#E06A1A)" : "rgba(196,82,15,0.25)",
            minHeight: "auto", minWidth: "auto",
          }}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
