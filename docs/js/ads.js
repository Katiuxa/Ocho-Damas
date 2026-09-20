/* Publicidad: ahora está apagada.
   Cuando toque activarla:
   1. Crear app + banner (y opcional interstitial) en AdMob.
   2. Poner los IDs reales abajo.
   3. enabled: true  —o—  goLiveAt: "2026-09-01T00:00:00+02:00" para que se encienda sola esa fecha.
   4. npm install @capacitor-community/admob && npx cap sync
   5. Descomentar AdMob en AndroidManifest / build.gradle.
*/
(function () {
  "use strict";

  var CFG = {
    enabled: false,
    goLiveAt: null,
    showBanner: true,
    interstitialOnGameEnd: true,
    appId: "ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy",
    bannerId: "ca-app-pub-xxxxxxxxxxxxxxxx/bbbbbbbbbb",
    interstitialId: "ca-app-pub-xxxxxxxxxxxxxxxx/iiiiiiiiii"
  };

  var bannerReady = false;
  var lastScreen = "home";

  function plugin() {
    var C = window.Capacitor;
    if (!C || !C.Plugins) return null;
    return C.Plugins.AdMob || null;
  }

  function isLive() {
    if (CFG.enabled) return true;
    if (!CFG.goLiveAt) return false;
    var when = Date.parse(CFG.goLiveAt);
    return !isNaN(when) && Date.now() >= when;
  }

  function idsReady() {
    return CFG.bannerId.indexOf("xxxx") === -1;
  }

  function markLiveClass() {
    var live = isLive() && CFG.showBanner;
    document.documentElement.classList.toggle("ads-live", live);
    document.documentElement.style.setProperty("--ad-banner-height", live ? "50px" : "0px");
    var slot = document.getElementById("ad-slot");
    if (slot) {
      slot.hidden = !live;
      slot.setAttribute("aria-hidden", live ? "false" : "true");
    }
  }

  async function showBanner() {
    if (!isLive() || !CFG.showBanner) return;
    var AdMob = plugin();
    if (!AdMob || !idsReady()) return;
    try {
      if (!bannerReady) {
        await AdMob.initialize({ initializeForTesting: false });
        bannerReady = true;
      }
      await AdMob.showBanner({
        adId: CFG.bannerId,
        adSize: "BANNER",
        position: "BOTTOM_CENTER",
        margin: 0
      });
    } catch (e) {}
  }

  async function hideBanner() {
    var AdMob = plugin();
    if (!AdMob) return;
    try { await AdMob.hideBanner(); } catch (e) {}
  }

  async function showInterstitial() {
    if (!isLive() || !CFG.interstitialOnGameEnd || !idsReady()) return;
    var AdMob = plugin();
    if (!AdMob) return;
    try {
      await AdMob.prepareInterstitial({ adId: CFG.interstitialId });
      await AdMob.showInterstitial();
    } catch (e) {}
  }

  window.OchoDamasAds = {
    config: CFG,
    isLive: isLive,
    init: function () {
      markLiveClass();
      if (isLive()) showBanner();
    },
    onScreen: function (name) {
      lastScreen = name || lastScreen;
      markLiveClass();
      if (isLive() && CFG.showBanner) showBanner();
    },
    onGameEnd: function () {
      showInterstitial();
    },
    hide: hideBanner
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", window.OchoDamasAds.init);
  } else {
    window.OchoDamasAds.init();
  }
})();
