// index.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * Single-file React page (no external tags/CDNs).
 * Changes per your request:
 * - The HEADER is ALWAYS visible.
 * - No loading screen at all (removed image flash + references).
 * - During "Verifying Eligibility..." → scroll to top, show ONLY header + status (everything else hidden).
 * - During "Congratulations" → scroll to top, show ONLY header + congratulations (everything else hidden).
 * - After congrats, the page is locked (only the Call CTA remains interactive).
 */

export default function Chatbotdq3() {
  // ==== GLOBAL SAFETIES ====
  if (typeof window !== "undefined") {
    window._rgba_tags = window._rgba_tags || [];
    window.__nb_events = window.__nb_events || [];
  }

  // ====== State & refs ======
  const [quizQuestion, setQuizQuestion] = useState("1. Are you over the age of 64?");
  const [showStatus, setShowStatus] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [locked, setLocked] = useState(false); // lock interactions after congrats

  const [counter, setCounter] = useState(22563);
  const [claim, setClaim] = useState(72);

  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(52);
  const timerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // When status OR congrats is visible, we hide everything except the header + that block
  const hideMain = showStatus || showCongrats;

  // ====== CSS (your stylesheet + tiny additions for NB chip) ======
  const styles = `
  html {
    font-size: 0.5vw;
    font-family: Arial, Helvetica, sans-serif;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    background-image: url('./17580.jpg');
    line-height: 1.4;
  }
  .div2 img { width: 4em; }
  .div5 { display: none !important; }
  .div1 {
    background: linear-gradient(90deg, #003f91, #006cb8);
    color: white;
    text-align: center;
    padding: 0.8em;
    font-size: 1.2em;
    font-weight: 800;
    letter-spacing: 0.05em;
    width: 100%;
    border-top: 0.2em solid #1e3a8a;
  }
  .div1 > img { width: 20%; object-fit: cover; }
  .div2 {
    background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
    color: white;
    text-align: center;
    padding: 0.8em 1em;
    font-size: 2em;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    width: 100%;
    border-top: 0.15em solid #15803d;
    flex-wrap: wrap;
    word-break: break-word;
    text-align: center;
  }
  .div3 {
    width: 0.6em;
    height: 0.6em;
    background: #22c55e;
    border-radius: 50%;
    animation: pulse 1.5s ease-in-out infinite;
    box-shadow: 0 0 0.5em rgba(34, 197, 94, 0.8);
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0.5em rgba(34, 197, 94, 0.8); }
    50% { opacity: 0.7; transform: scale(1.2); box-shadow: 0 0 1em rgba(34, 197, 94, 1); }
  }
  #counter { font-weight: 800; font-style: italic; }
  .div6 { width: 100%; margin: 0; padding: 0em 20%; border-top: 0.1em solid #e5e7eb; }
  .div7 { width: 100%; margin: 0; padding: 0; }
  .div8 {
    padding: 0.5em 1em 1em 1em;
    text-align: center;
    font-size: 4.3em;
    font-weight: 900;
    color: #1f2937;
    line-height: 1.2;
  }
  .div9 {
    width: 85%;
    max-width: 100em;
    height: auto;
    display: block;
    margin: 0 auto;
    border-radius: 0.5em;
    object-fit: cover;
  }
  .div10 {
    padding: 1em 1.5em;
    text-align: center;
    font-size: 2.5em;
    font-weight: 900;
    color: #374151;
    line-height: 1.5;
  }
  .arrow-section { text-align: center; padding: 1em 0 1.5em 0; color: #6b7280; }
  .arrow-section i { font-size: 2.8em; animation: bounce 2s infinite; }
  @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-0.3em); } 60% { transform: translateY(-0.15em); } }
  .div11 { background: #f1f5f9; padding: 0.1em; width: 100%; }
  .div12 {
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    color: white; font-size: 2.3em; font-weight: 500; padding: 1em 0.5em; border-radius: 0.8em; text-align: center; margin: 0.3em;
    box-shadow: 0 0.3em 0 #16a34a; letter-spacing: 0.05em;
  }
  .div13 {
    background: #ebebeb; padding: 0.5em 1.5em 0.5em 1.5em; border-radius: 0.9em; width: 100%;
  }
  .div14 { text-align: center; padding: 0.2em 0 0.5em 0; font-size: 4.8em; font-weight: 700; color: #1f2937; }
  .div15 { display: flex; flex-direction: column; gap: 0.8em; margin-bottom: 1.2em; }
  :root { --anim-4: scaleUp 2s infinite; }
  @keyframes scaleUp { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
  .glow {
    box-shadow: 0 0 0.375rem rgba(40, 167, 69, 0.4), 0 0 0.625rem rgba(40, 167, 69, 0.2);
  }
  .shimmer { position: relative; overflow: hidden; }
  .shimmer::before {
    content: "";
    position: absolute; top: 0; left: -75%; width: 50%; height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: shimmer 2s infinite;
  }
  @keyframes shimmer { 0% { left: -75%; } 100% { left: 125%; } }
  .div16 {
    background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
    color: white; padding: 1em; border-radius: 2.5em; text-align: center; font-size: 2.8em; font-weight: 700;
    cursor: pointer; border: none; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 0.3em 0.6em rgba(22, 163, 74, 0.3);
    animation: scaleUp 2s infinite; max-width: 95%; width: 100%; margin: 0.3em auto; transition: all 0.3s ease;
  }
  .div16:hover { transform: translateY(-0.1em); box-shadow: 0 0.4em 0.8em rgba(22, 163, 74, 0.4); background: linear-gradient(135deg, #15803d 0%, #16a34a 100%); }
  .div16:active { transform: translateY(0); box-shadow: 0 0.2em 0.4em rgba(22, 163, 74, 0.3); }
  .div17 { display: flex; align-items: center; justify-content: center; gap: 0.5em; font-size: 2.3em; color: #374151; font-weight: 600; }
  .div18 {
    width: 0.5em; height: 0.5em; background: #22c55e; border-radius: 50%;
    animation: pulse 1.5s ease-in-out infinite; box-shadow: 0 0 0.3em rgba(34, 197, 94, 0.8);
  }
  #claim { color: #16a34a; font-weight: 800; }
  .div4 {
    background: #e9f2ff; color: #1f2937; text-align: center; padding: 3em 1em; margin: 3em 18%;
    font-size: 1.2em; font-weight: 700; border-top: 0.2em solid #2196f3;
  }
  #statusMessage { font-size: 2.5em; }
  #congratulations.div4 { margin: 3em 18%; background: #e3f2fd; border-top: 0.2em solid #2196f3; }
  .div19 { color: rgb(34 197 94); text-align: center; font-size: 3em; font-weight: 700; margin-bottom: 0.3em; }
  .div20 {
    background: rgb(254 240 138);
    text-align: center; font-size: 3em; font-weight: 200; margin: 0.2em 1em; line-height: 1.5; padding: 0.08em;
  }
  .div20 span { font-weight: 700; }
  .div21 {
    background: rgb(253 224 71); color: #1f2937; text-align: center; font-size: 2.5em; font-weight: 700;
    padding: 0.7em 1.2em; border-radius: 0.5em; width: max-content; display: inline-block; margin-top: 0.5em;
  }
  .div22 {
    background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
    color: white; text-align: center; font-size: 3.5em; font-weight: 700; padding: 1.2em; border-radius: 0.8em; margin: 1em 1em;
    cursor: pointer; transition: all 0.3s ease; box-shadow: 0 0.4em 0.8em rgba(22, 163, 74, 0.3);
    text-decoration: none; display: block; animation: glow 1.5s ease-in-out infinite;
  }
  @keyframes glow {
    0%, 100% { opacity: 1; box-shadow: 0 0 0.5em rgba(34, 197, 94, 0.8); }
    50% { opacity: 0.8; box-shadow: 0 0 1em rgba(34, 197, 94, 1); }
  }
  .div22 a { color: inherit; text-decoration: none; }
  .div22:hover { transform: translateY(-0.1em); box-shadow: 0 0.5em 1em rgba(22, 163, 74, 0.4); }
  .div23 { text-align: center; font-size: 1.9em; color: #374151; margin: 1.5em 1em; line-height: 1.4; font-weight: 500; }
  .div24 {
    display: flex; justify-content: center; align-items: center; gap: 0.1em; font-size: 2.2em; font-weight: 900; color: #dc2626;
    border: 0.08em dashed #dc2626; margin: 1.5em 0; width: fit-content; margin: 0 auto; padding: 0.2em 0.35em;
  }
  .div25 {
    background: transparent; border-radius: 0.15em; text-align: center; color: #dc2626;
    font-family: Arial, Helvetica, sans-serif; font-weight: 700; font-size: 1em;
  }
  .div26 {
    color: #374151; padding: 2.5em 20%; font-size: 2em; line-height: 1.6; text-align: center; width: 100%; margin-top: 10em;
  }
  .div27 { margin: 1em 0; display: flex; justify-content: center; gap: 0.5em; flex-wrap: wrap; }
  .div27 a { color: #374151; text-decoration: none; }
  .div27 a:hover { text-decoration: underline; }
  .div99{ }
  /* NB chip */
  #nb-chip {
    position: fixed; right: 12px; bottom: 12px; z-index: 99999; padding: 8px 12px;
    font-size: 12px; font-weight: 800; border-radius: 999px; background: rgba(20, 180, 90, 0.95);
    color: #fff; box-shadow: 0 6px 20px rgba(0,0,0,0.2); display: none; pointer-events: none;
  }

  @media (max-width: 48em) {
    html { font-size: 3vw; }
    .div1 { font-size: 0.5em; }
    .div1 > img { width: 60%; }
    .div2 { font-size: 1em; }
    .div6 { padding: 0em 5%; }
    .div8 { font-size: 2.1em; padding: 1em 0.8em 0.8em 0.8em; }
    .div10 { font-size: 1.15em; padding: 0.8em 1em; }
    .arrow-section { font-size: 1em; }
    .arrow-section i { font-size: 2.6em; }
    .div12 { font-size: 1.1em; }
    .div13 { padding: 0.4em 1em 1em 1em; }
    .div14 { font-size: 1.6em; padding: 0.4em 0 0.8em 0; }
    .div16 { font-size: 1.5em; padding: 0.8em; }
    .div17 { font-size: 1.1em; }
    .div15 { gap: 0.6em; }
    .div4 { font-size: 1em; padding: 1.5em 0.5em; margin: 1em 5%; }
    #statusMessage { font-size: 1.5em; }
    #congratulations.div4 { margin: 1em 5%; }
    .div19 { font-size: 1.8em; }
    .div20 { font-size: 1.7em; margin-top: 0.7em; }
    .div21 { font-size: 1.5em; margin: 0.5em 0.1em; }
    .div22 { font-size: 2em; }
    .div23 { font-size: 1.5em; }
    .div24 { font-size: 2em; }
    .div26 { font-size: 1.1em; padding: 1em 5%; }
  }
  @media (max-width: 30em) {
    html { font-size: 3vw; }
    .div8 { padding: 0.8em 0.6em; }
    .div10 { font-size: 1.2em; padding: 0.6em 0.1em; }
    .div12 { font-size: 1.1em; }
    .div13 { padding: 0.3em 0.8em 0.8em 0.8em; }
    .div14 { font-size: 2em; padding: 0.5em 0; }
    .div16 { font-size: 2.2em; padding: 0.7em; }
    .div1 { font-size: 1em; padding: 0.5em; }
  }
  @media (max-width: 20em) {
    html { font-size: 3vw; }
    .div8 { font-size: 1.5em; padding: 0.6em 0.4em; }
    .div10 { font-size: 1.2em; padding: 0.5em 0.6em; }
    .div16 { font-size: 1.3em; padding: 0.6em; }
    .div13 { padding: 0.2em 0.6em 0.6em 0.6em; }
    .div15 { gap: 0.4em; }
    .div24 { font-size: 1.5em; }
  }
  @media (max-width: 10em) {
    html { font-size: 3.5vw; }
    .div8 { font-size: 1.5em; padding: 0.4em 0.3em; }
    .div10 { font-size: 1em; padding: 0.4em 0.5em; }
    .div12 { font-size: 0.9em; }
    .div13 { padding: 0.2em 0.4em 0.5em 0.4em; }
    .div14 { font-size: 1.2em; padding: 0.6em 0; }
    .div15 { gap: 0.3em; }
    .div16 { font-size: 1em; padding: 0.5em; border-radius: 1.5em; }
    .div1 { font-size: 0.8em; padding: 0.6em; }
    .div2 { font-size: 0.7em; padding: 0.5em 1em; }
    .div16 { font-size: 1.3em; }
    .div22 { font-size: 1.5em; }
    .div24 { font-size: 1.2em; }
    .div25 { padding: 0.2em 0.3em; min-width: 0.8em; }
  }
  `;

  // ====== Utilities ======
  function scrollTopNow() {
    // Instant jump to top for status/congrats
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function smoothScrollToTop(duration, targetPosition = 0) {
    if (locked || hideMain) return; // disable while status/congrats or locked
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (!locked && !hideMain && timeElapsed < duration) requestAnimationFrame(animation);
    }
    requestAnimationFrame(animation);
  }

  const showNbChip = (text) => {
    const el = document.getElementById("nb-chip");
    if (!el) return;
    el.textContent = text;
    el.style.display = "inline-block";
    clearTimeout(window.__nb_chip_to);
    window.__nb_chip_to = setTimeout(() => (el.style.display = "none"), 2000);
  };

  // NB raw_call (kept active always)
  const fireNbRawCall = () => {
    try {
      const evt = { event: "raw_call", at: new Date().toISOString() };
      window.__nb_events.push(evt);
      console.log("[NB Pixel] Firing raw_call", evt);
      if (typeof window.nbpix === "function") {
        window.nbpix("event", "raw_call");
      } else {
        window.__nb_fallback_queue = window.__nb_fallback_queue || [];
        window.__nb_fallback_queue.push(["event", "raw_call"]);
      }
      showNbChip("NB: raw_call sent");
    } catch (e) {
      console.warn("[NB Pixel] raw_call fire failed", e);
    }
  };

  // Ringba queue-only (no external script)
  const RINGBA_AGE_KEY = "age"; // change to 'Age' if needed
  const rbAge = (value) => {
    if (locked || hideMain) return; // stop pushes during/after status/congrats
    try {
      const tag = {};
      tag[RINGBA_AGE_KEY] = value;
      window._rgba_tags.push(tag);
      console.log("[Ringba] pushed age:", tag, "→ _rgba_tags:", window._rgba_tags);
    } catch (e) {
      console.warn("[Ringba] age push failed", e);
    }
  };

  // ====== Counters ======
  useEffect(() => {
    const id = setInterval(() => setCounter((p) => p + (Math.floor(Math.random() * 3) + 1)), 3000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const id = setInterval(() => setClaim((p) => p + (Math.floor(Math.random() * 2) + 1)), 3000);
    return () => clearInterval(id);
  }, []);

  // Fallback flush if nbpix appears later
  useEffect(() => {
    const onLoad = () => {
      if (window.__nb_fallback_queue && typeof window.nbpix === "function") {
        window.__nb_fallback_queue.forEach((args) => {
          try { window.nbpix.apply(null, args); } catch {}
        });
        window.__nb_fallback_queue.length = 0;
      }
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // ====== Flow ======
  const setYesNoOptions = () => setQuizQuestion("2. Are you a U.S. Citizen?");

  const handleQuizP = (ageValue) => {
    if (locked || hideMain) return;
    if (ageValue) rbAge(ageValue);
    if (quizQuestion === "1. Are you over the age of 64?") {
      setYesNoOptions();
      smoothScrollToTop(1000, 432);
    } else {
      stepProcess("yes");
    }
  };

  const handleQuizN = (ageValue) => {
    if (locked || hideMain) return;
    if (ageValue) rbAge(ageValue);
    if (quizQuestion === "1. Are you over the age of 64?") {
      setYesNoOptions();
      smoothScrollToTop(1000, 632);
    } else {
      stepProcess("no");
    }
  };

  const stepProcess = () => {
    if (locked || hideMain) return;
    // Show STATUS at the top, hide everything except header
    setShowStatus(true);
    scrollTopNow();

    // Update status messages
    const statusMessage = () => document.getElementById("statusMessage");
    setTimeout(() => {
      if (statusMessage()) statusMessage().textContent = "Verifying Availability...";
      setTimeout(() => {
        if (statusMessage()) statusMessage().textContent = "Confirming Eligibility...";
        setTimeout(() => showCongratulations(), 1500);
      }, 1500);
    }, 1500);
  };

  const showCongratulations = () => {
    if (locked) return; // avoid duplicate
    // Hide status, show CONGRATS at the top, keep header
    setShowStatus(false);
    setShowCongrats(true);
    setLocked(true);
    scrollTopNow();
    startTimer();
  };

  const startTimer = () => {
    let totalSeconds = 172;
    if (timerRef.current) clearInterval(timerRef.current);
    setMinutes(Math.floor(totalSeconds / 60));
    setSeconds(totalSeconds % 60);
    timerRef.current = setInterval(() => {
      totalSeconds -= 1;
      const m = Math.floor(totalSeconds / 60);
      const s = totalSeconds % 60;
      setMinutes(m);
      setSeconds(s < 10 ? `0${s}` : s);
      if (totalSeconds < 0) clearInterval(timerRef.current);
    }, 1000);
  };

  useEffect(() => () => timerRef.current && clearInterval(timerRef.current), []);

  // ====== Render ======
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* HEADER — always visible */}
      <div
        className="div1"
        onClick={() => smoothScrollToTop(1000, 432)}
        style={{ cursor: hideMain ? "default" : "pointer" }}
      >
        <p style={{ fontSize: "1.3em", margin: 0 }}>Boost Benefits Hub</p>
      </div>

      {/* Live counter — hidden when status OR congrats */}
      <div
        className={`div2 ${hideMain ? "div5" : ""}`}
        onClick={() => smoothScrollToTop(1000, 432)}
        style={{ cursor: hideMain ? "default" : "pointer" }}
      >
        <span className="div3" aria-hidden="true" />
        <span>
          <strong id="counter">{counter.toLocaleString()}</strong> Seniors Enrolled In Last 24 Hours!
        </span>
      </div>

      {/* Hero / Quiz — hidden when status OR congrats */}
      <div className={`div6 ${hideMain ? "div5" : ""}`}>
        <div className="div7">
          <div
            className="div8"
            onClick={() => smoothScrollToTop(1000, 432)}
            style={{ cursor: hideMain ? "default" : "pointer" }}
          >
            Final Call For Seniors Over 64 To Claim Their Spending Allowance Card Worth Thousands!
          </div>

          {/* Placeholder image (replace with your asset if needed) */}
          <img
            className="div9"
            src="./card.png"
            // src="data:image/svg+xml;utf8,<?xml version='1.0'?><svg xmlns='http://www.w3.org/2000/svg' width='1000' height='420'><rect width='100%' height='100%' fill='%23e9f5ee'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2377a' font-size='42'>Your Image Here</text></svg>"
            alt="Hero"
            onClick={() => smoothScrollToTop(1000, 432)}
            style={{ cursor: hideMain ? "default" : "pointer" }}
          />

          <div className="div10">
            Checking your eligibility is very simple and takes just 60 seconds, simply answer the questions below to see if you qualify now.
          </div>

          <div className="arrow-section" title="Scroll for questions">⬇️</div>

          <div className="div11">
            <div className="div12">Answer The Question Below To Proceed:</div>
          </div>
        </div>

        <div className="div13">
          <div className="div14">
            <span id="quizQuestion">
              {quizQuestion === "1. Are you over the age of 64?" ? "1. What's Your Age Range?" : quizQuestion}
            </span>
          </div>

          <div className="div15" id="answerOptions">
            {quizQuestion === "1. Are you over the age of 64?" ? (
              <>
                <div className="div16 glow shimmer" onClick={() => handleQuizP("Under 65")}>Under 65</div>
                <div className="div16 glow shimmer" onClick={() => handleQuizN("65-80")}>65-80</div>
                <div className="div16 glow shimmer" onClick={() => handleQuizP("Over 80")}>Over 80</div>
              </>
            ) : (
              <>
                <div className="div16 glow shimmer" onClick={() => stepProcess("yes", "Above-25K")}>Yes</div>
                <div className="div16 glow shimmer" onClick={() => stepProcess("no", "No")}>No</div>
              </>
            )}
          </div>

          <div className="div17">
            <div className="div18" />
            <span><em><span id="claim">{claim}</span> People Are Claiming Right Now!</em></span>
          </div>
        </div>
      </div>

      {/* STATUS — only visible (with header) when showStatus = true */}
      <div className={`div4 ${showStatus ? "" : "div5"}`} id="status" aria-live="polite">
        <span id="statusMessage">Reviewing Your Answers...</span>
      </div>

      {/* CONGRATULATIONS — only visible (with header) when showCongrats = true */}
      <div className={`div4 ${showCongrats ? "" : "div5"}`} id="congratulations">
        <div className="div19">Congratulations, You Qualify 🎉</div>
        <div className="div20">
          Make A <span>Quick Call</span> To Claim Your Spending Allowance Worth Thousands Now!
        </div>
        <div className="div21">Spots remaining: 4</div>
        <div className="div99"><h2 style={{ margin: 0 }}>Tap Below To Call Now! 👇</h2></div>

        {/* CTA anchor — active even after locked */}
        <a
          href="tel:+13236897861"
          id="callLink"
          className="div22 glow shimmer"
          onPointerDown={fireNbRawCall}
          onClick={fireNbRawCall}
        >
          CALL (321) 485-8035
        </a>

        <div className="div23">
          Due to high call volume, your official agent is waiting for only <strong>3 minutes</strong>, then your spot will not be reserved.
        </div>
        <div className="div24">
          <div className="div25" id="minutes">{minutes}</div>
          <div className="div25">:</div>
          <div className="div25" id="seconds">{seconds}</div>
        </div>
      </div>

      {/* Footer — hidden when status OR congrats */}
      <div className={`div26 ${hideMain ? "div5" : ""}`}>
    <img
      src={isMobile ? "./dis-mobile.png" : "./dis-desktop.png"}
      alt="Logo"
      style={{ width: "auto", marginBottom: "0.5em" }}
    />
        
                Beware of other fraudulent &amp; similar-looking websites that might look exactly like ours, we have no affiliation with them.
        This is the only official website to claim your Spending Allowance Benefit with the domain name seniorsbenefitshub.com
        <div className="div27">
          <a href="/terms.html">Terms &amp; Conditions</a> | <a href="/privacy.html">Privacy Policy</a>
        </div>
      </div>

      {/* NB chip */}
      {/* <div id="nb-chip">NB: raw_call sent</div> */}
    </>
  );
}
