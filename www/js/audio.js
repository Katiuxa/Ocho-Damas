/* SFX only (piece taps). Background music is off until a later pass. */
(function () {
  "use strict";

  var sfxOn = localStorage.getItem("ochodamas.sfx.v2") !== "0";
  var ctx = null;

  function ensureCtx() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) ctx = new AC();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function syncButtons() {
    var sfxOnIcon =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
    var sfxOffIcon =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.5 12A4.5 4.5 0 0 0 14 8.7v2.04l2.45 2.45c.03-.2.05-.4.05-.59zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12c0-4.28-3-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a9 9 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/></svg>';
    document.querySelectorAll("[data-audio-btn='sfx']").forEach(function (s) {
      s.classList.toggle("off", !sfxOn);
      s.setAttribute("aria-pressed", sfxOn ? "true" : "false");
      s.innerHTML = sfxOn ? sfxOnIcon : sfxOffIcon;
    });
  }

  window.OchoDamasAudio = {
    unlock: ensureCtx,
    onGameplay: ensureCtx,
    isMusicOn: function () { return false; },
    isSfxOn: function () { return sfxOn; },
    toggleMusic: function () { return false; },
    toggleSfx: function () {
      ensureCtx();
      sfxOn = !sfxOn;
      localStorage.setItem("ochodamas.sfx.v2", sfxOn ? "1" : "0");
      syncButtons();
      if (sfxOn) this.playMove();
      return sfxOn;
    },
    playMove: function () {
      if (!sfxOn) {
        try { if (navigator.vibrate) navigator.vibrate(10); } catch (e) {}
        return;
      }
      var c = ensureCtx();
      if (!c) return;
      var t = c.currentTime;
      var o = c.createOscillator();
      var g = c.createGain();
      o.type = "triangle";
      o.frequency.value = 760;
      g.gain.setValueAtTime(0.09, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      o.connect(g);
      g.connect(c.destination);
      o.start(t);
      o.stop(t + 0.13);
      try { if (navigator.vibrate) navigator.vibrate(12); } catch (e2) {}
    },
    pause: function () {},
    resume: function () { syncButtons(); },
    syncButtons: syncButtons
  };

  function bind() {
    syncButtons();
    document.querySelectorAll("[data-audio-btn='sfx']").forEach(function (s) {
      s.addEventListener("click", function () { window.OchoDamasAudio.toggleSfx(); });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
