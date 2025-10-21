#!/usr/bin/env node

/**
 * Version check script for CI
 * Compares the current branch's version with the main branch's version
 * and fails if the current version is not greater than the main version.
 *
 * Uses semver library for robust version comparison that supports:
 * - Standard versions (1.2.3)
 * - Pre-release versions (1.2.3-alpha.1)
 * - Build metadata (1.2.3+build.456)
 */

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import semver from "semver";

async function main() {
  try {
    // Read current branch's package.json
    const currentPackagePath = resolve(process.cwd(), "package.json");
    const currentPackage = JSON.parse(readFileSync(currentPackagePath, "utf8"));
    const currentVersion = currentPackage.version;

    // Validate current version exists
    if (!currentVersion) {
      throw new Error("version field not found in current package.json");
    }

    // Get main branch's package.json directly via git
    // Try origin/main first, fallback to main if not available
    let mainPackageContent;
    try {
      mainPackageContent = execSync("git show origin/main:package.json", {
        encoding: "utf8",
      });
    } catch {
      mainPackageContent = execSync("git show main:package.json", {
        encoding: "utf8",
      });
    }
    const mainPackage = JSON.parse(mainPackageContent);
    const mainVersion = mainPackage.version;

    // Validate main version exists
    if (!mainVersion) {
      throw new Error("version field not found in main branch's package.json");
    }

    console.log(`Current branch version: ${currentVersion}`);
    console.log(`Main branch version: ${mainVersion}`);

    // Use semver library for robust version comparison
    if (semver.gt(currentVersion, mainVersion)) {
      console.log(
        `\n✅ Version check passed: ${currentVersion} > ${mainVersion}`,
      );
    } else {
      // Version is same or lower than main
      const isSame = semver.eq(currentVersion, mainVersion);

      if (isSame) {
        console.error(`
❌ Error: Version has not been updated!
Current version (${currentVersion}) is the same as main branch version.

Please update the version in package.json:
  - New feature: Increment minor version (e.g., 1.3.0 → 1.4.0)
  - Bug fix: Increment patch version (e.g., 1.3.2 → 1.3.3)
  - Breaking change: Increment major version (e.g., 1.3.0 → 2.0.0)
`);
      } else {
        console.error(`
❌ Error: Version is lower than main branch!
Current version (${currentVersion}) is lower than main branch version (${mainVersion}).

Please update the version in package.json to be greater than the main branch version.
`);
      }

      process.exit(1);
    }
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
