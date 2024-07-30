# create-walacor-app

<img src="https://api.surveyjs.io/private/Surveys/files?name=3aa2c82a-85dd-4c4b-9dc8-3238187270c7" alt="Walacor Logo" width="125">

🚀 CLI tool to create a Next.js project connected to Walacor database 🌐

[https://www.npmjs.com/package/create-walacor-app?activeTab=readme](CLI-Tool)

## Description

`create-walacor-app` is a command-line tool that helps you quickly set up a new Next.js project configured with various optional tools like ESLint, Prettier, Playwright, and CI/CD pipelines.

## Features

- **Next.js**: Set up a Next.js project with ease.
- **ESLint**: Optionally add ESLint for linting your code.
- **Prettier**: Optionally add Prettier for code formatting.
- **Playwright**: Optionally add Playwright for end-to-end testing.
- **CI/CD**: Optionally add a CI/CD pipeline configuration using GitHub Actions.

## Installation

You can install `create-walacor-app` globally using npm:

```bash
npm install -g create-walacor-app
```

Alternatively, you can use `npx` to run the CLI tool without installing it globally:

```bash
npx create-walacor-app <project-name>
```

## Options

During the setup process, you will be prompted to choose whether to include the following tools and configurations:

### ESLint

```bash
> Would you like to add ESLint? (no / yes) › (yes)
```

### Prettier

```bash
> Would you like to add Prettier? (no / yes) › (yes)
```

### Playwright

```bash
> Would you like to add Playwright testing? (no / yes) › (yes)
```

### CI/CD

```bash
> Would you like to add a CI/CD pipeline? (no / yes) › (yes)
```

## Configuration

The CLI tool will configure the project based on your selections, including updating the `package.json` file with the appropriate dependencies and scripts.

## Successful Installation Example

```bash
npx create-walacor-app this-is-my-project
✔ Would you like to add ESLint? … yes
✔ Would you like to add a CI/CD pipeline? … yes
✔ Would you like to add Playwright testing? … yes
✔ Would you like to add Prettier? … yes
------------------------------------------------------

🛠️  Creating a new Next.js project in /Users/username/Desktop/my-new-project

------------------------------------------------------

🔄 Cloning the repository...

Cloning into '/Users/username/Desktop/my-new-project'...

🧹 Cleaning up...

------------------------------------------------------

🌐 Initializing data...

------------------------------------------------------

📦 Installing dependencies...

📦 Adding ESLint...

📦 Adding CI/CD pipeline...

📦 Adding Playwright testing...

📦 Adding Prettier...

------------------------------------------------------
🎉 Project created successfully!
------------------------------------------------------

📄 Next steps:

1. cd /Users/username/Desktop/my-new-project

2. npm run dev

Your project is now ready and running at http://localhost:3000

------------------------------------------------------
```

## TypeScript

This package is written in TypeScript, ensuring type safety and better code quality. The TypeScript code is compiled to JavaScript for execution.

## License

MIT License

## Keywords

- Next.js
- ESLint
- Prettier
- Playwright
- CI/CD
- CLI
- Project Setup
- Walacor
- JavaScript
- TypeScript

## Connect with Us

[LinkedIn](https://www.linkedin.com/company/walacor/)

# create-walacor-app
