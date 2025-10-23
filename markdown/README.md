# Generated Markdown Files

This directory contains Markdown files automatically generated from LINE Developers documentation pages.

## Structure

```
markdown/
└── docs/
    ├── basics/
    │   └── channel-access-token.md
    ├── messaging-api/
    │   ├── overview.md
    │   └── sending-messages.md
    └── line-login/
        └── overview.md
```

## How it works

1. URLs are defined in `urls.json` at the project root
2. Run `npm run generate:markdown` to generate/update all Markdown files
3. The E2E test suite uses the Chrome extension to convert HTML to Markdown
4. Files are automatically saved to the paths specified in `urls.json`

## CI/CD

GitHub Actions automatically validates that these files are up-to-date on every pull request.
If the markdown files don't match the latest version of the documentation pages, the CI will fail.

## Manual Generation

To regenerate all markdown files:

```bash
npm run generate:markdown
```

To validate markdown files are up-to-date:

```bash
npm run validate:markdown
```
