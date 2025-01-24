"use client";

import { useState, useEffect } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch users from the API
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });
    if (response.ok) {
      const newUser = await response.json();
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setName("");
      setEmail("");
    } else {
      window.alert((await response.json()).error);
    }
  };

  // Handle user deletion
  const handleDelete = async (id) => {
    const response = await fetch("/api/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } else {
      console.error("Failed to delete user");
    }
  };

  // Inline styles with a calm color palette
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f4f8",
    color: "#333",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "1rem",
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "500px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    margin: "0.5rem 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#f9fafb",
    color: "#333",
    fontSize: "1rem",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem",
    margin: "1rem 0",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const deleteButtonStyle = {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "0.3rem 0.6rem",
    cursor: "pointer",
    marginLeft: "1rem",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049",
  };

  const deleteButtonHoverStyle = {
    backgroundColor: "#e03b3b",
  };

  const listStyle = {
    textAlign: "left",
    marginTop: "1.5rem",
  };

  const listItemStyle = {
    backgroundColor: "#f9fafb",
    padding: "0.75rem",
    borderRadius: "8px",
    margin: "0.5rem 0",
    border: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1>User Registration</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor =
                buttonHoverStyle.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = buttonStyle.backgroundColor)
            }
          >
            Add User
          </button>
        </form>
        <h2>Registered Users</h2>
        <ul style={listStyle}>
          {users.map((user) => (
            <li key={user.id} style={listItemStyle}>
              <span>
                {user.name} ({user.email})
              </span>
              <button
                onClick={() => handleDelete(user.id)}
                style={deleteButtonStyle}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor =
                    deleteButtonHoverStyle.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor =
                    deleteButtonStyle.backgroundColor)
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
