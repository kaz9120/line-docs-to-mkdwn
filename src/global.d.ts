export interface BaseFrontMatter {
  url: string;
  copied_at: string;
}

export interface NewsFrontMatter extends BaseFrontMatter {
  tags?: string[];
}

export interface DocumentFrontMatter extends BaseFrontMatter {}

export interface GlossaryFrontMatter extends BaseFrontMatter {}

export type FrontMatter =
  | NewsFrontMatter
  | DocumentFrontMatter
  | GlossaryFrontMatter;
