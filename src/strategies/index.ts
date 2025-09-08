import type { PageStrategy } from "../page-strategies";
import { DocumentPageStrategy } from "./document-strategy";
import { GlossaryPageStrategy } from "./glossary-strategy";
import { NewsPageStrategy } from "./news-strategy";

export const PAGE_STRATEGIES: ReadonlyArray<PageStrategy> = [
  new GlossaryPageStrategy(), // 優先度高（特定のページ）
  new NewsPageStrategy(),
  new DocumentPageStrategy(), // 優先度低（汎用）
] as const;

export function detectCurrentPageStrategy(): PageStrategy | null {
  return PAGE_STRATEGIES.find((strategy) => strategy.detectPage()) || null;
}

export { DocumentPageStrategy, GlossaryPageStrategy, NewsPageStrategy };
export type { PageStrategy } from "../page-strategies";
