import { DocumentPageStrategy } from "./document-strategy";
import { NewsPageStrategy } from "./news-strategy";
import type { PageStrategy } from "../page-strategies";

export const PAGE_STRATEGIES: ReadonlyArray<PageStrategy> = [
  new NewsPageStrategy(),
  new DocumentPageStrategy(),
] as const;

export function detectCurrentPageStrategy(): PageStrategy | null {
  return PAGE_STRATEGIES.find((strategy) => strategy.detectPage()) || null;
}

export { DocumentPageStrategy, NewsPageStrategy };
export type { PageStrategy } from "../page-strategies";
