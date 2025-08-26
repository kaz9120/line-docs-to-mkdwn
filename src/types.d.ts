declare module "turndown-plugin-gfm" {
  type TurndownPlugin = () => void;
  const gfm: TurndownPlugin;
  export { gfm };
}
