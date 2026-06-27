# DB search — Dragon Ball character database

> Eindopdracht Frontend
> Een interactieve React-applicatie die data ophaalt uit de [Dragon Ball API](https://web.dragonball-api.com/documentation) en gebruikersbeheer regelt via de NOVI Dynamic API.


> Base URL Novi Dynamic API: (https://novi-backend-api-wgsgz.ondigitalocean.app/)


## Inhoudsopgave

1. [Inleiding](#inleiding)
2. [Kernfunctionaliteiten](#kernfunctionaliteiten)
2. [Screenshot](#screenshot)
3. [Benodigdheden](#benodigdheden)
4. [De applicatie draaien](#de-applicatie-draaien)
5. [Configuratie & API-keys](#configuratie--api-keys)
6. [Overige commando's](#overige-commandos)
7. [Testgebruikers](#testgebruikers)
8. [Project structuur](#project-structuur)

---

## Inleiding

**Het probleem:** veel mensen hebben nog nooit van Dragon Ball gehoord, en al helemaal niet van de characters die zich in dat universum verschuilen. **DB search** lost dit op door een laagdrempelige database te bieden waarin gebruikers de characters kunnen ontdekken — met naam, ras, gender, ki, total ki, affiliation en oorsprong.

### Kernfunctionaliteiten

1. **Registreren en inloggen** via de NOVI Dynamic API.
2. **Zoeken en filteren** van characters (naam, ras, gender, side, power level en als ik tijd over heb ook op planeet).
3. **Favorieten** — toevoegen en verwijderen van characters, gekoppeld aan een ingelogd account.
4. **Random character** — één klik op de Random-knop toont een willekeurige warrior uit de Dragonball API.

> Optionele extra filters (planeet) worden ook geïmplementeerd als ik tijd over heb.

De applicatie is geschreven in **JavaScript + React** (geen TypeScript), met **eigen CSS** (geen Tailwind/Bootstrap/MUI), **React Context** voor state management (geen Redux) en **React Router** voor de navigatie.

## Screenshot

![DB search Discover screen](./docs/Scherm­afbeelding%202026-06-23%20om%2018.18.14.png)

Dit is een voorproefje van mijn mainpage genaamd: Discover.

## Benodigdheden

- **Node.js** ≥ 18 (LTS aanbevolen) — [download](https://nodejs.org)
- **npm** ≥ 9 (wordt meegeleverd met Node)
- Een moderne browser (Chrome, Firefox, Safari, Edge)
- Een **NOVI Dynamic API key** voor authenticatie (zie [Configuratie](#configuratie--api-keys))

Gebruikte technieken / frameworks:

| Techniek | Versie | Waarvoor |
|---|---|---|
| React | 19 | UI rendering |
| React Router | 7 | Client-side routing |
| Vite | 7 | Build tool / dev server |
| Dragon Ball API | publiek | Karakterdata |
| NOVI Dynamic API | — | Authenticatie & userbeheer |

## De applicatie draaien

```bash
# 1. Installeer de dependencies
npm install
# 2. Kopieer het voorbeeld-env-bestand en vul je NOVI project-ID in
cp .env.example .env
# 3. Start de dev-server
npm run dev
```

De applicatie draait standaard op [http://localhost:5173](http://localhost:5173).

## Openen in WebStorm

Het project is een standaard **Vite + React (JavaScript)** project en werkt direct in WebStorm zonder extra configuratie.

1. **File → Open…** en selecteer de root van dit project (de map met `package.json`).
2. WebStorm detecteert automatisch `package.json` en stelt voor de dependencies te installeren — klik **Run 'npm install'** (of gebruik de terminal: `npm install`).
3. WebStorm leest `jsconfig.json` automatisch in, waardoor het pad-alias `@/*` (verwijzend naar `src/*`) werkt voor autocompletion en "Go to declaration".
4. **Node-versie:** zorg dat WebStorm Node ≥ 18 gebruikt (`.nvmrc` staat op 20). Instellen via *Settings → Languages & Frameworks → Node.js*.
5. **Code-stijl:** het project bevat een `.editorconfig` (2 spaces, LF, UTF-8). WebStorm respecteert deze instellingen automatisch.
6. **ESLint:** ga naar *Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint* en kies **Automatic ESLint configuration** — `eslint.config.js` wordt opgepikt.
7. **Run-configuraties:** klik in `package.json` op het ▶︎-pictogram naast `dev`, `build` of `lint` om ze als WebStorm Run Configuration te starten.

## Configuratie & API-keys

Voor authenticatie wordt de **NOVI Backend API** gebruikt. De API-URL en het project-ID worden uit een `.env`-bestand gelezen door Vite. Kopieer hiervoor `.env.example` naar `.env`:

```env
VITE_NOVI_API_URL=https://novi-backend-api-wgsgz.ondigitalocean.app/api
VITE_NOVI_PROJECT_ID=<vul hier mijn ID in>
```

Het `.env`-bestand staat in `.gitignore` en wordt niet meegecommit. Bij inlevering wordt het ingevulde `.env`-bestand (samen met het persoonlijke `novi-config.json`) meegestuurd in de ZIP-upload, zoals voorgeschreven in de eindopdracht.
De Dragon Ball API vereist géén key — die wordt direct vanuit de browser opgevraagd en opgegeven.

## Overige commando's

| Command | Doel                                                       |
|---|------------------------------------------------------------|
| `npm run dev` | Start de Vite dev-server (hot reload) op `localhost:5173`. |

## Testgebruikers

De volgende gebruiker is geregistreerd in de NOVI Backend en kan gebruikt worden om direct in te loggen zonder zelf een account aan te hoeven maken:
| Email | Wachtwoord | Rollen |
|---|---|---|
| `demo@novi.nl` | `novinovi` | `admin`, `users` |
Een nieuw account aanmaken kan uiteraard ook via de **Sign up**-pagina.

## Project structuur

```
src/
├── App.jsx                                        # Routes
├── main.jsx                                       # ReactDOM entry, providers
├── assets/                                        # Afbeeldingen
├── components/
│   ├── CharCard/CharCard.jsx + .css               # Herbruikbare karakterkaart
│   ├── Nav/Nav.jsx + .css                         # Bovenste navigatie
│   ├── ProtectedRoute/ProtectedRoute.jsx + .css   # Auth-guard component
│   └── Statbar/StatBar.jsx                        # Herbruikbare power-bar
├── context/
│   ├── AuthContext.jsx                            # NOVI auth state (login, register, logout)
│   └── FavoritesContext.jsx                       # Favorieten per gebruiker
├── helpers/
│   └── api.js                                     # Dragon Ball API client
└── pages/
    ├── CharacterDetail/CharacterDetail.jsx + .css # /character/:id
    ├── Discover/Discover.jsx + .css               # / — zoeken + filters + grid
    ├── Favorites/Favorites.jsx + .css             # /favorites (protected)
    ├── Profile/Profile.jsx + .css                 # /profile  (protected)
    ├── SignIn/SignIn.jsx                          # /signin
    ├── SignUp/SignUp.jsx                          # /signup
    ├── Auth.css                                   # ..
    └── NotFound.jsx                               # 404
└── styles/global.css                              # Design tokens + utility classes
```
