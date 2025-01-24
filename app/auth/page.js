"use client";
import { useState } from "react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setIsLoggedIn(true);
    } else {
      alert("Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setIsLoggedIn(true);
    } else {
      console.log(await res.json());
      alert("Signup failed");
    }
  };

  const switchToLogin = () => {
    setIsLogin(true);
    setEmail("");
    setPassword("");
  };

  const switchToSignup = () => {
    setIsLogin(false);
    setEmail("");
    setPassword("");
  };

  if (isLoggedIn) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        You are logged in!
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "300px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={switchToLogin}
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: isLogin ? "#0070f3" : "#fff",
              color: isLogin ? "#fff" : "#000",
              border: "none",
              cursor: "pointer",
            }}
          >
            Login
          </button>
          <button
            onClick={switchToSignup}
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: !isLogin ? "#0070f3" : "#fff",
              color: !isLogin ? "#fff" : "#000",
              border: "none",
              cursor: "pointer",
            }}
          >
            Signup
          </button>
        </div>
        {isLogin ? (
          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              style={{
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#0070f3",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleSignup}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              style={{
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#0070f3",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Signup
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
