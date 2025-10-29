import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Prefer env vars; fall back to provided values for convenience
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyBFmEB-xwJzQpHNveVAE0L1LvNAA3ycx9w",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "borplatform.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "borplatform",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "borplatform.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "717237090803",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:717237090803:web:b1d2dc154b605e97e4ba86",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "G-KL02PGHSKB",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Export a promise to guard analytics usage in unsupported envs (SSR/Dev)
export const analyticsPromise: Promise<Analytics | null> =
  typeof window !== "undefined"
    ? isSupported()
        .then((yes) => (yes ? getAnalytics(app) : null))
        .catch(() => null)
    : Promise.resolve(null);

export const auth = getAuth(app);

export default app;
