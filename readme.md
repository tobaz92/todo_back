# TODO Back

Brief project description goes here.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Purpose](#purpose)
- [Installation](#installation)
  - [Database: MongoDB with Docker](#database-mongodb-with-docker)
  - [Server: Node.js](#server-nodejs)
- [API Documentation](#api-documentation)
- [License](#license)

## Overview

The project is a backend application that serves as the foundation for a todo management system.
It is designed to handle user authentication, todo creation, updates, and deletions, as well as two-factor authentication (2FA) for enhanced security.

## Features

- **User Management:**

  - Create, update, and delete user accounts.
  - Authenticate users for secure access to the system.
  - Implement role-based access control with editor and admin privileges.

- **Todo Management:**

  - Create, update, and delete todos.
  - Filter todos based on the authenticated user.
  - Enforce permissions to ensure data security.

- **Two-Factor Authentication (2FA):**
  - Generate a secret key and QR code for 2FA.
  - Enable 2FA for users to enhance account security.

### Purpose

The primary goal of this backend application is to provide a robust and secure foundation for a todo management system. It facilitates user authentication, manages todos, and implements additional security measures through 2FA.

Please refer to the API Documentation section for detailed information on available routes and functionalities.

## Installation

### Database: MongoDB with Docker

Make sure you have Docker installed on your machine. If not, you can download it from Docker's official website (https://www.docker.com/).

1. Start MongoDB using Docker Compose:

```bash
docker-compose up -d
```

This command will launch a MongoDB container in the background.

### Server: Node.js

Make sure you have Node.js and npm installed on your machine. If not, you can download them from Node.js official website (https://nodejs.org/).

1. Install project dependencies:

```bash
pnpm install
```

This command will install the necessary Node.js packages specified in the package.json file.

2. Start the Node.js server:

```bash
pnpm start
```

3. Start in development mode:

```bash
pnpm run dev
```

The server will be running at http://localhost:3000. You can customize the port in the config file if needed.

## API Documentation

### Users

#### Get All Users (For Development)

- **Route:** `GET /users/dev`
- **Description:** Obtain a list of all users (for development purposes).
- **Authorization:** None (public endpoint).

#### Get User by ID

- **Route:** `GET /users/:id`
- **Description:** Obtain user details by their ID.
- **Authorization:** Requires authentication and editor privileges.

#### Create New User

- **Route:** `POST /users/signin`
- **Description:** Create a new user.
- **Authorization:** None (public endpoint).

#### Delete User

- **Route:** `DELETE /users/:id`
- **Description:** Delete a user by their ID.
- **Authorization:** Requires authentication and admin privileges.

#### Update User

- **Route:** `PUT /users/:id`
- **Description:** Update user details by their ID.
- **Authorization:** Requires authentication and must be the same user.

#### Authenticate User

- **Route:** `POST /users/login`
- **Description:** Authenticate a user.
- **Authorization:** None (public endpoint).

### Todos

#### Get All Todos (For Development)

- **Route:** `GET /todos/dev`
- **Description:** Obtain a list of all todos (for development purposes).
- **Authorization:** None (public endpoint).

#### Get User Todos

- **Route:** `GET /todos/`
- **Description:** Obtain todos for the authenticated user.
- **Authorization:** Requires authentication, editor privileges, and filters by user.

#### Get One Todo

- **Route:** `GET /todos/:id`
- **Description:** Obtain details of a specific todo by ID.
- **Authorization:** Requires authentication, editor privileges, and checks todo permission.

#### Add a Todo

- **Route:** `POST /todos/`
- **Description:** Add a new todo.
- **Authorization:** Requires authentication and editor privileges.

#### Update a Todo

- **Route:** `PUT /todos/:id`
- **Description:** Update a todo by ID.
- **Authorization:** Requires authentication, editor privileges, and checks todo permission.

#### Delete a Todo

- **Route:** `DELETE /todos/:id`
- **Description:** Delete a todo by ID.
- **Authorization:** Requires authentication, editor privileges, and checks todo permission.

### Two-Factor Authentication (2FA)

#### Generate Secret Key and QR Code

- **Route:** `POST /2fa/generate-secret-key`
- **Description:** Generate a secret key for 2FA and obtain a QR code for authentication.
- **Authorization:** Requires authentication.

#### Enable Two-Factor Authentication

- **Route:** `POST /2fa/enable-2fa`
- **Description:** Enable 2FA for the user by providing a TOTP code.
- **Authorization:** Requires authentication.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE) file for details.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
