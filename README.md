# Code Playground (Frontend)

![Code Playground Demo](https://raw.githubusercontent.com/theanujdev/code-playground-frontend/master/img/code-playground.gif)

## Overview

This project provides a real-time cloud-based code sync and editing and website developing platform where you can create any code file. It will provide linting in editor and a basic terminal. Edit HTML, CSS and JS and preview your website in built-in web-renderer.

## Tech Stack

**Client:** React, Typescript, Monoco-editor, Socket.io-client, Xtermjs, React reflex

**Server:** Node, Express, Typescript, Mongoose, Cookie-parser, Socketio

## Features

- Multiple resizable windows
- Featured code editor
- Create, update, delete files
- Realtime cloud sync of code
- Preview webpage
- Built-in terminal with syntax-highlighting
- Flexible and auto resizable components and clean user interface

## Run Locally

- Clone the project

```bash
git clone https://github.com/theanujdev/code-playground-frontend.git
```

- Go to the project directory

```bash
cd code-playground-frontend
```

- Install dependencies

```bash
npm install
```

- Update constants in _src/config/index.ts_ file :

  `SERVER_URL`, `SOCKET_URL`

  (which are going to be same in most cases)

- Start the server

```bash
npm start
```

> **Note:** You need to run [Code Playground Backend](https://github.com/theanujdev/code-playground-backend) server in the background.

## Optimizations

Code is refactored and project structure is optimized for scalability. Along with react components and pages, context hook for global state and _debounce_ function have also been used.

## Screenshots

![App Screenshot](https://raw.githubusercontent.com/theanujdev/code-playground-frontend/master/img/code-playground.png)

## Feedback

If you have any feedback, please reach out at [@theanujdev](https://twitter.com/theanujdev)

## Authors

- [@theanujdev](https://www.github.com/theanujdev)

## License

[MIT](https://choosealicense.com/licenses/mit/)
