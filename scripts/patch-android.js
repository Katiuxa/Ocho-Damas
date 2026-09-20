"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const ANDROID = path.join(ROOT, "android");
const APP = path.join(ANDROID, "app");
const SRC = path.join(APP, "src", "main");
const PKG = "com.metamovidas.ochodamas";
const APP_NAME = "8 Damas";
const PASS = "OchoDamasMetamovidas2026!";
const PKG_JSON = require(path.join(ROOT, "package.json"));
const APP_VERSION = String(PKG_JSON.version || "1.0.1");
const VERSION_PARTS = APP_VERSION.split(".").map(function (n) { return parseInt(n, 10) || 0; });
const VERSION_CODE = (VERSION_PARTS[0] || 0) * 10000 + (VERSION_PARTS[1] || 0) * 100 + (VERSION_PARTS[2] || 0);

function adsIdsFromConfig() {
  const cfgPath = path.join(ROOT, "www", "js", "ads-config.js");
  const s = fs.existsSync(cfgPath) ? fs.readFileSync(cfgPath, "utf8") : "";
  const appId = ((s.match(/appId:\s*"([^"]+)"/) || [])[1] || "").trim();
  const bannerId = ((s.match(/bannerId:\s*"([^"]+)"/) || [])[1] || "").trim();
  const ready = appId.indexOf("~") !== -1
    && appId.indexOf("PEGA") === -1
    && bannerId.indexOf("/") !== -1
    && bannerId.indexOf("PEGA") === -1;
  return { appId, bannerId, ready };
}

function write(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
  console.log("patch " + path.relative(ROOT, file));
}

function ensureKeystore() {
  const dir = path.join(ANDROID, "keystore");
  fs.mkdirSync(dir, { recursive: true });
  const jks = path.join(dir, "ochodamas-upload.jks");
  const props = path.join(ANDROID, "keystore.properties");
  if (fs.existsSync(jks) && fs.existsSync(props)) return;

  const javaHome = process.env.JAVA_HOME || "C:\\Program Files\\Android\\Android Studio\\jbr";
  const keytool = path.join(javaHome, "bin", "keytool.exe");
  const r = spawnSync(fs.existsSync(keytool) ? keytool : "keytool", [
    "-genkeypair", "-v",
    "-keystore", jks,
    "-storetype", "JKS",
    "-alias", "ochodamas",
    "-keyalg", "RSA",
    "-keysize", "2048",
    "-validity", "10000",
    "-storepass", PASS,
    "-keypass", PASS,
    "-dname", "CN=8 Damas, OU=Metamovidas, O=Metamovidas, L=Madrid, C=ES"
  ], { stdio: "inherit" });
  if (r.status) throw new Error("keytool falló");
  write(props, `storeFile=keystore/ochodamas-upload.jks
storePassword=${PASS}
keyAlias=ochodamas
keyPassword=${PASS}
`);
  write(path.join(dir, "LEEEME.txt"), `GUARDA ESTE ARCHIVO Y ochodamas-upload.jks EN UN SITIO SEGURO.
Sin esta clave no podrás actualizar la app en Google Play.

Alias: ochodamas
Contraseña: ${PASS}
Paquete: ${PKG}
`);
}

function patchGradle() {
  const appGradle = path.join(APP, "build.gradle");
  let s = fs.readFileSync(appGradle, "utf8");
  if (!s.includes("keystore.properties")) {
    s = s.replace(
      "android {",
      `def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new java.io.FileInputStream(keystorePropertiesFile))
}

android {`
    );
  }
  if (!s.includes("signingConfigs")) {
    s = s.replace(
      "    buildTypes {",
      `    signingConfigs {
        release {
            if (keystorePropertiesFile.exists()) {
                keyAlias keystoreProperties["keyAlias"]
                keyPassword keystoreProperties["keyPassword"]
                storeFile rootProject.file(keystoreProperties["storeFile"])
                storePassword keystoreProperties["storePassword"]
            }
        }
    }
    buildTypes {`
    );
  }
  if (!s.includes("signingConfig signingConfigs.release")) {
    s = s.replace(
      /release \{\s*minifyEnabled false/,
      `release {
            minifyEnabled false
            signingConfig signingConfigs.release`
    );
  }
  s = s.replace(/versionCode \d+/, "versionCode " + VERSION_CODE);
  s = s.replace(/versionName "[^"]+"/, 'versionName "' + APP_VERSION + '"');
  if (!s.includes("play-services-ads")) {
    s = s.replace(
      "implementation project(':capacitor-android')",
      "implementation project(':capacitor-android')\n    implementation \"com.google.android.gms:play-services-ads:$playServicesAdsVersion\"\n    implementation \"com.android.billingclient:billing:7.1.1\""
    );
  }
  fs.writeFileSync(appGradle, s);
  console.log("edit android/app/build.gradle (" + APP_VERSION + " / " + VERSION_CODE + ")");
}

function patchManifest() {
  write(path.join(SRC, "AndroidManifest.xml"), `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="com.google.android.gms.permission.AD_ID" />
    <uses-permission android:name="com.android.vending.BILLING" />

    <uses-feature android:name="android.hardware.touchscreen" android:required="true" />

    <supports-screens
        android:anyDensity="true"
        android:largeScreens="true"
        android:normalScreens="true"
        android:smallScreens="true"
        android:xlargeScreens="true" />

    <application
        android:allowBackup="true"
        android:hardwareAccelerated="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:largeHeap="true"
        android:networkSecurityConfig="@xml/network_security_config"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        android:usesCleartextTraffic="false">

        ${adsIdsFromConfig().ready ? `<!-- AdMob App ID (strings.xml → admob_app_id). Must use "~", not "/". -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="@string/admob_app_id" />
` : `<!-- AdMob APPLICATION_ID se añade al pegar los IDs reales en ads-config.js -->
`}

        <activity
            android:name=".MainActivity"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode|navigation|density"
            android:exported="true"
            android:label="@string/title_activity_main"
            android:launchMode="singleTask"
            android:screenOrientation="fullUser"
            android:theme="@style/AppTheme.NoActionBarLaunch"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="\${applicationId}.fileprovider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/file_paths" />
        </provider>
    </application>
</manifest>
`);
  write(path.join(SRC, "res", "xml", "network_security_config.xml"), `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="false">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
    <domain-config cleartextTrafficPermitted="false">
        <domain includeSubdomains="true">damas-888b6-default-rtdb.firebaseio.com</domain>
        <domain includeSubdomains="true">firebasedatabase.app</domain>
        <domain includeSubdomains="true">googleapis.com</domain>
        <domain includeSubdomains="true">gstatic.com</domain>
        <domain includeSubdomains="true">8damas.com</domain>
        <domain includeSubdomains="true">googleads.g.doubleclick.net</domain>
        <domain includeSubdomains="true">googlesyndication.com</domain>
        <domain includeSubdomains="true">googleadservices.com</domain>
        <domain includeSubdomains="true">broker.emqx.io</domain>
        <domain includeSubdomains="true">broker.hivemq.com</domain>
    </domain-config>
</network-security-config>
`);
}

function patchStrings() {
  const file = path.join(SRC, "res", "values", "strings.xml");
  if (!fs.existsSync(file)) return;
  let s = fs.readFileSync(file, "utf8");
  s = s.replace(/<string name="app_name">[^<]+<\/string>/, `<string name="app_name">${APP_NAME}</string>`);
  s = s.replace(/<string name="title_activity_main">[^<]+<\/string>/, `<string name="title_activity_main">${APP_NAME}</string>`);
  s = s.replace(/<string name="package_name">[^<]+<\/string>/, `<string name="package_name">${PKG}</string>`);
  s = s.replace(/<string name="custom_url_scheme">[^<]+<\/string>/, `<string name="custom_url_scheme">${PKG}</string>`);
  const ads = adsIdsFromConfig();
  const appId = ads.ready ? ads.appId : "PEGA_AQUI_EL_APP_ID_DE_ESTE_JUEGO";
  const bannerId = ads.ready ? ads.bannerId : "PEGA_AQUI_EL_BANNER_ID_DE_ESTE_JUEGO";
  if (/<string name="admob_app_id">/.test(s)) {
    s = s.replace(/<string name="admob_app_id">[^<]*<\/string>/, `<string name="admob_app_id">${appId}</string>`);
  } else {
    s = s.replace("</resources>", `    <string name="admob_app_id">${appId}</string>\n</resources>`);
  }
  if (/<string name="admob_banner_id">/.test(s)) {
    s = s.replace(/<string name="admob_banner_id">[^<]*<\/string>/, `<string name="admob_banner_id">${bannerId}</string>`);
  } else {
    s = s.replace("</resources>", `    <string name="admob_banner_id">${bannerId}</string>\n</resources>`);
  }
  fs.writeFileSync(file, s);
}

function patchStyles() {
  write(path.join(SRC, "res", "values", "styles.xml"), `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
        <item name="android:statusBarColor">@android:color/transparent</item>
        <item name="android:navigationBarColor">@color/colorPrimary</item>
        <item name="android:windowDrawsSystemBarBackgrounds">true</item>
        <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>
    </style>
    <style name="AppTheme.NoActionBar" parent="Theme.AppCompat.DayNight.NoActionBar">
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
        <item name="android:statusBarColor">@android:color/transparent</item>
        <item name="android:navigationBarColor">@color/colorPrimary</item>
        <item name="android:windowDrawsSystemBarBackgrounds">true</item>
        <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>
    </style>
    <style name="AppTheme.NoActionBarLaunch" parent="Theme.SplashScreen">
        <item name="windowSplashScreenBackground">@color/splash_bg</item>
        <item name="windowSplashScreenAnimatedIcon">@drawable/ic_splash_icon</item>
        <item name="windowSplashScreenIconBackgroundColor">@color/splash_bg</item>
        <item name="postSplashScreenTheme">@style/AppTheme.NoActionBar</item>
        <item name="android:background">@drawable/splash</item>
    </style>
</resources>
`);
  write(path.join(SRC, "res", "values", "colors.xml"), `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#0E1A12</color>
    <color name="colorPrimaryDark">#0E1A12</color>
    <color name="colorAccent">#E0C36A</color>
    <color name="splash_bg">#0E1A12</color>
</resources>
`);
}

function copyIcons() {
  const { Resvg } = require("@resvg/resvg-js");
  const logoPath = path.join(ROOT, "www", "img", "logo-circle.svg");
  const svg = fs.readFileSync(logoPath, "utf8");
  const logoInner = svg.replace(/<svg[^>]*>/, "").replace("</svg>", "");

  function rasterFull(size) {
    const out = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">${logoInner}</svg>`;
    return new Resvg(out, { fitTo: { mode: "width", value: size } }).render().asPng();
  }

  // Circular logo inset on a transparent canvas so Android's squircle/circle
  // mask never clips the gold ring into a square.
  function rasterInset(canvasSize, fraction) {
    const logo = Math.round(canvasSize * fraction);
    const x = (canvasSize - logo) / 2;
    const out = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasSize}" height="${canvasSize}" viewBox="0 0 ${canvasSize} ${canvasSize}">
      <svg x="${x}" y="${x}" width="${logo}" height="${logo}" viewBox="0 0 512 512">${logoInner}</svg>
    </svg>`;
    return new Resvg(out, {
      fitTo: { mode: "width", value: canvasSize },
      background: "rgba(0,0,0,0)"
    }).render().asPng();
  }

  const dens = { "mipmap-mdpi": 48, "mipmap-hdpi": 72, "mipmap-xhdpi": 96, "mipmap-xxhdpi": 144, "mipmap-xxxhdpi": 192 };
  const fgDens = { "mipmap-mdpi": 108, "mipmap-hdpi": 162, "mipmap-xhdpi": 216, "mipmap-xxhdpi": 324, "mipmap-xxxhdpi": 432 };
  for (const [folder, size] of Object.entries(dens)) {
    const dir = path.join(SRC, "res", folder);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "ic_launcher.png"), rasterFull(size));
    fs.writeFileSync(path.join(dir, "ic_launcher_round.png"), rasterFull(size));
    fs.writeFileSync(path.join(dir, "ic_launcher_foreground.png"), rasterInset(fgDens[folder], 0.62));
  }
  const anyDpi = path.join(SRC, "res", "mipmap-anydpi-v26");
  fs.mkdirSync(anyDpi, { recursive: true });
  const adaptive = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
`;
  fs.writeFileSync(path.join(anyDpi, "ic_launcher.xml"), adaptive);
  fs.writeFileSync(path.join(anyDpi, "ic_launcher_round.xml"), adaptive);
  const capacitorFg = path.join(SRC, "res", "drawable-v24", "ic_launcher_foreground.xml");
  if (fs.existsSync(capacitorFg)) fs.unlinkSync(capacitorFg);
  const capacitorBg = path.join(SRC, "res", "drawable", "ic_launcher_background.xml");
  if (fs.existsSync(capacitorBg)) fs.unlinkSync(capacitorBg);
  write(path.join(SRC, "res", "values", "ic_launcher_background.xml"), `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#0E1A12</color>
</resources>
`);

  // Dedicated splash glyph: extra inset so OEM rounded-square masks keep the ring intact.
  const splashIconDens = {
    drawable: 240,
    "drawable-mdpi": 240,
    "drawable-hdpi": 360,
    "drawable-xhdpi": 480,
    "drawable-xxhdpi": 720,
    "drawable-xxxhdpi": 960
  };
  for (const [folder, size] of Object.entries(splashIconDens)) {
    const dir = path.join(SRC, "res", folder);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "ic_splash_icon.png"), rasterInset(size, 0.48));
  }

  function splashPng(w, h) {
    const svgSplash = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <rect width="${w}" height="${h}" fill="#0e1a12"/>
    </svg>`;
    return new Resvg(svgSplash, { fitTo: { mode: "width", value: w } }).render().asPng();
  }
  const splashMap = {
    drawable: [480, 800],
    "drawable-port-mdpi": [320, 480],
    "drawable-port-hdpi": [480, 800],
    "drawable-port-xhdpi": [720, 1280],
    "drawable-port-xxhdpi": [1080, 1920],
    "drawable-land-mdpi": [480, 320],
    "drawable-land-hdpi": [800, 480],
    "drawable-land-xhdpi": [1280, 720]
  };
  for (const [folder, [w, h]] of Object.entries(splashMap)) {
    const dir = path.join(SRC, "res", folder);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "splash.png"), splashPng(w, h));
  }
}

function patchMainActivity() {
  const javaDir = path.join(SRC, "java", ...PKG.split("."));
  const file = path.join(javaDir, "MainActivity.java");
  if (fs.existsSync(file) && /AdView|AdsManager/.test(fs.readFileSync(file, "utf8"))) {
    console.log("keep MainActivity.java (native banner below WebView)");
    return;
  }
  console.warn("MainActivity.java missing native banner — leaving as-is");
}

function main() {
  if (!fs.existsSync(APP)) throw new Error("Primero hay que crear android/ con cap add android");
  const sdk = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT ||
    path.join(process.env.LOCALAPPDATA || "", "Android", "Sdk");
  write(path.join(ANDROID, "local.properties"), "sdk.dir=" + sdk.replace(/\\/g, "/") + "\n");
  ensureKeystore();
  patchGradle();
  patchManifest();
  patchStrings();
  patchStyles();
  patchMainActivity();
  copyIcons();
  const vars = path.join(ANDROID, "variables.gradle");
  if (fs.existsSync(vars)) {
    let s = fs.readFileSync(vars, "utf8");
    s = s.replace(/minSdkVersion = \d+/, "minSdkVersion = 24");
    s = s.replace(/compileSdkVersion = \d+/, "compileSdkVersion = 35");
    s = s.replace(/targetSdkVersion = \d+/, "targetSdkVersion = 35");
    if (!s.includes("playServicesAdsVersion")) {
      s = s.replace("}", "    playServicesAdsVersion = '23.6.0'\n}");
    }
    fs.writeFileSync(vars, s);
  }
  console.log("Android parcheado");
}

main();
