'use client';

import { useState, useRef, useEffect } from "react";

// Set up storage API
if (typeof window !== 'undefined' && !window.storage) {
  window.storage = {
    get: async (key: string) => {
      try {
        const value = localStorage.getItem(key);
        return value ? { value } : null;
      } catch {
        return null;
      }
    },
    set: async (key: string, value: string) => {
      try {
        localStorage.setItem(key, value);
      } catch {
        // Silently fail if storage is full
      }
    },
  };
}

// ââ Brand tokens (exact webelle.store) ââââââââââââââââââââââââââââââââââââââ
const C = {
  pink:     "#E8A0BF",
  pinkD:    "#d4779f",
  purple:   "#B8A9D9",
  purpleD:  "#9B8EC4",
  black:    "#1A1A1A",
  white:    "#FFFFFF",
  offwhite: "#fafafa",
  border:   "#efefef",
  muted:    "#888",
};

const KITS = [
  "Virtual Assistant",
  "Vintage & Antique Seller",
  "Dog Walker & Pet Care",
  "Real Estate Personal Brand",
];

const ELLE_OPENING = `Hi, I am Elle â your WebElle business coach.

I am here to help you turn your kit into a real business. And I want to remember every step of your journey.

Three quick things before we begin:

What is your name?

Which kit did you buy?

And your email â so I can always bring you back to where we left off. No lost progress, no starting over.

Ready when you are.`;

// ââ System prompt âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function buildSystemPrompt(profile: any, summary: string) {
  const summaryBlock = summary
    ? `\n\nPREVIOUS SESSION SUMMARY:\n${summary}\n\nThis person is not a stranger. Reference this naturally. Pick up where you left off.`
    : "";

  return `You are Elle, the personal business coach for WebElle (webelle.store). You coach women who have purchased a WebElle starter kit.

YOUR VOICE
- Warm, direct, mentor-like. No fluff. No fake enthusiasm.
- You ask questions that force clarity. You name what the person is avoiding â kindly but without hesitation.
- Every session ends with one commitment: what will they do before you speak again.
- Use their name where it lands with weight, not as filler.
- Never open with "amazing" or "great" â respond to what was actually said.
- Scope: business building and WebElle kits only. Redirect anything outside this warmly.
- Max 250 words per response unless detail is specifically requested.
- Short paragraphs. Dashes for lists. End with one question or one next step â never both.

THE PERSON
Name: ${profile.name || "not yet given"}
Kit: ${profile.kit || "not yet given"}
Started: ${profile.startDate || "today"}
${summaryBlock}

KIT KNOWLEDGE

VIRTUAL ASSISTANT
- Services: admin, email, calendar, social media scheduling, research, data entry
- Platforms: Upwork (10 proposals/day, fixed-price first), LinkedIn, VA Facebook groups
- Rates: $25-35/hr to start, grow to $50-75/hr. Packages: 10hr/month = $300-500
- Niche early â social media VA, real estate VA, podcast VA
- Day 7: Upwork profile live. Day 10: first proposal. Day 21: first client.
- Common blocks: imposter syndrome, underpricing, not niching, waiting until "ready"

VINTAGE AND ANTIQUE SELLER
- Sourcing: thrift stores (Tue/Wed restocks), flea markets (arrive 30 min early), estate sales, Facebook Marketplace, Vinted, own home first
- Platforms: Etsy (curated, higher prices) â eBay (brand names) â FB Marketplace (furniture) â Vinted (clothing)
- Pricing: 3x markup minimum. Research: eBay sold listings, Google Lens, Etsy search
- Photography: natural light, 5 shots (front, back, detail, scale, lifestyle). Phone is enough.
- Description: WHAT + ERA + CONDITION + MEASUREMENTS + STORY
- Day 7: source 10-20 items. Day 14: Etsy live. Day 21: second platform.
- Common blocks: pricing uncertainty, overthinking photos, descriptions too short

DOG WALKER AND PET CARE
- Services: solo/group walks, pet sitting, puppy visits, cat care, daycare
- Rates: â¬15-25/walk. Four to six walks/day = â¬60-150/day
- Day one non-negotiable: public liability insurance. â¬15-30/month. Always.
- Finding clients: 50 neighborhood flyers â local Facebook groups â Nextdoor â Rover/PetBacker
- First walk free converts almost every meet-and-greet
- Daily walk report with photos = biggest retention tool
- Day 1: insurance. Week 2: 50 flyers. Week 3: first 3 paying clients.
- Common blocks: undercharging, fear of overcommitting, not asking for reviews

REAL ESTATE PERSONAL BRAND
- Define niche before anything else: first-time buyers, luxury, families, investors
- Content pillars: market updates, property showcases, buyer/seller tips, personal story, community
- Priority: Instagram #1 â LinkedIn for referrals â Google Business Profile for local search
- Reality: 3-6 months to build a real pipeline. Consistency beats perfection.
- Day 7: website and Instagram live. Day 14: 10 posts created. Day 21: 2 open houses attended.
- Tools: Canva, Coffee and Contracts, HubSpot free CRM, Later
- Common blocks: perfectionism, waiting until ready, inconsistent posting

COACHING PRINCIPLES
- Overwhelmed: find the ONE thing. Not three. One.
- Stuck: ask what they are afraid of underneath the practical question
- Win shared: acknowledge genuinely, immediately ask what is next
- Excuse made: acknowledge, redirect to what they can control right now
- Unknown specifics (tax, local law): say so, point to the right professional`;
}

