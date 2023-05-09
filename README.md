# gct (Git Clone Template)

This is a command-line tool that allows you to clone repositories from a predefined list and optionally install their dependencies using a chosen package manager.

![Demo](/screenshots/demo.gif)

## Installation

1. Make sure you have [Node.js](https://nodejs.org) installed on your system.
2. Clone this repository or download the files.
3. Open a terminal and navigate to the directory where you saved the files.
4. Run the following command to install the required dependencies using **pnpm**:
   `pnpm install`

## Configuration

1. Open the `src/index.ts` file in a text editor.
2. Customize the `repos` object according to your needs. Add or remove entries to specify the repositories you want to clone. The keys represent the names of the repositories, and the values are the corresponding repository URLs.
3. Customize the `packageManagers` object to modify the list of available package managers and their respective commands. Add or remove entries to specify the package managers you want to include. The keys represent the names of the package managers, and the values are the commands to install dependencies using each package manager.

## Build and Install

1. Run the following command to build the package:

   `pnpm build`
2. After the build is successful, run the following command to make the package available globally:

   `npm install -g`

## Usage

Open a terminal and run the following command to clone a repository:
`gct`

**Note:** If you customized the name of the binary in the `package.json` file before building and installing the package, replace "gct" with your custom name in the command mentioned above. This command will prompt you to provide the destination path, select a repository template to clone, choose a package manager, and decide whether to automatically install dependencies.

- **Destination Path**: Enter the path where you want to clone the repository. The default is the current directory.
- **Repository Template**: Choose a repository template from the provided list.
- **Package Manager**: Select a package manager to install dependencies. The default is "pnpm".
- **Automatically Install Dependencies**: Choose whether to automatically install dependencies. If selected, the tool will change into the cloned repository and run the package manager command.
