"use strict";

const fs = require("fs");
const path = require("path");
const { Resvg } = require("@resvg/resvg-js");

const ROOT = path.join(__dirname, "..");
const RES = path.join(ROOT, "resources");
const STORE = path.join(ROOT, "store-assets");
const LOGO = fs.readFileSync(path.join(ROOT, "www", "img", "logo-circle.svg"), "utf8");

function pngFromSvg(svg, width) {
  return new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng();
}

function write(file, buf) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, buf);
  console.log(path.relative(ROOT, file));
}

function logoInner() {
  return LOGO.replace(/<svg[^>]*>/, "").replace("</svg>", "");
}

function logoAt(size) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">${logoInner()}</svg>`;
  return pngFromSvg(svg, size);
}

function logoInset(size, fraction) {
  const logo = Math.round(size * fraction);
  const x = (size - logo) / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <svg x="${x}" y="${x}" width="${logo}" height="${logo}" viewBox="0 0 512 512">${logoInner()}</svg>
  </svg>`;
  return new Resvg(svg, {
    fitTo: { mode: "width", value: size },
    background: "rgba(0,0,0,0)"
  }).render().asPng();
}

function splash(w, h) {
  const clean = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="${w}" height="${h}" fill="#0e1a12"/>
  </svg>`;
  return pngFromSvg(clean, w);
}

function featureGraphic() {
  const w = 1024, h = 500;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="${w}" height="${h}" fill="#0e1a12"/>
    <svg x="70" y="90" width="300" height="300" viewBox="0 0 512 512">
      ${LOGO.replace(/<svg[^>]*>/, "").replace("</svg>", "")}
    </svg>
    <text x="420" y="230" fill="#f6efe2" font-family="sans-serif" font-size="72" font-weight="700">8 DAMAS</text>
    <text x="422" y="290" fill="#e0c36a" font-family="sans-serif" font-size="32">El problema de las ocho reinas</text>
  </svg>`;
  return pngFromSvg(svg, w);
}

function main() {
  write(path.join(RES, "icon.png"), logoAt(1024));
  write(path.join(RES, "icon-foreground.png"), logoInset(1024, 0.62));
  write(path.join(RES, "splash.png"), splash(1242, 2436));
  write(path.join(STORE, "icon-512.png"), logoAt(512));
  write(path.join(STORE, "icon-foreground-preview.png"), logoInset(512, 0.62));
  write(path.join(STORE, "splash-icon-preview.png"), logoInset(512, 0.48));
  write(path.join(STORE, "feature-graphic.png"), featureGraphic());
}

main();
