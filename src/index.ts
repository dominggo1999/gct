#!/usr/bin/env node

import inquirer from "inquirer";
import simpleGit from "simple-git";
import { resolve } from "path";

const repos = {
  "t3-antd": "https://github.com/dominggo1999/turbo-t3-antd-template",
  t3: "https://github.com/dominggo1999/turbo-next-t3-template",
  "turbo-expo-next": "https://github.com/dominggo1999/turbo-expo-next",
  node: "https://github.com/dominggo1999/node-typescript-boilerplate",
  "cypress-ts": "https://github.com/dominggo1999/cypress-ts-cucumber-template",
};

// Prompt the user for the destination path and template choice
inquirer
  .prompt([
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
  ])
  .then((answers) => {
    const { destinationPath, template } = answers as {
      destinationPath: string;
      template: string;
    };

    // Get the URL of the selected template
    const url = repos[template];

    // Clone the repository
    simpleGit().clone(
      url,
      resolve(process.cwd(), destinationPath),
      null,
      (error) => {
        if (error) {
          console.error("Error occurred while cloning the repository:", error);
        } else {
          console.log("Repository cloned successfully!");
        }
      },
    );
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
