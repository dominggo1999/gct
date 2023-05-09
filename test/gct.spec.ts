import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { cloneRepository } from "~/index";
import { resolve } from "path";
import fs from "fs";
import { rimraf } from "rimraf";

const repos = {
  sample: "https://github.com/dominggo1999/sample-gct",
};

describe("Integration testing", () => {
  const destinationPath = resolve(__dirname, "./test-folder");

  beforeEach(async () => {
    await rimraf(destinationPath);
  });

  afterEach(async () => {
    await rimraf(destinationPath);
  });

  test("should clone the repository", async () => {
    const exampleAnswers = {
      destinationPath,
      template: "sample",
      packageManager: "pnpm",
      autoInstall: false,
    };

    await cloneRepository(exampleAnswers, repos);

    const files = fs.readdirSync(resolve("./test/test-folder"));

    const validFiles = [".gitignore", "pnpm-lock.yaml", "package.json"];

    validFiles.map((file) => {
      expect(files).toContain(file);
    });

    // Not include node_modules
    expect(files).not.toContain("node_modules");
  });
});
