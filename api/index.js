// server.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const PORT = 3000;

// --- Middleware ---
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// --- In-Memory Database ---
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];
let nextUserId = 3;

// --- API Routes ---

/**
 * @route   POST /api/login
 * @desc    Simulates a user login. Sets an authentication cookie.
 */
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    console.log(`Login successful for user: ${username}`);
    const authToken = "fake-jwt-token-for-testing";
    res.cookie("authToken", authToken, {
      httpOnly: true,
      maxAge: 3600000,
      path: "/",
    });
    return res.status(200).json({ message: "Login successful" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

/**
 * @route   GET /dashboard
 * @desc    A protected route that serves the dashboard HTML if authenticated.
 */
app.get("/dashboard", (req, res) => {
  // Check if the authToken cookie is present
  if (req.cookies && req.cookies.authToken) {
    // If authenticated, send the dashboard file
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
  } else {
    // If not authenticated, send a simple unauthorized message or redirect
    res
      .status(401)
      .send(
        "<h1>401 - Unauthorized</h1><p>You must be logged in to view this page.</p>"
      );
  }
});

/**
 * @route   GET /api/users
 * @desc    Get all users.
 */
app.get("/api/users", (req, res) => {
  console.log("GET /api/users - Returning all users.");
  res.status(200).json(users);
});

/**
 * @route   POST /api/users
 * @desc    Create a new user.
 */
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  const newUser = {
    id: nextUserId++,
    name,
    email,
  };

  users.push(newUser);
  console.log("POST /api/users - Created new user:", newUser);

  res.status(201).json(newUser);
});

module.exports = app;

// --- Server Initialization ---
app.listen(PORT, () => {
  console.log(`Test API server is running on http://localhost:${PORT}`);
  console.log("Available routes:");
  console.log("  POST /api/login");
  console.log("  GET  /dashboard (requires auth cookie)");
  console.log("  GET  /api/users");
  console.log("  POST /api/users");
});
