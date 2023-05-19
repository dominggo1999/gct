#!/usr/bin/env node

import inquirer, { type QuestionCollection } from "inquirer";
import simpleGit from "simple-git";
import { resolve } from "path";
import { exec } from "child_process";
import { createSpinner } from "nanospinner";

export interface Answers {
  destinationPath: string;
  template: string;
  packageManager: string;
  autoInstall: boolean;
}

export const repos = {
  "t3-antd": "https://github.com/dominggo1999/turbo-t3-antd-template",
  t3: "https://github.com/dominggo1999/turbo-next-t3-template",
  "turbo-expo-next": "https://github.com/dominggo1999/turbo-expo-next",
  node: "https://github.com/dominggo1999/node-typescript-boilerplate",
  "cypress-ts": "https://github.com/dominggo1999/cypress-ts-cucumber-template",
  "turbo-next": "https://github.com/dominggo1999/turbo-next-template",
  "turbo-next-trpc": "https://github.com/dominggo1999/turbo-next-trpc-template",
  sveltekit: "https://github.com/dominggo1999/sveltekit-template",
  vite: "https://github.com/dominggo1999/vite-template",
};

export const packageManagers = {
  pnpm: "pnpm install",
  yarn: "yarn install",
  npm: "npm install",
  bun: "bun install",
  none: "",
};

export const createPrompts = (
  repos: Record<string, string>,
  packageManagers: Record<string, string>,
): QuestionCollection => {
  return [
    {
      type: "input",
      name: "destinationPath",
      message: "Enter the destination path:",
      default: ".",
    },
    {
      type: "list",
      name: "template",
      message: "Choose a repository template to clone:",
      choices: Object.keys(repos),
    },
    {
      type: "list",
      name: "packageManager",
      message: "Choose a package manager to install dependencies:",
      choices: Object.keys(packageManagers),
      default: "pnpm",
    },
    {
      type: "confirm",
      name: "autoInstall",
      message: "Automatically install dependencies?",
      default: true,
    },
  ];
};

export const cloneRepository = async (
  answers: Answers,
  repos: Record<string, string>,
) => {
  const { destinationPath, template, packageManager, autoInstall } = answers;

  // Get the URL of the selected template
  const url = repos[template];
  const resolvedPath = resolve(process.cwd(), destinationPath);

  const sClone = createSpinner("Cloning the repository").start();

  try {
    await simpleGit().clone(url, resolvedPath);
    sClone.success();
    console.log("Repository cloned successfully!");

    // If autoInstall is true, install dependencies
    if (autoInstall && packageManager !== "none") {
      await installDependencies(resolvedPath, packageManager);
    }
  } catch (error) {
    sClone.error();
    console.error("Error occurred while cloning the repository:", error);
  }
};

export const installDependencies = (
  resolvedPath: string,
  packageManager: string,
) => {
  const sInstall = createSpinner("Installing all the dependencies").start();

  // cd into the cloned repository
  process.chdir(resolvedPath);

  const packageManagerCommand = packageManagers[packageManager];

  exec(packageManagerCommand, (error) => {
    if (error) {
      sInstall.error();
      console.error("Error occurred while installing dependencies:", error);
    } else {
      sInstall.success();
      console.log("Dependencies installed successfully!");
    }
  });
};

const promptUser = async () => {
  try {
    const answers = await inquirer.prompt(
      createPrompts(repos, packageManagers),
    );

    await cloneRepository(answers as Answers, repos);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

promptUser();
