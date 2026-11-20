# 8 Damas

The eight queens puzzle. Place every queen so that none shares a row, a column, or a diagonal. Web and Android.

Three ways to play. **Normal** is at your own pace, and Help marks the clashes in red. **Problem** starts from a real solution and locks those queens in place. **Time attack** gives you 1, 3, or 5 minutes to finish as many boards as you can. The boards run from 8×8 to 11×11.

## Web

https://8damas.vercel.app

Web code is in `www/` and `docs/`.

## Android

Capacitor, in `android/`. Version **1.0.19**.

```bash
npm ci
npm run apk
```

The Play Store keystore stays outside git.
