# Guide Prettier (formatage automatique du code)

Ce guide explique comment ajouter et utiliser Prettier dans ce projet TypeScript/Node sous Windows (PowerShell), avec une config prête à l'emploi et des scripts npm.

---

## 1) Installer Prettier

```powershell
# Installer Prettier comme dépendance de développement
npm i -D prettier
```

Extension VS Code recommandée: "Prettier - Code formatter" (esbenp.prettier-vscode).

---

## 2) Fichiers de configuration

Créez ces fichiers à la racine du projet.

### 2.1 `.prettierrc.json`

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

Explications rapides:

- `singleQuote`: guillemets simples pour JS/TS
- `trailingComma`: virgules finales où possible (meilleurs diffs)
- `endOfLine: lf`: évite le bruit de fin de ligne entre OS (voir optionnel .gitattributes ci-dessous)

### 2.2 `.prettierignore`

```gitignore
node_modules
.dist
coverage
build
dist
package-lock.json
pnpm-lock.yaml
yarn.lock
.env
*.log
```

Ajustez selon vos besoins (ajoutez par ex. `generated/` si vous avez du code généré).

---

## 3) Scripts npm pratiques

Ajoutez dans `package.json` (section `scripts`):

```jsonc
{
  "scripts": {
    "format": "prettier . --write",
    "format:check": "prettier . --check",
  },
}
```

- `format`: formate tous les fichiers suivis (respecte `.prettierignore`).
- `format:check`: vérifie sans modifier (utile en CI).

Utilisation:

```powershell
npm run format
npm run format:check
```

---

## 4) Intégration VS Code (format on save)

Créez/éditez `.vscode/settings.json` (optionnel mais recommandé):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[javascript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[json]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[markdown]": { "editor.defaultFormatter": "esbenp.prettier-vscode" }
}
```

Cela assure que VS Code applique Prettier à l'enregistrement.

---

## 5) Hooks Git (optionnel mais utile)

Pour empêcher l'introduction de code non formaté:

```powershell
npm i -D husky lint-staged
npx husky init
```

Ajoutez dans `package.json`:

```jsonc
{
  "lint-staged": {
    "*.{ts,js,json,md}": "prettier --write",
  },
}
```

Puis éditez `.husky/pre-commit` pour exécuter lint-staged:

```sh
npx lint-staged
```

---

## 6) Conseils et dépannage

- Si vous voyez des changements de fin de ligne entre Windows et Linux/macOS, gardez `endOfLine: lf` et ajoutez (optionnel) un `.gitattributes`:

```gitattributes
* text=auto eol=lf
```

- Conflits avec ESLint: si vous ajoutez ESLint plus tard, utilisez `eslint-config-prettier` pour désactiver les règles en conflit.
- Pour formater seulement le code source TS: `prettier "src/**/*.{ts,tsx}" --write`.
- Exécuter ponctuellement sans script: `npx prettier . --write`.

---

## 7) Récapitulatif rapide (PowerShell)

```powershell
npm i -D prettier
# (optionnel) husky + lint-staged
# npm i -D husky lint-staged
# npx husky init

# Config fichiers à créer:
# - .prettierrc.json
# - .prettierignore
# - (optionnel) .vscode/settings.json
# - (optionnel) .gitattributes

# Scripts utiles dans package.json:
#   "format": "prettier . --write"
#   "format:check": "prettier . --check"

# Utilisation
npm run format
npm run format:check
```

Ce guide est conçu pour fonctionner immédiatement avec la structure actuelle du projet (`src/`, `dist/`). Adaptez les patterns si vous changez l’arborescence.
