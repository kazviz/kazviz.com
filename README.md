<div align="center">


# KazViz.com

![SolidJS](https://img.shields.io/badge/SolidJS-2c4f7c?style=for-the-badge&logo=solid&logoColor=c8c9cb)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![SCSS](https://img.shields.io/badge/SCSS-%23cd6799.svg?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh)  
![Conventional Commits](https://img.shields.io/badge/commit-conventional-blue.svg)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

</div>


KazViz.com is a personal website built with **SolidStart**, **SolidJS**, and **Bun** for high performance, modern reactivity, and extreme modularity.

This website serves as a platform for experiments, documentation, and showcasing my works and thoughts digitally.

## Tech Stack

-   **SolidStart**: Full-stack web framework powered by SolidJS and Vite.
-   **SolidJS**: Reactive UI library with granular reactivity and no runtime overhead.
-   **SCSS (per component)**: Local styles with nested structure.
-   **Bun**: Super-fast JavaScript/TypeScript runtime and bundler.
-   **TypeScript**: Strict typing and IDE support.
-   **Lucide Icons + inline SVG**: Consistent and flexible icon system.

## Features

-   Clean **component-driven** architecture.
-   Extremely fast client/server performance with Solid's reactivity model.
-   Native support for **modular SCSS** per component.
-   Theme engine with **runtime CSS variables**.
-   Isomorphic routing and rendering.
-   Ready for future integrations: AI, personalization, real-time interactions.
-   Clean and readable HTML output.

## Project Structure

```txt

fe-core/
├── public/                 # Static assets
├── src/
│   ├── components/         # UI components
│   ├── layouts/            # Layout shells
│   ├── routes/             # Pages and route files
│   ├── styles/             # Global and shared SCSS
│   ├── lib/                # Helper functions
│   ├── hooks/              # Reactive logic
│   ├── theme/              # Theme logic (CSS vars, persistence)
│   ├── data/               # JSON/structured content
│   ├── config/             # Static config / runtime settings
│   └── entry-server.tsx    # SolidStart SSR entry point
├── .env.example
├── bun.lockb
├── tsconfig.json
├── vite.config.ts
└── solid.config.ts

```

## How to Run

1. **Clone the repo**:

```bash
git clone https://github.com/kazviz/kazviz.com.git
cd kazviz.com
```

2. **Install dependencies (Bun)**:

```bash
bun install
```

3. **Run the dev server**:

```bash
bun run dev
```

4. **Build for production**:

```bash
bun run build
```

5. **Preview the production build**:

```bash
bun run preview
```

## Theme Engine

KazViz.com supports dynamic theming using native CSS variables.

-   Custom theme via runtime `applyTheme()`
-   Persistent with `localStorage`
-   Ready for future adaptation: AI/user progress

See: `src/theme/index.ts` for theming logic.

## Philosophy

-   Minimalist, powerful, easy to read
-   Performance-focused: everything reactive, no waste
-   Easy to maintain and develop
-   Developer-friendly

## Contribution

This project is personal, but feedback and suggestions are very welcome! If you'd like to contribute, please create an issue or pull request.

### Commit Types

| Type       | Meaning                           |
| ---------- | --------------------------------- |
| `feat`     | New feature                       |
| `fix`      | Bug fix                           |
| `docs`     | Documentation only                |
| `style`    | Code formatting/style             |
| `refactor` | Refactor without behavior change  |
| `test`     | Add/improve tests                 |
| `ci`       | Setup/modify CI/CD                |
| `chore`    | Tooling, build, etc.              |

## License

This project is privately licensed by Kaizan Sultan.
Do not distribute or copy without explicit permission.

See [LICENSE](LICENSE) for details.

## CI: build metadata

To ensure the client detects new deployments and updates the i18n cache, generate the `public/build.json` file during CI builds.

Example (GitHub Actions):

```yaml
 - name: Write build metadata
	 run: |
		 git rev-parse --short HEAD > /tmp/sha
		 export VITE_BUILD_ID=$(cat /tmp/sha)
		 bun run build:json
```

Or call the helper directly (shell):

```bash
# prefer CI env var, fallback to git
VITE_BUILD_ID=${VITE_BUILD_ID:-$(git rev-parse --short HEAD)} \
	bun run build:json
```

This will create `public/build.json` containing `{ "version": "<value>" }` which the client checks at startup.