async function callElle(messages: any[], profile: any, summary: string) {
  const res = await fetch("https://openrouter.io/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || ""}`,
      "HTTP-Referer": typeof window !== 'undefined' ? window.location.origin : "https://webelle.store",
    },
    body: JSON.stringify({
      model: "qwen/qwen-3.6b-plus",
      max_tokens: 1000,
      system: buildSystemPrompt(profile, summary),
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    }),
  });
  const data = await res.json();
  if (data.error) {
    console.error("OpenRouter error:", data.error);
    return "Something went wrong. Please try again.";
  }
  return data.choices?.[0]?.message?.content || "Something went wrong. Please try again.";
}

async function generateSummary(messages: any[], profile: any) {
  const res = await fetch("https://openrouter.io/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || ""}`,
      "HTTP-Referer": typeof window !== 'undefined' ? window.location.origin : "https://webelle.store",
    },
    body: JSON.stringify({
      model: "qwen/qwen-3.6b-plus",
      max_tokens: 200,
      messages: [
        {
          role: "system",
          content: "Write a 5-line coaching session summary. Third person. Be specific. Cover: who they are and which kit, what they are working on, what they committed to, what they are struggling with, which day/stage they are at. No fluff."
        },
        {
          role: "user",
          content: messages.map(m => `${m.role === "assistant" ? "Elle" : "Client"}: ${m.content}`).join("\n\n")
        }
      ],
    }),
  });
  const data = await res.json();
  if (data.error) {
    console.error("OpenRouter error:", data.error);
    return "";
  }
  return data.choices?.[0]?.message?.content || "";
}

// ââ Typing dots âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function Dots() {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "2px 0" }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 5, height: 5, borderRadius: "50%",
          background: C.purple, display: "inline-block",
          animation: "elleDot 1.2s infinite",
          animationDelay: `${i * 0.16}s`,
        }} />
      ))}
    </div>
  );
}

// ââ Message bubble ââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function Bubble({ msg }: { msg: any }) {
  const isElle = msg.role === "assistant";
  return (
    <div style={{
      display: "flex",
      flexDirection: isElle ? "row" : "row-reverse",
      gap: 10, marginBottom: 14,
      alignItems: "flex-end",
      animation: "elleFadeUp 0.25s ease both",
    }}>
      {isElle && (
        <div style={{
          width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
          background: C.black,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, fontWeight: 700, color: C.white,
          fontFamily: "'Barlow Condensed', sans-serif",
          letterSpacing: 1, textTransform: "uppercase",
        }}>E</div>
      )}
      <div style={{
        maxWidth: "76%",
        background: isElle ? C.white : C.black,
        color: isElle ? C.black : C.white,
        border: isElle ? `1px solid ${C.border}` : "none",
        borderRadius: isElle ? "2px 14px 14px 14px" : "14px 2px 14px 14px",
        padding: "11px 15px",
        fontSize: 13.5, lineHeight: 1.72,
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: "pre-wrap",
      }}
        dangerouslySetInnerHTML={{
          __html: msg.content
            .replace(/\*\*(.*?)\*\*/g, `<strong>$1</strong>`)
            .replace(/\n/g, "<br/>"),
        }}
      />
    </div>
  );
}

