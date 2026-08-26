(function () {
  "use strict";
  var native = !!(window.Capacitor && (window.Capacitor.isNativePlatform
    ? window.Capacitor.isNativePlatform()
    : window.Capacitor.Plugins));
  if (native) {
    document.documentElement.classList.add("is-native");
    document.documentElement.classList.remove("is-web");
  }

  function cap() {
    return window.Capacitor || null;
  }
  function plugin(name) {
    var C = cap();
    if (!C || !C.Plugins) return null;
    return C.Plugins[name] || null;
  }

  async function bootNative() {
    var StatusBar = plugin("StatusBar");
    var SplashScreen = plugin("SplashScreen");
    var Keyboard = plugin("Keyboard");
    var App = plugin("App");
    var Haptics = plugin("Haptics");

    try {
      if (StatusBar) {
        await StatusBar.setOverlaysWebView({ overlay: true });
        await StatusBar.setStyle({ style: "DARK" });
        if (StatusBar.setBackgroundColor) await StatusBar.setBackgroundColor({ color: "#00000000" });
      }
    } catch (e) {}
    try { if (SplashScreen) await SplashScreen.hide({ fadeOutDuration: 220 }); } catch (e) {}
    try {
      if (window.OchoDamasAudio) window.OchoDamasAudio.resume();
    } catch (e) {}
    try {
      if (Keyboard && Keyboard.setAccessoryBarVisible) await Keyboard.setAccessoryBarVisible({ isVisible: false });
    } catch (e) {}

    if (App && App.addListener) {
      App.addListener("backButton", function () {
        if (typeof window.DamasConsumeBack === "function" && window.DamasConsumeBack()) return;
        if (App.exitApp) App.exitApp();
      });
      App.addListener("appStateChange", function (state) {
        try {
          if (!window.OchoDamasAudio) return;
          if (state && state.isActive) window.OchoDamasAudio.resume();
          else window.OchoDamasAudio.pause();
        } catch (e) {}
      });
      App.addListener("pause", function () {
        try { if (window.OchoDamasAudio) window.OchoDamasAudio.pause(); } catch (e) {}
      });
      App.addListener("resume", function () {
        try { if (window.OchoDamasAudio) window.OchoDamasAudio.resume(); } catch (e) {}
      });
    }
    if (Haptics && Haptics.impact && typeof navigator.vibrate !== "function") {
      navigator.vibrate = function () {
        try { Haptics.impact({ style: "Light" }); } catch (e) {}
        return true;
      };
    }
  }

  document.addEventListener("gesturestart", function (e) { e.preventDefault(); });
  if (cap() && cap().whenPluginReady) cap().whenPluginReady().then(bootNative).catch(bootNative);
  else window.addEventListener("DOMContentLoaded", function () { setTimeout(bootNative, 40); });
})();
