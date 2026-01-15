import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import "../styles/App.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ============================
     CREATE USER PROFILE (ONCE)
  ============================ */
  const ensureUserProfile = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, {
        name: user.displayName || "User",
        email: user.email,
        role: "user",
        created_at: serverTimestamp()
      });
    }
  };

  /* =====================
     EMAIL / PASSWORD AUTH
  ====================== */
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let userCredential;

      if (isRegister) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      await ensureUserProfile(userCredential.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  /* =====================
     GOOGLE SIGN-IN
  ====================== */
  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      await ensureUserProfile(result.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{isRegister ? "Register" : "Login"}</h2>

        <form onSubmit={handleEmailAuth}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : isRegister
              ? "Register"
              : "Login"}
          </button>
        </form>

        <div className="auth-divider">OR</div>

        <button
          className="google-btn"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          Continue with Google
        </button>

        <p className="auth-switch">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? " Login" : " Register"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
