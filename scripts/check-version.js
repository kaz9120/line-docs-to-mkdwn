#!/usr/bin/env node

/**
 * Version check script for CI
 * Compares the current branch's version with the main branch's version
 * and fails if the current version is not greater than the main version.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Parse semver version string into comparable parts
 * @param {string} version - Version string (e.g., "1.2.3")
 * @returns {number[]} Array of version parts [major, minor, patch]
 */
function parseVersion(version) {
  const parts = version.split(".").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    throw new Error(`Invalid version format: ${version}`);
  }
  return parts;
}

/**
 * Compare two semver versions
 * @param {string} current - Current version
 * @param {string} main - Main branch version
 * @returns {number} 1 if current > main, 0 if equal, -1 if current < main
 */
function compareVersions(current, main) {
  const [curMajor, curMinor, curPatch] = parseVersion(current);
  const [mainMajor, mainMinor, mainPatch] = parseVersion(main);

  if (curMajor !== mainMajor) return curMajor > mainMajor ? 1 : -1;
  if (curMinor !== mainMinor) return curMinor > mainMinor ? 1 : -1;
  if (curPatch !== mainPatch) return curPatch > mainPatch ? 1 : -1;
  return 0;
}

async function main() {
  try {
    // Read current branch's package.json
    const currentPackagePath = resolve(process.cwd(), "package.json");
    const currentPackage = JSON.parse(readFileSync(currentPackagePath, "utf8"));
    const currentVersion = currentPackage.version;

    // Read main branch's package.json
    const mainPackagePath = resolve(process.cwd(), "package.json.main");
    const mainPackage = JSON.parse(readFileSync(mainPackagePath, "utf8"));
    const mainVersion = mainPackage.version;

    console.log(`Current branch version: ${currentVersion}`);
    console.log(`Main branch version: ${mainVersion}`);

    const comparison = compareVersions(currentVersion, mainVersion);

    if (comparison === 0) {
      console.error("\n❌ Error: Version has not been updated!");
      console.error(
        `Current version (${currentVersion}) is the same as main branch version.`,
      );
      console.error("\nPlease update the version in package.json:");
      console.error(
        "  - New feature: Increment minor version (e.g., 1.3.0 → 1.4.0)",
      );
      console.error(
        "  - Bug fix: Increment patch version (e.g., 1.3.2 → 1.3.3)",
      );
      console.error(
        "  - Breaking change: Increment major version (e.g., 1.3.0 → 2.0.0)",
      );
      process.exit(1);
    }

    if (comparison < 0) {
      console.error("\n❌ Error: Version is lower than main branch!");
      console.error(
        `Current version (${currentVersion}) is lower than main branch version (${mainVersion}).`,
      );
      console.error(
        "\nPlease update the version in package.json to be greater than the main branch version.",
      );
      process.exit(1);
    }

    console.log(
      `\n✅ Version check passed: ${currentVersion} > ${mainVersion}`,
    );
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
