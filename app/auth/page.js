"use client";
import { useEffect, useState } from "react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
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
      const { token } = await res.json();
      localStorage.setItem("token", token);
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
      localStorage.setItem("token", await res.json().token);
    } else {
      alert("Signup failed");
    }
  };

  const onSubmitProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await fetch("/api/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ firstname, lastname }),
    });
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

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await fetch("/api/user/login", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          setIsLoggedIn(true);
        }
      }
    })();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#121212",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          backgroundColor: "#1e1e1e",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "10px", color: "#fff" }}>
            {isLoggedIn ? "Update Your Profile" : isLogin ? "Login" : "Signup"}
          </h2>
          <p
            style={{
              color: "#bbb",
              fontSize: "14px",
              marginBottom: "20px",
            }}
          >
            {isLoggedIn
              ? "Fill in your details to complete your profile."
              : isLogin
              ? "Please log in to continue."
              : "Create a new account to get started."}
          </p>
        </div>

        {isLoggedIn ? (
          <form onSubmit={onSubmitProfile}>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="First Name"
              required
              style={inputStyle}
            />
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Last Name"
              required
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>
              Save Profile
            </button>
          </form>
        ) : (
          <>
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <button
                onClick={switchToLogin}
                style={{
                  ...authButtonStyle,
                  backgroundColor: isLogin ? "#0070f3" : "#333",
                  color: isLogin ? "#fff" : "#0070f3",
                }}
              >
                Login
              </button>
              <button
                onClick={switchToSignup}
                style={{
                  ...authButtonStyle,
                  backgroundColor: !isLogin ? "#0070f3" : "#333",
                  color: !isLogin ? "#fff" : "#0070f3",
                }}
              >
                Signup
              </button>
            </div>

            {isLogin ? (
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  style={inputStyle}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>
                  Login
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  style={inputStyle}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>
                  Signup
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px 15px",
  marginBottom: "12px",
  width: "100%",
  borderRadius: "6px",
  border: "1px solid #444",
  fontSize: "16px",
  outline: "none",
  backgroundColor: "#333",
  color: "#fff",
};

const buttonStyle = {
  padding: "12px 15px",
  width: "100%",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#0070f3",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const authButtonStyle = {
  flex: 1,
  padding: "12px",
  border: "1px solid #444",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s, color 0.3s",
};
