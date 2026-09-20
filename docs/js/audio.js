/* Soft puzzle/chess ambient music + move SFX (Web Audio, no files). */
(function () {
  "use strict";

  var musicOn = localStorage.getItem("ochodamas.music") !== "0";
  var sfxOn = localStorage.getItem("ochodamas.sfx") !== "0";
  var ctx = null;
  var master = null;
  var musicGain = null;
  var musicTimer = null;
  var started = false;
  var step = 0;

  function ensureCtx() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 1;
      master.connect(ctx.destination);
      musicGain = ctx.createGain();
      musicGain.gain.value = musicOn ? 0.085 : 0;
      musicGain.connect(master);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(freq, when, dur, type, gainNode, vol) {
    if (!ctx || !gainNode) return;
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(freq, when);
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(vol, when + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    o.connect(g);
    g.connect(gainNode);
    o.start(when);
    o.stop(when + dur + 0.02);
  }

  // Gentle café-puzzle progression (Am – F – C – G), soft pad + plucked notes.
  var CHORDS = [
    [220.0, 261.63, 329.63],
    [174.61, 220.0, 261.63],
    [130.81, 164.81, 196.0],
    [196.0, 246.94, 293.66]
  ];
  var MELODY = [329.63, 349.23, 392.0, 440.0, 392.0, 349.23, 329.63, 293.66];

  function scheduleBar() {
    if (!ctx || !musicOn) return;
    var t0 = ctx.currentTime + 0.02;
    var chord = CHORDS[step % CHORDS.length];
    var i;
    for (i = 0; i < chord.length; i++) {
      tone(chord[i], t0, 3.4, "sine", musicGain, 0.045);
      tone(chord[i] * 0.5, t0, 3.4, "triangle", musicGain, 0.025);
    }
    for (i = 0; i < 8; i++) {
      var f = MELODY[(step * 2 + i) % MELODY.length];
      tone(f, t0 + i * 0.42, 0.38, "triangle", musicGain, 0.035);
    }
    step += 1;
  }

  function startLoop() {
    if (musicTimer) return;
    scheduleBar();
    musicTimer = setInterval(scheduleBar, 3400);
  }

  function stopLoop() {
    if (musicTimer) {
      clearInterval(musicTimer);
      musicTimer = null;
    }
  }

  function applyMusicGain(on) {
    if (!musicGain || !ctx) return;
    var now = ctx.currentTime;
    musicGain.gain.cancelScheduledValues(now);
    musicGain.gain.setValueAtTime(musicGain.gain.value, now);
    musicGain.gain.linearRampToValueAtTime(on ? 0.085 : 0, now + 0.25);
  }

  function syncButtons() {
    // Classic Material music note + speaker (solid fills only).
    var musicIconOn =
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path fill="currentColor" d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>' +
      "</svg>";
    var musicIconOff =
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path fill="currentColor" d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>' +
      '<path fill="currentColor" d="M3.2 5.1 18.9 18.9l-1.2 1.3L2 6.4z"/>' +
      "</svg>";
    var sfxIconOn =
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8.7v6.6a4.5 4.5 0 0 0 2.5-3.3zM14 3.2v2.1a8 8 0 0 1 0 13.4v2.1a10 10 0 0 0 0-17.6z"/>' +
      "</svg>";
    var sfxIconOff =
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3z"/>' +
      '<path fill="currentColor" d="M3.2 5.1 18.9 18.9l-1.2 1.3L2 6.4z"/>' +
      "</svg>";
    document.querySelectorAll("[data-audio-btn='music']").forEach(function (m) {
      m.classList.toggle("off", !musicOn);
      m.setAttribute("aria-pressed", musicOn ? "true" : "false");
      m.innerHTML = musicOn ? musicIconOn : musicIconOff;
    });
    document.querySelectorAll("[data-audio-btn='sfx']").forEach(function (s) {
      s.classList.toggle("off", !sfxOn);
      s.setAttribute("aria-pressed", sfxOn ? "true" : "false");
      s.innerHTML = sfxOn ? sfxIconOn : sfxIconOff;
    });
  }

  function unlock() {
    if (!ensureCtx()) return;
    started = true;
    if (musicOn) startLoop();
  }

  window.OchoDamasAudio = {
    unlock: unlock,
    isMusicOn: function () { return musicOn; },
    isSfxOn: function () { return sfxOn; },
    toggleMusic: function () {
      unlock();
      musicOn = !musicOn;
      localStorage.setItem("ochodamas.music", musicOn ? "1" : "0");
      applyMusicGain(musicOn);
      if (musicOn) startLoop();
      else stopLoop();
      syncButtons();
      return musicOn;
    },
    toggleSfx: function () {
      unlock();
      sfxOn = !sfxOn;
      localStorage.setItem("ochodamas.sfx", sfxOn ? "1" : "0");
      syncButtons();
      if (sfxOn) this.playMove();
      return sfxOn;
    },
    playMove: function () {
      if (!sfxOn) {
        try { if (navigator.vibrate) navigator.vibrate(10); } catch (e) {}
        return;
      }
      if (!ensureCtx()) return;
      var t = ctx.currentTime;
      var sfx = ctx.createGain();
      sfx.connect(master);
      tone(760, t, 0.1, "triangle", sfx, 0.07);
      try { if (navigator.vibrate) navigator.vibrate(12); } catch (e2) {}
    },
    pause: function () {
      stopLoop();
      if (ctx && ctx.state === "running") ctx.suspend().catch(function () {});
    },
    resume: function () {
      if (!musicOn) return;
      ensureCtx();
      if (ctx) ctx.resume().catch(function () {});
      startLoop();
    },
    syncButtons: syncButtons
  };

  function bind() {
    syncButtons();
    document.querySelectorAll("[data-audio-btn='music']").forEach(function (m) {
      m.addEventListener("click", function () { window.OchoDamasAudio.toggleMusic(); });
    });
    document.querySelectorAll("[data-audio-btn='sfx']").forEach(function (s) {
      s.addEventListener("click", function () { window.OchoDamasAudio.toggleSfx(); });
    });
    // Auto-start after first tap anywhere (Android/WebAudio policy).
    function once() {
      document.removeEventListener("pointerdown", once, true);
      window.OchoDamasAudio.unlock();
    }
    document.addEventListener("pointerdown", once, true);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
