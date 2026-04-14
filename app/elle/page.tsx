'use client';

import { useState, useRef, useEffect } from "react";

const STORAGE_PROFILE = "elle-profile";
const STORAGE_SUMMARY = "elle-summary";

function safeGet(key: string): string | null {
  try { return typeof window !== "undefined" ? localStorage.getItem(key) : null; }
  catch { return null; }
}
function safeSet(key: string, value: string) {
  try { if (typeof window !== "undefined") localStorage.setItem(key, value); }
  catch {}
}

const C = {
  pink:     "#E8A0BF",
  pinkD:    "#d4779f",
  purple:   "#B8A9D9",
  purpleD:  "#9B8EC4",
  ink:      "#1A1A1A",
  white:    "#FFFFFF",
  cream:    "#FBF8F4",
  paper:    "#F4EFE8",
  border:   "#ECE4D9",
  muted:    "#8a8378",
  online:   "#5ECB87",
};

const KITS = [
  "Virtual Assistant",
  "Vintage & Antique Seller",
  "Dog Walker & Pet Care",
  "Real Estate Personal Brand",
  "AI Business Kit",
];

const ELLE_OPENING = `Hi, I'm Elle — your WebElle business coach.

I'm here to help you turn your kit into a real business. And I want to remember every step of your journey.

Three quick things before we begin:

1. What's your name?
2. Which kit did you buy?
3. Your email — so I can always bring you back to where we left off. No lost progress, no starting over.

Ready when you are.`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Profile {
  name: string;
  kit: string;
  email: string;
  startDate: string;
}

async function callElle(messages: Message[], profile: Profile, summary: string): Promise<string> {
  const res = await fetch("/api/elle", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode: "chat", messages, profile, summary }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Request failed");
  return data.content as string;
}

async function callSummary(messages: Message[], profile: Profile): Promise<string> {
  const res = await fetch("/api/elle", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode: "summary", messages, profile }),
  });
  if (!res.ok) return "";
  const data = await res.json();
  return (data.content as string) || "";
}

