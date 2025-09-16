import type { FrontMatter } from "./global";

export function generateFrontMatter(metadata: FrontMatter): string {
  const lines: string[] = ["---"];

  lines.push(`url: ${metadata.url}`);
  lines.push(`copied_at: ${metadata.copied_at}`);

  // ニュースページの場合のみタグを追加
  if ("tags" in metadata && metadata.tags && metadata.tags.length > 0) {
    lines.push("tags:");
    for (const tag of metadata.tags) {
      lines.push(`  - "${escapeYamlString(tag)}"`);
    }
  }

  lines.push("---");

  return `${lines.join("\n")}\n`;
}

function escapeYamlString(str: string): string {
  return str.replace(/"/g, '\\"');
}
