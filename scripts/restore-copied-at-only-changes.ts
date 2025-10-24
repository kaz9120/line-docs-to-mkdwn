#!/usr/bin/env tsx

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

/**
 * copied_atフィールドのみが変更されているファイルを検出し、変更を破棄するスクリプト
 */

interface DiffStats {
	total: number;
	copiedAtOnly: number;
	otherChanges: number;
	restored: string[];
	kept: string[];
}

/**
 * フロントマターのcopied_atフィールドを除外した内容を返す
 */
function removeCopiedAt(content: string): string {
	return content.replace(/^copied_at:.*$/m, "");
}

/**
 * Gitの差分からcopied_atのみの変更かどうかを判定
 */
function isCopiedAtOnlyChange(filePath: string): boolean {
	try {
		// HEADとWorking Directoryの内容を取得
		const headContent = execSync(`git show HEAD:"${filePath}"`, {
			encoding: "utf8",
		});
		const workingContent = readFileSync(filePath, "utf8");

		// copied_atを除外して比較
		const headWithoutCopiedAt = removeCopiedAt(headContent);
		const workingWithoutCopiedAt = removeCopiedAt(workingContent);

		return headWithoutCopiedAt === workingWithoutCopiedAt;
	} catch (error) {
		// ファイルがHEADに存在しない場合など
		console.error(`Error checking ${filePath}:`, error);
		return false;
	}
}

/**
 * 変更されたMarkdownファイルのリストを取得
 */
function getModifiedMarkdownFiles(): string[] {
	try {
		const output = execSync("git diff --name-only -- 'markdown/**/*.md'", {
			encoding: "utf8",
			shell: "/bin/bash",
		});
		return output.trim().split("\n").filter(Boolean);
	} catch {
		return [];
	}
}

/**
 * メイン処理
 */
function main() {
	console.log("Checking modified markdown files...\n");

	const modifiedFiles = getModifiedMarkdownFiles();

	if (modifiedFiles.length === 0) {
		console.log("No modified markdown files found.");
		return;
	}

	const stats: DiffStats = {
		total: modifiedFiles.length,
		copiedAtOnly: 0,
		otherChanges: 0,
		restored: [],
		kept: [],
	};

	console.log(`Found ${modifiedFiles.length} modified files.\n`);

	for (const file of modifiedFiles) {
		const isCopiedAtOnly = isCopiedAtOnlyChange(file);

		if (isCopiedAtOnly) {
			console.log(`✓ ${file} (copied_at only - will restore)`);
			stats.copiedAtOnly++;
			stats.restored.push(file);
		} else {
			console.log(`✗ ${file} (has other changes - will keep)`);
			stats.otherChanges++;
			stats.kept.push(file);
		}
	}

	console.log("\n" + "=".repeat(80));
	console.log("Summary:");
	console.log(`Total modified files: ${stats.total}`);
	console.log(`Files with copied_at only: ${stats.copiedAtOnly}`);
	console.log(`Files with other changes: ${stats.otherChanges}`);
	console.log("=".repeat(80) + "\n");

	if (stats.restored.length === 0) {
		console.log("No files to restore.");
		return;
	}

	// 確認プロンプト
	console.log(
		`About to restore ${stats.restored.length} files with copied_at-only changes.`,
	);
	console.log("Press Ctrl+C to cancel, or Enter to continue...");

	// Node.jsの標準入力待機
	process.stdin.once("data", () => {
		console.log("\nRestoring files...");

		for (const file of stats.restored) {
			try {
				execSync(`git restore "${file}"`, { stdio: "pipe" });
				console.log(`✓ Restored: ${file}`);
			} catch (error) {
				console.error(`✗ Failed to restore: ${file}`, error);
			}
		}

		console.log(
			`\n✓ Successfully restored ${stats.restored.length} files.`,
		);
		console.log(
			`Kept ${stats.kept.length} files with meaningful changes.`,
		);
	});
}

main();
