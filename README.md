# Playwright Test API

[![CircleCI](https://circleci.com/gh/mwaz/api-testing-with-playwright.svg?style=svg)](https://circleci.com/gh/mwaz/api-testing-with-playwright)

<p align="center"><img src="https://avatars3.githubusercontent.com/u/59034516"></p>

This project is a simple API server built with `Node.js` and `Express`. It is designed to be a testing backend for the "API testing with Playwright" tutorial for CircleCI.

It provides basic endpoints for fetching users, creating users, and simulating a user login.

## Prerequisites

- Node.js (v16 or later)

- npm (usually comes with Node.js)

## Installation

Clone the repository or save the `index.js` and `package.json` files to a new directory.

```bash
git clone git@github.com:mwaz/api-testing-with-playwright.git
```

Navigate to the project directory in your terminal.

```bash
cd api-testing-with-playwright
```

Install the required dependencies by running:

```bash
npm install
```

Running the Server
To start the API server, run the following command from the project's root directory:

```bash
npm start
```

You should see a confirmation message in your terminal:
Test API server is running on <http://localhost:3000>

> **Info:** The API server is also hosted on Vercel at [https://api-testing-with-playwright-b1gd.vercel.app](https://api-testing-with-playwright-b1gd.vercel.app), which makes it easier to run the tests on CI.

Available API Endpoints:
The server provides the following endpoints:

### Authentication

`POST /api/login`

- Simulates a user login.

- Request Body: `{ "username": "any_username", "password": "any_password" }`

- Success Response (200): Sets an authToken cookie and returns `{ "message": "Login successful" }`.

- Error Response (401): `{ "message": "Invalid credentials" }`.

Users
`GET api/users`

- Fetches a list of all users.

- Success Response (200): Returns an array of user objects.

```json
[
  { "id": 1, "name": "Alice", "email": "alice@example.com" },
  { "id": 2, "name": "Bob", "email": "bob@example.com" }
]
```

`POST api/users`

Creates a new user.

- Request Body: `{ "name": "John Doe", "email": "john.doe@example.com" }`

- Success Response (201): Returns the newly created user object.

- `{ "id": 3, "name": "John Doe", "email": "john.doe@example.com" }`

- Error Response (400): `{ "message": "Name and email are required." }`.

## Details

This repo is built following a tutorial published on CircleCI blog under the CircleCI Guest Writer Program.

- Blog post: [API Testing With Playwright][blog]
- Author's GitHub profile: [Waweru Mwaura][author]

### About CircleCI Guest Writer Program

Join a team of freelance writers and write about your favorite technology topics for the CircleCI blog. Read more about the program [here][gwp-program].

[blog]: https://circleci.com/blog/api-testing-with-playwright
[author]: https://github.com/mwaz
[gwp-program]: https://circle.ci/3ahQxfu
