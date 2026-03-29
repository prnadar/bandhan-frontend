"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Send, Lock, Phone, Video, MoreHorizontal, CheckCheck } from "lucide-react";

const threadProfiles: Record<string, { name: string; photo: string; grad: string; compatibility: number; city: string }> = {
  "1": { name: "Priya Sharma",   photo: "PS", grad: "linear-gradient(135deg,#E8426A,#E8A060)", compatibility: 92, city: "Mumbai" },
  "2": { name: "Anjali Patel",   photo: "AP", grad: "linear-gradient(135deg,#9A6B00,#C89020)",  compatibility: 87, city: "Ahmedabad" },
  "3": { name: "Kavya Nair",     photo: "KN", grad: "linear-gradient(135deg,#5C7A52,#8DB870)",  compatibility: 84, city: "Bangalore" },
  "4": { name: "Shruti Agarwal", photo: "SA", grad: "linear-gradient(135deg,#E8426A99,#9A6B0099)", compatibility: 79, city: "Delhi" },
};

const initialMessages: Record<string, { id: string; from: "me" | "them"; text: string; time: string }[]> = {
  "1": [
    { id: "1", from: "them", text: "Namaste! Thank you for sending an interest. I went through your profile and it's really impressive", time: "10:30 AM" },
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
    { id: "2", from: "them", text: "Haha yes, Delhi winters are something else", time: "Sun 11:30 AM" },
  ],
};

export default function ChatPage({ params }: { params: { id: string } }) {
  const profile = threadProfiles[params.id] || threadProfiles["1"];
  const [messages, setMessages] = useState(initialMessages[params.id] || []);
  const [input, setInput] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
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
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        maxWidth: "672px",
        background: "#fff8f8",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* -- Header -- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "16px 24px",
          flexShrink: 0,
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Back */}
        <Link
          href="/messages"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            color: "rgba(40,22,33,0.5)",
            background: "#ffe8f2",
            textDecoration: "none",
            flexShrink: 0,
            transition: "background 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "#f9dae9";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "#ffe8f2";
          }}
        >
          <ArrowLeft style={{ width: "18px", height: "18px" }} />
        </Link>

        {/* Avatar */}
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: profile.grad,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Noto Serif', serif",
            fontSize: "0.9rem",
            fontWeight: 700,
            color: "#ffffff",
            flexShrink: 0,
            boxShadow: "0 2px 10px rgba(180,0,42,0.15)",
          }}
        >
          {profile.photo}
        </div>

        {/* Name & status */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Noto Serif', serif",
                fontSize: "1.0625rem",
                fontWeight: 600,
                color: "#281621",
                margin: 0,
              }}
            >
              {profile.name}
            </h2>
            <Shield
              style={{ width: "14px", height: "14px", color: "#b4002a", flexShrink: 0 }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "1px",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 0 2px rgba(34,197,94,0.2)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.75rem",
                color: "#5c3f3f",
              }}
            >
              {profile.city} ·{" "}
              <span style={{ color: "#C89020", fontWeight: 600 }}>
                {profile.compatibility}% match
              </span>
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {[
            { icon: <Phone style={{ width: "16px", height: "16px" }} />, label: "Call" },
            { icon: <Video style={{ width: "16px", height: "16px" }} />, label: "Video" },
          ].map((btn) => (
            <button
              key={btn.label}
              aria-label={btn.label}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#ffe8f2",
                border: "none",
                color: "#5c3f3f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#f9dae9";
                (e.currentTarget as HTMLButtonElement).style.color = "#b4002a";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#ffe8f2";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "#5c3f3f";
              }}
            >
              {btn.icon}
            </button>
          ))}
          <Link
            href={`/profile/${params.id}`}
            aria-label="View profile"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#ffe8f2",
              border: "none",
              color: "#5c3f3f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              transition: "background 0.15s ease, color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "#f9dae9";
              (e.currentTarget as HTMLAnchorElement).style.color = "#b4002a";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "#ffe8f2";
              (e.currentTarget as HTMLAnchorElement).style.color =
                "#5c3f3f";
            }}
          >
            <MoreHorizontal style={{ width: "16px", height: "16px" }} />
          </Link>
        </div>
      </div>

      {/* -- E2E encryption notice -- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          padding: "8px 16px",
          background: "#ffe8f2",
          flexShrink: 0,
        }}
      >
        <Lock style={{ width: "11px", height: "11px", color: "#b4002a" }} />
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.6875rem",
            color: "rgba(180,0,42,0.65)",
          }}
        >
          Messages are end-to-end encrypted · Signal Protocol
        </span>
      </div>

      {/* -- Message list -- */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          background: "#fff0f5",
        }}
      >
        {messages.map((msg, idx) => {
          const isMe = msg.from === "me";
          // Group consecutive same-sender messages
          const prevMsg = messages[idx - 1];
          const isSameSenderAsPrev = prevMsg?.from === msg.from;

          return (
            <div
              key={msg.id}
              style={{
                display: "flex",
                justifyContent: isMe ? "flex-end" : "flex-start",
                marginTop: isSameSenderAsPrev ? "4px" : "12px",
              }}
            >
              <div style={{ maxWidth: "75%" }}>
                {/* Bubble */}
                <div
                  style={
                    isMe
                      ? {
                          background: "linear-gradient(135deg, #b4002a, #dc1e3c)",
                          color: "#ffffff",
                          borderRadius: "20px",
                          borderBottomRightRadius: "6px",
                          padding: "12px 18px",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: "0.875rem",
                          lineHeight: 1.6,
                          boxShadow: "0 4px 20px rgba(180,0,42,0.2)",
                        }
                      : {
                          background: "#fff0f5",
                          color: "#281621",
                          borderRadius: "20px",
                          borderBottomLeftRadius: "6px",
                          padding: "12px 18px",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: "0.875rem",
                          lineHeight: 1.6,
                          boxShadow: "0 4px 20px -4px rgba(0,0,0,0.05)",
                        }
                  }
                >
                  {msg.text}
                </div>

                {/* Timestamp + read receipt */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    marginTop: "4px",
                    justifyContent: isMe ? "flex-end" : "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "0.625rem",
                      color: "rgba(40,22,33,0.35)",
                    }}
                  >
                    {msg.time}
                  </span>
                  {isMe && (
                    <CheckCheck
                      style={{ width: "12px", height: "12px", color: "#b4002a" }}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* -- Input bar -- */}
      <div
        style={{
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
          background: "#ffffff",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type your message with intention..."
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          style={{
            flex: 1,
            height: "48px",
            padding: "0 18px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.875rem",
            color: "#281621",
            background: "#fff8f8",
            border: "none",
            borderRadius: "14px",
            outline: "none",
            boxShadow: inputFocused
              ? "0 0 0 2px rgba(180,0,42,0.15), 0 4px 20px rgba(180,0,42,0.08)"
              : "0 2px 8px rgba(180,0,42,0.04)",
            transition: "box-shadow 0.18s ease",
          }}
        />

        <button
          onClick={send}
          aria-label="Send message"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            border: "none",
            background: input.trim()
              ? "linear-gradient(135deg, #b4002a, #dc1e3c)"
              : "#ffe8f2",
            color: input.trim() ? "#ffffff" : "rgba(180,0,42,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: input.trim() ? "pointer" : "default",
            flexShrink: 0,
            boxShadow: input.trim() ? "0 4px 16px rgba(180,0,42,0.3)" : "none",
            transition: "background 0.18s ease, box-shadow 0.18s ease",
          }}
        >
          <Send style={{ width: "18px", height: "18px" }} />
        </button>
      </div>
    </div>
  );
}
