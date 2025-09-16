declare module "turndown-plugin-gfm" {
  import type TurndownService from "turndown";
  type TurndownPlugin = (service: TurndownService) => void;
  const gfm: TurndownPlugin;
  export { gfm };
}
