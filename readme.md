# TODO Back

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
  - [Database: MongoDB with Docker](#database-mongodb-with-docker)
  - [Server: Node.js](#server-nodejs)

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