function Avatar({ size = 36 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: `linear-gradient(135deg, ${C.pink} 0%, ${C.purple} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: C.white, fontWeight: 700,
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: Math.round(size * 0.5),
      letterSpacing: 0.5,
      boxShadow: "0 2px 6px rgba(155,142,196,0.35)",
    }}>E</div>
  );
}

function Dots() {
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "4px 2px" }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: "50%",
          background: C.purpleD, display: "inline-block",
          animation: "elleDot 1.2s infinite",
          animationDelay: `${i * 0.16}s`,
        }} />
      ))}
    </div>
  );
}

function Bubble({ msg }: { msg: Message }) {
  const isElle = msg.role === "assistant";
  return (
    <div style={{
      display: "flex",
      flexDirection: isElle ? "row" : "row-reverse",
      gap: 10, marginBottom: 14,
      alignItems: "flex-end",
      animation: "elleFadeUp 0.25s ease both",
    }}>
      {isElle && <Avatar size={32} />}
      <div style={{
        maxWidth: "78%",
        background: isElle ? C.white : C.ink,
        color: isElle ? C.ink : C.white,
        border: isElle ? `1px solid ${C.border}` : "none",
        borderRadius: isElle ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
        padding: "12px 16px",
        fontSize: 14, lineHeight: 1.6,
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: "pre-wrap",
        boxShadow: isElle ? "0 1px 2px rgba(0,0,0,0.03)" : "0 2px 6px rgba(0,0,0,0.08)",
      }}
        dangerouslySetInnerHTML={{
          __html: msg.content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\n/g, "<br/>"),
        }}
      />
    </div>
  );
}

export default function ElleCoach() {
  const [stage, setStage]         = useState<"loading" | "onboard" | "chat">("loading");
  const [step, setStep]           = useState(0);
  const [profile, setProfile]     = useState<Profile>({ name: "", kit: "", email: "", startDate: "" });
  const [summary, setSummary]     = useState("");
  const [messages, setMessages]   = useState<Message[]>([]);
  const [textInput, setTextInput] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [typing, setTyping]       = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textRef   = useRef<HTMLInputElement>(null);
  const chatRef   = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { init(); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing, step]);

  async function init() {
    const stored = safeGet(STORAGE_PROFILE);
    const storedSummary = safeGet(STORAGE_SUMMARY) || "";
    if (stored) {
      try {
        const saved: Profile = JSON.parse(stored);
        setProfile(saved);
        setSummary(storedSummary);
        setTyping(true);
        try {
          const reply = await callElle(
            [{ role: "user", content: "I am back." }],
            saved, storedSummary,
          );
          setMessages([{ role: "assistant", content: reply }]);
        } catch {
          setMessages([{ role: "assistant", content: `Welcome back, ${saved.name || "friend"}. Where did we leave off?` }]);
        }
        setTyping(false);
        setStage("chat");
        return;
      } catch {}
    }
    setMessages([{ role: "assistant", content: ELLE_OPENING }]);
    setStage("onboard");
  }

  function submitName() {
    const name = textInput.trim();
    if (!name) return;
    setProfile(p => ({ ...p, name }));
    setTextInput("");
    setMessages(prev => [
      ...prev,
      { role: "user", content: name },
      { role: "assistant", content: `Lovely to meet you, ${name}.\n\nWhich kit did you buy?` },
    ]);
    setStep(1);
  }

  function selectKit(kit: string) {
    setProfile(p => ({ ...p, kit }));
    setMessages(prev => [
      ...prev,
      { role: "user", content: kit },
      { role: "assistant", content: `The ${kit} Kit — a strong foundation.\n\nOne last thing. What's your email? I'll send you a private link back to this conversation whenever you need it. No lost progress, no starting over.\n\nYou can skip for now if you prefer.` },
    ]);
    setStep(2);
  }

  async function submitEmail(skip = false) {
    const email = skip ? "" : textInput.trim();
    const startDate = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    const fp: Profile = { ...profile, email, startDate };
    setProfile(fp);
    setTextInput("");
    safeSet(STORAGE_PROFILE, JSON.stringify(fp));
    const ack = skip ? "No problem — you can add it any time." : `Perfect. I'll remember you, ${fp.name}.`;
    setMessages(prev => [...prev, { role: "user", content: skip ? "Skip for now" : email }]);
    setTyping(true);
    setStage("chat");
    try {
      const reply = await callElle(
        [{ role: "user", content: `My name is ${fp.name}. I just got the ${fp.kit} kit. Where do I start?` }],
        fp, "",
      );
      setMessages(prev => [...prev, { role: "assistant", content: `${ack}\n\n${reply}` }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: `${ack}\n\nLet's start right here. Have you opened your kit yet, or is this day one?` }]);
    } finally {
      setTyping(false);
      setTimeout(() => chatRef.current?.focus(), 100);
    }
  }

  async function sendChat() {
    const text = chatInput.trim();
    if (!text || typing) return;
    const updated: Message[] = [...messages, { role: "user", content: text }];
    setMessages(updated);
    setChatInput("");
    if (chatRef.current) chatRef.current.style.height = "auto";
    setTyping(true);
    try {
      const reply = await callElle(updated, profile, summary);
      const final: Message[] = [...updated, { role: "assistant", content: reply }];
      setMessages(final);
      if (final.length >= 8 && final.length % 8 === 0) {
        callSummary(final, profile).then(s => {
          if (s) { setSummary(s); safeSet(STORAGE_SUMMARY, s); }
        });
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection issue — please try again in a moment." }]);
    } finally { setTyping(false); }
  }

  const onChatKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); }
  };
  const onTextKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (step === 0) submitName();
      else if (step === 2) submitEmail();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
        body {
          background: ${C.cream};
          background-image:
            radial-gradient(circle at 12% 18%, rgba(232,160,191,0.18), transparent 40%),
            radial-gradient(circle at 88% 82%, rgba(184,169,217,0.20), transparent 45%);
          font-family: 'DM Sans', sans-serif;
        }

        @keyframes elleDot     { 0%,80%,100% { transform:scale(.6); opacity:.35; } 40% { transform:scale(1); opacity:1; } }
        @keyframes elleFadeUp  { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes elleIn      { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes ellePulse   { 0%,100% { opacity: 1; } 50% { opacity: 0.55; } }

        .elle-pulse { animation: ellePulse 2s ease-in-out infinite; }

        .elle-kit-pill {
          background: ${C.white};
          border: 1.5px solid ${C.ink};
          color: ${C.ink};
          border-radius: 999px;
          padding: 9px 16px;
          font-size: 12px; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; letter-spacing: 0.4px;
          transition: all 0.15s ease;
          text-transform: uppercase;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .elle-kit-pill:hover {
          background: ${C.ink};
          color: ${C.white};
          transform: translateY(-1px);
        }

        .elle-input {
          width: 100%; border: 1.5px solid ${C.border};
          background: ${C.white};
          border-radius: 10px; padding: 13px 16px;
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          color: ${C.ink}; outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .elle-input:focus {
          border-color: ${C.purpleD};
          box-shadow: 0 0 0 3px rgba(155,142,196,0.18);
        }
        .elle-input::placeholder { color: #c2bbb1; }

        .elle-btn-primary {
          background: ${C.ink}; color: ${C.white};
          border: none; border-radius: 999px;
          padding: 11px 22px; font-size: 12px; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; letter-spacing: 0.6px;
          text-transform: uppercase;
          transition: background 0.15s, transform 0.15s;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .elle-btn-primary:hover { background: ${C.purpleD}; transform: translateY(-1px); }

        .elle-btn-skip {
          background: none; border: none; cursor: pointer;
          color: ${C.muted}; font-size: 12px;
          font-family: 'DM Sans', sans-serif;
          padding: 8px 0; text-decoration: underline;
          transition: color 0.15s;
        }
        .elle-btn-skip:hover { color: ${C.ink}; }

        .elle-send {
          width: 40px; height: 40px; border-radius: 50%;
          background: ${C.ink}; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, transform 0.15s; flex-shrink: 0;
        }
        .elle-send:hover  { background: ${C.purpleD}; transform: scale(1.05); }
        .elle-send:disabled { background: #d8d2c7; cursor: default; transform: none; }

        .elle-chat-textarea {
          flex: 1; border: none; outline: none; resize: none;
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          color: ${C.ink}; background: transparent; line-height: 1.5;
          max-height: 110px; padding: 4px 0;
        }
        .elle-chat-textarea::placeholder { color: #c2bbb1; }

        .elle-input-shell {
          display: flex; align-items: flex-end; gap: 10px;
          border: 1.5px solid ${C.border};
          border-radius: 22px; padding: 8px 8px 8px 16px;
          background: ${C.white};
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .elle-input-shell:focus-within {
          border-color: ${C.purpleD};
          box-shadow: 0 0 0 3px rgba(155,142,196,0.15);
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e0d8cb; border-radius: 4px; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
      }}>
        <div style={{
          width: "100%", maxWidth: 500,
          display: "flex", flexDirection: "column",
          height: "94vh", maxHeight: 780,
          animation: "elleIn 0.4s ease both",
          background: C.cream,
          border: `1px solid ${C.border}`,
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(26,26,26,0.10), 0 4px 12px rgba(26,26,26,0.04)",
        }}>

          {/* Header */}
          <div style={{
            background: C.white,
            borderBottom: `1px solid ${C.border}`,
            padding: "16px 20px",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <Avatar size={42} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800, fontSize: 22,
                  color: C.ink, letterSpacing: 1.4,
                  textTransform: "uppercase", lineHeight: 1,
                }}>ELLE</span>
                <span style={{
                  fontSize: 11, color: C.muted,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  WebElle business coach
                </span>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 6, marginTop: 6,
              }}>
                <span className="elle-pulse" style={{
                  width: 7, height: 7, borderRadius: "50%", background: C.online,
                }} />
                <span style={{
                  fontSize: 11, color: C.muted,
                  fontFamily: "'DM Sans', sans-serif", letterSpacing: 0.2,
                }}>
                  Online{profile.name ? ` · with ${profile.name}` : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto",
            padding: "20px 18px 12px",
          }}>
            {stage === "loading" && (
              <div style={{ display: "flex", justifyContent: "center", paddingTop: 60 }}>
                <Dots />
              </div>
            )}

            {messages.map((m, i) => <Bubble key={i} msg={m} />)}

            {typing && (
              <div style={{
                display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 14,
                animation: "elleFadeUp 0.25s ease",
              }}>
                <Avatar size={32} />
                <div style={{
                  background: C.white, border: `1px solid ${C.border}`,
                  borderRadius: "4px 18px 18px 18px", padding: "12px 16px",
                }}>
                  <Dots />
                </div>
              </div>
            )}

            {/* Onboard inputs */}
            {stage === "onboard" && !typing && (
              <div style={{ animation: "elleFadeUp 0.25s ease", paddingLeft: 42, marginBottom: 8 }}>

                {step === 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 340 }}>
                    <input
                      ref={textRef}
                      className="elle-input"
                      placeholder="Type your name…"
                      value={textInput}
                      onChange={e => setTextInput(e.target.value)}
                      onKeyDown={onTextKey}
                      autoFocus
                    />
                    <button className="elle-btn-primary" onClick={submitName} style={{ alignSelf: "flex-start" }}>
                      That's me →
                    </button>
                  </div>
                )}

                {step === 1 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {KITS.map(k => (
                      <button key={k} className="elle-kit-pill" onClick={() => selectKit(k)}>
                        {k} →
                      </button>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 340 }}>
                    <input
                      ref={textRef}
                      className="elle-input"
                      placeholder="your@email.com"
                      type="email"
                      value={textInput}
                      onChange={e => setTextInput(e.target.value)}
                      onKeyDown={onTextKey}
                      autoFocus
                    />
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <button className="elle-btn-primary" onClick={() => submitEmail(false)}>
                        Save my progress →
                      </button>
                      <button className="elle-btn-skip" onClick={() => submitEmail(true)}>
                        Skip for now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Chat input */}
          <div style={{
            background: C.white, borderTop: `1px solid ${C.border}`,
            padding: "12px 14px 14px",
            opacity: stage === "chat" ? 1 : 0.45,
            pointerEvents: stage === "chat" ? "auto" : "none",
            transition: "opacity 0.3s",
          }}>
            <div className="elle-input-shell">
              <textarea
                ref={chatRef}
                className="elle-chat-textarea"
                rows={1}
                placeholder={profile.name ? `Message Elle, ${profile.name}…` : "Message Elle…"}
                value={chatInput}
                onChange={e => {
                  setChatInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 110) + "px";
                }}
                onKeyDown={onChatKey}
              />
              <button
                className="elle-send"
                onClick={sendChat}
                disabled={!chatInput.trim() || typing}
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
            <div style={{
              marginTop: 10, fontSize: 10.5,
              color: C.muted, textAlign: "center",
              fontFamily: "'DM Sans', sans-serif", letterSpacing: 1,
              textTransform: "uppercase", opacity: 0.7,
            }}>
              Elle · webelle.store · Kit buyers only
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
