# Install

The `togaf` CLI is zero-dependency Node ESM. Node ≥ 18 is the only requirement.

## 1. Run from a clone (development)

```bash
git clone https://github.com/<you>/togaf-ea-platform.git
cd togaf-ea-platform
npm install
npm run build

# Use the bundled CLI directly
node ./cli/togaf.mjs init   ../my-ea-repo --example
node ./cli/togaf.mjs serve  ../my-ea-repo

# Or via the package script
npm run togaf -- init   ../my-ea-repo --example
npm run togaf -- serve  ../my-ea-repo
```

## 2. Run from a GitHub URL via npx (no local clone)

After you push this repo to GitHub:

```bash
npx -p github:<owner>/togaf-ea-platform togaf init ./my-ea-repo --example
npx -p github:<owner>/togaf-ea-platform togaf serve ./my-ea-repo
```

`npx` will fetch the repository, install its (dev) dependencies, then run the `togaf`
binary declared in `package.json`'s `bin` field. The first run is slow; subsequent runs
are cached by npx.

## 3. Publish to npm and install globally

```bash
npm publish --access public          # one-time, from this repo
npm i -g togaf-ea-platform           # users
togaf init ./my-ea-repo --example    # available everywhere
togaf serve ./my-ea-repo
```

## 4. Use the dashboard alone (no CLI)

If you'd rather just point the dashboard at a folder you've already prepared:

```bash
EA_REPO_PATH=/abs/path/to/my-ea-repo npm run dev
# then http://localhost:3000  →  Settings page can also override at runtime
```

## What `togaf init` writes

Default install (no flags), into `<target>/`:

```
.togaf/togaf.json              # marker
.togaf/templates/*.md          # 24 TOGAF deliverable templates
architecture-repository/...    # empty Architecture Repository skeleton
```

And, depending on `--ide=` (default: all three):

```
.cursor/commands/togaf/*.md    # for Cursor   →  /togaf:rfaw, etc.
.claude/commands/togaf/*.md    # for Claude   →  /togaf:rfaw, etc.
.github/prompts/togaf-*.prompt.md  # for Copilot Chat → /togaf-rfaw, etc.
```

`--example` copies the Northwind Retail demo engagement into
`architecture-repository/engagements/ENG-2026-001-omnichannel/` plus the supporting
shared files in `architecture-capability/`, `standards-information-base/`, etc.

`--force` overwrites any existing files.

## Activating in your IDE

- **Cursor** — slash commands are auto-discovered from `.cursor/commands/`. Open the
  folder in Cursor; type `/` in chat to see the new `/togaf:*` namespace.
- **Claude Code** — same, from `.claude/commands/`.
- **GitHub Copilot Chat** — slash prompts live in `.github/prompts/<name>.prompt.md`.
  Enable "Custom Prompt Files" in your VS Code settings; invoke as `/togaf-<name>`.

## Switching the dashboard's active folder

Three ways:

1. Run `togaf serve <folder>` (the CLI persists `<folder>` to `~/.togaf-ea/config.json`
   and exposes it to the webapp via `EA_REPO_PATH`).
2. Use the in-app **Settings** page to switch at runtime.
3. Set `EA_REPO_PATH=/abs/path` and run the dashboard yourself.

The Settings UI override is the highest-priority resolution source.

## Uninstall

`togaf` writes:
- A marker file at `<target>/.togaf/togaf.json` — safe to delete.
- IDE command files under `.cursor/`, `.claude/`, `.github/prompts/` — delete the `togaf`
  sub-folders / `togaf-*.prompt.md` files.
- A user-level config at `~/.togaf-ea/config.json` — delete the directory to fully reset.

The architecture repository markdown is yours; deleting the toolkit doesn't touch it.