// ââ Main ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
export default function ElleCoach() {
  const [stage, setStage]             = useState("loading");
  const [step, setStep]               = useState(0); // 0=name 1=kit 2=email
  const [profile, setProfile]         = useState({ name: "", kit: "", email: "", startDate: "" });
  const [summary, setSummary]         = useState("");
  const [messages, setMessages]       = useState<any[]>([]);
  const [textInput, setTextInput]     = useState("");
  const [chatInput, setChatInput]     = useState("");
  const [typing, setTyping]           = useState(false);
  const bottomRef    = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLInputElement>(null);
  const chatRef      = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { init(); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing, step]);

  async function init() {
    try {
      const pr = await window.storage.get("elle-profile");
      const sr = await window.storage.get("elle-summary");
      if (pr?.value) {
        const saved = JSON.parse(pr.value);
        setProfile(saved);
        setSummary(sr?.value || "");
        setTyping(true);
        const reply = await callElle(
          [{ role: "user", content: "I am back." }],
          saved, sr?.value || ""
        );
        setMessages([{ role: "assistant", content: reply }]);
        setTyping(false);
        setStage("chat");
      } else {
        setMessages([{ role: "assistant", content: ELLE_OPENING }]);
        setStage("onboard");
      }
    } catch {
      setMessages([{ role: "assistant", content: ELLE_OPENING }]);
      setStage("onboard");
    }
  }

  // ââ Onboarding steps âââââââââââââââââââââââââââââââââââââââââââââââââââ
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
      { role: "assistant", content: `The ${kit} Kit â a strong foundation.\n\nOne last thing. What is your email? I will send you a private link back to this conversation whenever you need it. No lost progress, no starting over.\n\nYou can skip for now if you prefer.` },
    ]);
    setStep(2);
  }

  async function submitEmail(skip = false) {
    const email = skip ? "" : textInput.trim();
    const startDate = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    const fp = { ...profile, email, startDate };
    setProfile(fp);
    setTextInput("");
    try { await window.storage.set("elle-profile", JSON.stringify(fp)); } catch {}
    const ack = skip ? "No problem â you can add it any time." : `Perfect. I will remember you, ${fp.name}.`;
    setMessages(prev => [...prev, { role: "user", content: skip ? "Skip for now" : email }]);
    setTyping(true);
    setStage("chat");
    try {
      const reply = await callElle(
        [{ role: "user", content: `My name is ${fp.name}. I just got the ${fp.kit} kit. Where do I start?` }],
        fp, ""
      );
      setMessages(prev => [...prev, { role: "assistant", content: `${ack}\n\n${reply}` }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: `${ack}\n\nLet us start right here. Have you opened your kit yet, or is this day one?` }]);
    } finally {
      setTyping(false);
      setTimeout(() => chatRef.current?.focus(), 100);
    }
  }

  // ââ Chat âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  async function sendChat() {
    const text = chatInput.trim();
    if (!text || typing) return;
    const updated = [...messages, { role: "user", content: text }];
    setMessages(updated);
    setChatInput("");
    setTyping(true);
    try {
      const reply = await callElle(updated, profile, summary);
      const final = [...updated, { role: "assistant", content: reply }];
      setMessages(final);
      if (final.length >= 8 && final.length % 8 === 0) {
        generateSummary(final, profile).then(async s => {
          if (s) { setSummary(s); try { await window.storage.set("elle-summary", s); } catch {} }
        });
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection issue â please try again." }]);
    } finally { setTyping(false); }
  }

  const onChatKey = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); } };
  const onTextKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (step === 0) submitName();
      else if (step === 2) submitEmail();
    }
  };

  // ââ Render âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.offwhite}; }

        @keyframes elleDot     { 0%,80%,100% { transform:scale(.7); opacity:.4; } 40% { transform:scale(1); opacity:1; } }
        @keyframes elleFadeUp  { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes elleIn      { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }

        .elle-kit-pill {
          background: ${C.white};
          border: 1.5px solid ${C.black};
          color: ${C.black};
          border-radius: 2px;
          padding: 9px 16px;
          font-size: 12px; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; letter-spacing: 0.3px;
          transition: all 0.15s ease;
          text-transform: uppercase;
        }
        .elle-kit-pill:hover {
          background: ${C.black};
          color: ${C.white};
        }

        .elle-input {
          width: 100%; border: 1.5px solid ${C.border};
          background: ${C.white};
          border-radius: 2px; padding: 12px 14px;
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          color: ${C.black}; outline: none;
          transition: border-color 0.15s;
        }
        .elle-input:focus { border-color: ${C.black}; }
        .elle-input::placeholder { color: #bbb; }

        .elle-btn-primary {
          background: ${C.black}; color: ${C.white};
          border: none; border-radius: 2px;
          padding: 11px 22px; font-size: 12px; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; letter-spacing: 0.5px;
          text-transform: uppercase;
          transition: background 0.15s;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .elle-btn-primary:hover { background: ${C.purpleD}; }

        .elle-btn-skip {
          background: none; border: none; cursor: pointer;
          color: #bbb; font-size: 12px;
          font-family: 'DM Sans', sans-serif;
          padding: 8px 0; text-decoration: underline;
          transition: color 0.15s;
        }
        .elle-btn-skip:hover { color: #888; }

        .elle-send {
          width: 36px; height: 36px; border-radius: 2px;
          background: ${C.black}; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s; flex-shrink: 0;
        }
        .elle-send:hover  { background: ${C.purpleD}; }
        .elle-send:disabled { background: #ddd; cursor: default; }

        .elle-chat-textarea {
          flex: 1; border: none; outline: none; resize: none;
          font-family: 'DM Sans', sans-serif; font-size: 13.5px;
          color: ${C.black}; background: transparent; line-height: 1.5;
          max-height: 96px;
        }
        .elle-chat-textarea::placeholder { color: #bbb; }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e8e8e8; border-radius: 4px; }
      `}</style>

      <div style={{
        minHeight: "100vh", background: C.offwhite,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
      }}>
        <div style={{
          width: "100%", maxWidth: 480,
          display: "flex", flexDirection: "column",
          height: "92vh", maxHeight: 740,
          animation: "elleIn 0.35s ease both",
          border: `1px solid ${C.border}`,
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.07)",
        }}>

          {/* ââ Header ââ */}
          <div style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
            {/* Top bar */}
            <div style={{
              padding: "16px 20px 14px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800, fontSize: 26,
                    color: C.black, letterSpacing: 1.5,
                    textTransform: "uppercase", lineHeight: 1,
                  }}>ELLE</span>
                  <span style={{
                    background: C.purple, color: C.white,
                    fontSize: 9, fontWeight: 700, letterSpacing: 1,
                    padding: "3px 9px", borderRadius: 2,
                    textTransform: "uppercase",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>KIT EXCLUSIVE</span>
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11.5, color: C.muted, marginTop: 2, letterSpacing: 0.2,
                }}>
                  Your WebElle business coach
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "flex-end" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#5ee77a" }} />
                  <span style={{ fontSize: 11, color: C.muted, fontFamily: "'DM Sans', sans-serif" }}>Online</span>
                </div>
                {profile.name && (
                  <div style={{ fontSize: 11, color: C.purple, fontFamily: "'DM Sans', sans-serif", marginTop: 2, fontWeight: 500 }}>
                    {profile.name} â
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ââ Messages ââ */}
          <div style={{
            flex: 1, overflowY: "auto",
            background: C.offwhite, padding: "18px 16px 10px",
          }}>

            {stage === "loading" && (
              <div style={{ display: "flex", justifyContent: "center", paddingTop: 40 }}>
                <Dots />
              </div>
            )}

            {messages.map((m, i) => <Bubble key={i} msg={m} />)}

            {/* Typing */}
            {typing && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 14, animation: "elleFadeUp 0.25s ease" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  background: C.black, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, color: C.white,
                  fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1,
                }}>E</div>
                <div style={{
                  background: C.white, border: `1px solid ${C.border}`,
                  borderRadius: "2px 14px 14px 14px", padding: "11px 15px",
                }}>
                  <Dots />
                </div>
              </div>
            )}

            {/* Onboard inputs */}
            {stage === "onboard" && !typing && (
              <div style={{ animation: "elleFadeUp 0.25s ease", paddingLeft: 38, marginBottom: 8 }}>

                {step === 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 320 }}>
                    <input
                      ref={textRef}
                      className="elle-input"
                      placeholder="My name is..."
                      value={textInput}
                      onChange={e => setTextInput(e.target.value)}
                      onKeyDown={onTextKey}
                      autoFocus
                    />
                    <button className="elle-btn-primary" onClick={submitName} style={{ alignSelf: "flex-start" }}>
                      â That is me
                    </button>
                  </div>
                )}

                {step === 1 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {KITS.map(k => (
                      <button key={k} className="elle-kit-pill" onClick={() => selectKit(k)}>
                        â {k}
                      </button>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 320 }}>
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
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <button className="elle-btn-primary" onClick={() => submitEmail(false)}>
                        â Save my progress
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

          {/* ââ Chat input ââ */}
          <div style={{
            background: C.white, borderTop: `1px solid ${C.border}`,
            padding: "12px 14px 13px",
            opacity: stage === "chat" ? 1 : 0,
            pointerEvents: stage === "chat" ? "auto" : "none",
            transition: "opacity 0.3s",
          }}>
            <div style={{
              display: "flex", alignItems: "flex-end", gap: 8,
              border: `1.5px solid ${C.border}`,
              borderRadius: 2, padding: "9px 12px",
              background: C.offwhite,
              transition: "border-color 0.15s",
            }}>
              <textarea
                ref={chatRef}
                className="elle-chat-textarea"
                rows={1}
                placeholder={profile.name ? `Ask Elle anything, ${profile.name}...` : "Ask Elle anything..."}
                value={chatInput}
                onChange={e => {
                  setChatInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 96) + "px";
                }}
                onKeyDown={onChatKey}
              />
              <button
                className="elle-send"
                onClick={sendChat}
                disabled={!chatInput.trim() || typing}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
            <div style={{
              marginTop: 8, fontSize: 10.5,
              color: "#ccc", textAlign: "center",
              fontFamily: "'DM Sans', sans-serif", letterSpacing: 0.3,
            }}>
              ELLE â WEBELLE.STORE â KIT BUYERS ONLY
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
