"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "www", "audio", "theme.wav");

function writeWav(file, samples, sampleRate) {
  const dataSize = samples.length * 2;
  const buf = Buffer.alloc(44 + dataSize);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + dataSize, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(dataSize, 40);
  for (let i = 0; i < samples.length; i++) {
    let v = Math.max(-1, Math.min(1, samples[i]));
    buf.writeInt16LE((v * 32767) | 0, 44 + i * 2);
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, buf);
}

function tone(t, freq, amp) {
  return Math.sin(2 * Math.PI * freq * t) * amp;
}

function env(t, attack, hold, release, dur) {
  if (t < 0 || t > dur) return 0;
  if (t < attack) return t / attack;
  if (t < attack + hold) return 1;
  const r = (dur - t) / release;
  return r > 0 ? r : 0;
}

function main() {
  const sr = 22050;
  const seconds = 12;
  const n = Math.floor(sr * seconds);
  const samples = new Float32Array(n);

  // Soft puzzle / chess lounge loop in Am.
  const melody = [
    [0.0, 440.0], [0.5, 523.25], [1.0, 493.88], [1.5, 440.0],
    [2.0, 392.0], [2.5, 349.23], [3.0, 392.0], [3.5, 440.0],
    [4.0, 523.25], [4.5, 587.33], [5.0, 523.25], [5.5, 493.88],
    [6.0, 440.0], [6.5, 392.0], [7.0, 349.23], [7.5, 329.63],
    [8.0, 349.23], [8.5, 392.0], [9.0, 440.0], [9.5, 493.88],
    [10.0, 440.0], [10.5, 392.0], [11.0, 349.23], [11.5, 329.63]
  ];
  const pads = [
    [220.0, 261.63, 329.63],
    [174.61, 220.0, 261.63],
    [196.0, 246.94, 293.66],
    [164.81, 220.0, 261.63]
  ];

  for (let i = 0; i < n; i++) {
    const t = i / sr;
    let s = 0;
    const pad = pads[Math.floor(t / 3) % pads.length];
    for (let p = 0; p < pad.length; p++) {
      s += tone(t, pad[p], 0.07);
      s += tone(t, pad[p] * 0.5, 0.045);
    }
    for (let m = 0; m < melody.length; m++) {
      const start = melody[m][0];
      const freq = melody[m][1];
      const local = t - start;
      const e = env(local, 0.02, 0.18, 0.22, 0.48);
      if (e > 0) s += tone(t, freq, 0.16 * e) + tone(t, freq * 2, 0.04 * e);
    }
    // Soft fade at loop edges
    const edge = Math.min(t, seconds - t, 0.35) / 0.35;
    samples[i] = s * Math.min(1, Math.max(0.15, edge));
  }

  writeWav(OUT, samples, sr);
  console.log("audio " + path.relative(ROOT, OUT));
}

main();
