# 🎬 CineTech - Cours Récapitulatif Complet

## 📋 Table des Matières
1. [Vue d'ensemble du projet](#vue-densemble)
2. [Technologies utilisées](#technologies)
3. [Installation et configuration](#installation)
4. [Architecture du projet](#architecture)
5. [Concepts clés React](#concepts-react)
6. [Intégration API TMDB](#api-tmdb)
7. [Routing et Navigation](#routing)
8. [Gestion de l'état local](#state-management)
9. [Composants principaux](#composants)
10. [Hooks personnalisés](#hooks)
11. [CSS et Styling](#styling)
12. [Fonctionnalités avancées](#fonctionnalites)

---

## 🎯 Vue d'ensemble du projet {#vue-densemble}

**CineTech** est une application web moderne de découverte de films et séries, inspirée de Netflix/Disney+, qui permet de :
- 🔍 Parcourir des films et séries populaires
- 📺 Voir des détails complets (synopsis, bande-annonce, note)
- ❤️ Gérer une liste de favoris
- 💬 Lire et ajouter des commentaires
- 🔎 Rechercher des contenus

---

## 🛠️ Technologies utilisées {#technologies}

### Core
- **React 19.2.0** - Bibliothèque UI moderne
- **Vite 7.2.4** - Build tool ultra-rapide
- **React Router DOM 7.13.0** - Gestion de la navigation

### Dépendances
- **react-hot-toast** - Notifications élégantes
- **react-icons** - Icônes (FontAwesome, etc.)

### API
- **TMDB (The Movie Database)** - Base de données de films/séries

---

## 🚀 Installation et configuration {#installation}

### Étape 1 : Initialiser le projet

```bash
# Créer un nouveau projet Vite avec React
npm create vite@latest cinetech -- --template react

# Aller dans le dossier
cd cinetech

# Installer les dépendances de base
npm install
```

### Étape 2 : Installer les dépendances supplémentaires

```bash
npm install react-router-dom react-hot-toast react-icons
```

### Étape 3 : Configurer l'API TMDB

1. Créer un compte sur [TMDB](https://www.themoviedb.org/)
2. Obtenir une clé API dans Settings > API
3. Créer un fichier `.env` à la racine :

```env
VITE_API_KEY=votre_cle_api_ici
```

⚠️ **Important** : Ajouter `.env` au `.gitignore` pour ne pas exposer votre clé !

### Étape 4 : Structure des dossiers

```bash
src/
├── assets/          # Images, logos
├── components/      # Composants réutilisables
│   ├── Header/
│   ├── MovieCard/
│   ├── Row/
│   ├── Button/
│   ├── FavoriteButton/
│   ├── Comments/
│   ├── Rating/
│   ├── BtnReturn/
│   └── Catalogue/
├── pages/           # Pages principales
│   ├── Home/
│   ├── Detail/
│   ├── Favoris/
│   └── Search/
├── hooks/           # Hooks personnalisés
│   ├── useFetch.js
│   └── useMovieData.js
├── utils/           # Utilitaires
│   └── api.js
├── App.jsx          # Composant racine
├── main.jsx         # Point d'entrée
└── index.css        # Styles globaux
```

---

## 🏗️ Architecture du projet {#architecture}

### Principe de composition

Le projet suit une architecture **composant-orientée** :
- **Pages** = composants de haut niveau (routes)
- **Components** = blocs réutilisables
- **Hooks** = logique métier réutilisable
- **Utils** = fonctions utilitaires

### Flux de données

```
API TMDB → useFetch/useMovieData → Components → UI
                ↓
         localStorage (favoris, commentaires)
```

---

## ⚛️ Concepts clés React {#concepts-react}

### 1. Composants fonctionnels

Tous les composants utilisent la syntaxe moderne :

```jsx
function MonComposant({ prop1, prop2 }) {
    return <div>{prop1}</div>;
}

export default MonComposant;
```

### 2. Hooks essentiels

#### `useState` - Gérer l'état local
```jsx
const [count, setCount] = useState(0);
const [isOpen, setIsOpen] = useState(false);
```

#### `useEffect` - Effets de bord (appels API, etc.)
```jsx
useEffect(() => {
    // Code exécuté après le rendu
    fetchData();
}, [dependency]); // Se réexécute si dependency change
```

### 3. Props

Passer des données entre composants :

```jsx
// Parent
<MovieCard movie={movieData} />

// Enfant
function MovieCard({ movie }) {
    return <h2>{movie.title}</h2>;
}
```

### 4. Conditional Rendering

```jsx
if (loading) return <div>Chargement...</div>;
if (error) return <div>Erreur</div>;
if (!data) return null;

return <div>Contenu</div>;
```

---

## 🌐 Intégration API TMDB {#api-tmdb}

### Configuration API (`src/utils/api.js`)

```javascript
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const getUrl = (endpoint, params = {}) => {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('language', 'fr-FR');

    Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
    });

    return url.toString();
};

export { API_KEY, getUrl };
```

**Points clés** :
- ✅ `import.meta.env.VITE_API_KEY` pour accéder aux variables d'environnement Vite
- ✅ `language=fr-FR` pour du contenu en français
- ✅ Fonction générique pour construire les URLs

---

### 📖 Explication détaillée de la fonction `getUrl`

#### Signature de la fonction

```javascript
const getUrl = (endpoint, params = {}) => { ... }
```

**Paramètres** :
- `endpoint` : Le chemin de l'API (ex: `/movie/popular`, `/search/multi`)
- `params = {}` : Objet contenant des paramètres supplémentaires (valeur par défaut = objet vide)

**Retour** : Une URL complète sous forme de chaîne de caractères

---

#### Ligne par ligne

##### 1️⃣ Création de l'objet URL

```javascript
const url = new URL(`${BASE_URL}${endpoint}`);
```

**Qu'est-ce que `new URL()` ?**
- C'est un constructeur JavaScript natif qui crée un objet URL
- Permet de manipuler facilement les URLs et leurs paramètres
- Alternative moderne à la concaténation manuelle de strings

**Exemple concret** :
```javascript
// Si BASE_URL = "https://api.themoviedb.org/3"
// Et endpoint = "/movie/popular"
const url = new URL("https://api.themoviedb.org/3/movie/popular");
// url est maintenant un objet avec plein de propriétés utiles !
```

**Propriétés de l'objet URL** :
```javascript
console.log(url.href);           // URL complète
console.log(url.origin);         // https://api.themoviedb.org
console.log(url.pathname);       // /3/movie/popular
console.log(url.searchParams);   // URLSearchParams (pour gérer ?key=value)
```

---

##### 2️⃣ Ajout de la clé API

```javascript
url.searchParams.append('api_key', API_KEY);
```

**Qu'est-ce que `searchParams` ?**
- Propriété de l'objet URL qui gère les query parameters (les `?key=value&key2=value2`)
- Type : `URLSearchParams` - interface pour manipuler les paramètres d'URL

**La méthode `.append(key, value)` :**
- Ajoute un nouveau paramètre à l'URL
- Équivalent à ajouter `?api_key=votre_cle` à l'URL

**Avant** :
```
https://api.themoviedb.org/3/movie/popular
```

**Après** :
```
https://api.themoviedb.org/3/movie/popular?api_key=abc123xyz
```

---

##### 3️⃣ Ajout de la langue

```javascript
url.searchParams.append('language', 'fr-FR');
```

**Pourquoi `fr-FR` ?**
- Format : code langue + code pays (ISO 639-1 + ISO 3166-1)
- `fr` = français
- `FR` = France
- TMDB utilise ce paramètre pour renvoyer titres, synopsis, etc. en français

**URL résultante** :
```
https://api.themoviedb.org/3/movie/popular?api_key=abc123&language=fr-FR
```

**Autres langues possibles** :
- `en-US` : Anglais américain
- `es-ES` : Espagnol
- `de-DE` : Allemand

---

##### 4️⃣ Ajout des paramètres personnalisés

```javascript
Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
});
```

**Décortiquons cette ligne complexe** :

###### a) `Object.keys(params)`
Retourne un tableau contenant toutes les clés de l'objet `params`

```javascript
// Exemple
const params = { page: 2, with_genres: 28 };
Object.keys(params); // ['page', 'with_genres']
```

###### b) `.forEach(key => { ... })`
Boucle sur chaque clé du tableau

```javascript
// Équivalent à :
for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    // ...
}
```

###### c) `url.searchParams.append(key, params[key])`
Pour chaque clé, ajoute le paramètre avec sa valeur

```javascript
// Si params = { page: 2, with_genres: 28 }

// Itération 1 : key = 'page'
url.searchParams.append('page', params['page']); // append('page', 2)

// Itération 2 : key = 'with_genres'
url.searchParams.append('with_genres', params['with_genres']); // append('with_genres', 28)
```

**URL finale** :
```
https://api.themoviedb.org/3/movie/popular?api_key=abc123&language=fr-FR&page=2&with_genres=28
```

---

##### 5️⃣ Conversion en chaîne de caractères

```javascript
return url.toString();
```

**Pourquoi `.toString()` ?**
- L'objet `URL` doit être converti en string pour être utilisé par `fetch()`
- `.toString()` génère l'URL complète avec tous les paramètres

```javascript
typeof url;              // "object"
typeof url.toString();   // "string"
```

---

#### 🎯 Exemple complet d'utilisation

```javascript
// Appel simple
const url1 = getUrl('/movie/popular');
// Résultat : "https://api.themoviedb.org/3/movie/popular?api_key=abc123&language=fr-FR"

// Appel avec paramètres
const url2 = getUrl('/movie/popular', { page: 2 });
// Résultat : "https://api.themoviedb.org/3/movie/popular?api_key=abc123&language=fr-FR&page=2"

// Appel avec plusieurs paramètres
const url3 = getUrl('/discover/movie', { 
    with_genres: 28,
    year: 2024,
    sort_by: 'popularity.desc'
});
// Résultat : "https://api.themoviedb.org/3/discover/movie?api_key=abc123&language=fr-FR&with_genres=28&year=2024&sort_by=popularity.desc"
```

---

#### 🔄 Comparaison : Avec vs Sans `URL()`

**❌ Méthode manuelle (mauvaise pratique)** :
```javascript
// Difficile à maintenir, risque d'erreurs
const url = BASE_URL + endpoint + '?api_key=' + API_KEY + '&language=fr-FR';
```

**✅ Avec `URL()` (bonne pratique)** :
```javascript
const url = new URL(`${BASE_URL}${endpoint}`);
url.searchParams.append('api_key', API_KEY);
// Propre, lisible, maintenable !
```

---

#### 💡 Avantages de cette approche

1. **Sécurité** : Les valeurs sont automatiquement encodées (espaces → `%20`, etc.)
2. **Lisibilité** : Code clair et facile à comprendre
3. **Maintenance** : Facile d'ajouter/modifier des paramètres
4. **Réutilisabilité** : Une seule fonction pour toutes les requêtes
5. **Évite les bugs** : Pas de risque d'oublier `?` ou `&`

---

#### 🧪 Test dans la console

Vous pouvez tester cette fonction directement :

```javascript
// Dans la console du navigateur ou Node.js
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "abc123";

const getUrl = (endpoint, params = {}) => {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('language', 'fr-FR');
    
    Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
    });
    
    return url.toString();
};

console.log(getUrl('/movie/popular', { page: 3 }));
// https://api.themoviedb.org/3/movie/popular?api_key=abc123&language=fr-FR&page=3
```

### Endpoints TMDB utiles

```javascript
// Films populaires
/movie/popular

// Détails d'un film
/movie/{id}

// Recherche
/search/multi?query=...

// Films par genre
/discover/movie?with_genres=28  // Action = 28

// Vidéos (bandes-annonces)
/movie/{id}/videos

// Recommandations
/movie/{id}/recommendations
```

---

## 🔍 Comment découvrir le contenu de l'API TMDB {#decouvrir-api}

### Méthode 1 : Utiliser `console.log()` dans le code

C'est la méthode la plus simple pour voir ce que l'API retourne.

#### Dans un composant :

```jsx
function Home() {
    const { data, loading } = useFetch('/movie/popular');
    
    // Afficher les données dans la console
    console.log("Données de l'API:", data);
    console.log("Résultats:", data?.results);
    console.log("Premier film:", data?.results?.[0]);
    
    // ...
}
```

#### Dans le hook useFetch :

```jsx
export function useFetch(endpoint, params = {}) {
    // ...
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = getUrl(endpoint, params);
                console.log("URL appelée:", url);
                
                const response = await fetch(url);
                const result = await response.json();
                
                console.log("Réponse complète:", result);
                console.log("Type de données:", typeof result);
                console.log("Clés disponibles:", Object.keys(result));
                
                setData(result);
            } catch (err) {
                // ...
            }
        };
        
        fetchData();
    }, [endpoint, JSON.stringify(params)]);
    
    return { data, loading, error };
}
```

**Résultat dans la console** :
```javascript
Réponse complète: {
    page: 1,
    results: [...],
    total_pages: 500,
    total_results: 10000
}
Type de données: "object"
Clés disponibles: ["page", "results", "total_pages", "total_results"]
```

---

### Méthode 2 : Utiliser les DevTools du navigateur

#### Étape 1 : Ouvrir les DevTools
- **Windows/Linux** : `F12` ou `Ctrl + Shift + I`
- **Mac** : `Cmd + Option + I`

#### Étape 2 : Onglet "Network" (Réseau)
1. Ouvrir l'onglet **Network**
2. Recharger la page (`F5`)
3. Chercher les requêtes vers `api.themoviedb.org`
4. Cliquer sur une requête
5. Voir l'onglet **Preview** ou **Response**

**Avantages** :
- ✅ Voir toutes les requêtes HTTP
- ✅ Voir les headers, statut, temps de réponse
- ✅ Copier les données JSON
- ✅ Voir l'URL exacte appelée

---

### Méthode 3 : Tester directement dans le navigateur

Vous pouvez copier l'URL et la coller dans votre navigateur :

```
https://api.themoviedb.org/3/movie/popular?api_key=VOTRE_CLE&language=fr-FR
```

Le navigateur affichera le JSON brut. Pour une meilleure lecture, installez une extension comme :
- **JSON Viewer** (Chrome, Firefox)
- **JSONView** (Chrome)

---

### Méthode 4 : Consulter la documentation TMDB

**URL** : https://developers.themoviedb.org/3

La documentation officielle montre :
- 📖 Tous les endpoints disponibles
- 📋 Paramètres acceptés
- 📊 Structure exacte des réponses
- 💡 Exemples de requêtes

**Exemple de page documentation** :
- **GET /movie/popular** : https://developers.themoviedb.org/3/movies/get-popular-movies

---

### Méthode 5 : Utiliser un outil comme Postman ou Thunder Client

**Postman** (application) ou **Thunder Client** (extension VS Code) permettent de :
- Tester des requêtes API facilement
- Voir les réponses formatées
- Sauvegarder des collections de requêtes

**Exemple avec Thunder Client (VS Code)** :
1. Installer l'extension **Thunder Client**
2. Créer une nouvelle requête GET
3. URL : `https://api.themoviedb.org/3/movie/popular`
4. Ajouter les query params :
   - `api_key` : votre clé
   - `language` : fr-FR
5. Cliquer sur **Send**

---

## 📦 Structure des données TMDB courantes

### 1. Liste de films (/movie/popular)

```javascript
{
  "page": 1,                    // Page actuelle
  "results": [                  // Tableau de films
    {
      "id": 671,                // ID unique du film
      "title": "Harry Potter",  // Titre
      "original_title": "...",  // Titre original
      "overview": "Synopsis...", // Synopsis
      "poster_path": "/abc.jpg", // Chemin de l'affiche
      "backdrop_path": "/xyz.jpg", // Image de fond
      "release_date": "2001-11-16", // Date de sortie
      "vote_average": 7.9,      // Note moyenne
      "vote_count": 25000,      // Nombre de votes
      "popularity": 123.456,    // Score de popularité
      "adult": false,           // Film adulte ?
      "genre_ids": [12, 14],    // IDs des genres
      "original_language": "en", // Langue originale
      "video": false            // A une vidéo ?
    },
    // ... autres films
  ],
  "total_pages": 500,           // Nombre total de pages
  "total_results": 10000        // Nombre total de résultats
}
```

**Comment accéder aux données** :
```jsx
const { data } = useFetch('/movie/popular');

const films = data?.results;              // Tableau de films
const premierFilm = data?.results[0];     // Premier film
const titre = data?.results[0]?.title;    // Titre du premier film
const nbPages = data?.total_pages;        // Nombre de pages
```

---

### 2. Détails d'un film (/movie/{id})

```javascript
{
  "id": 671,
  "title": "Harry Potter à l'école des sorciers",
  "original_title": "Harry Potter and the Philosopher's Stone",
  "overview": "Harry Potter, un jeune orphelin...",
  "tagline": "Laissez la magie commencer.",  // Slogan
  "poster_path": "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
  "backdrop_path": "/hziiv14OpD73u9gAak4XDDfBKa2.jpg",
  "release_date": "2001-11-16",
  "runtime": 152,                    // Durée en minutes
  "vote_average": 7.9,
  "vote_count": 25000,
  "budget": 125000000,               // Budget ($)
  "revenue": 976475550,              // Revenus ($)
  "status": "Released",              // Statut (Released, Post Production...)
  "genres": [                        // Genres complets (pas juste IDs)
    {
      "id": 12,
      "name": "Aventure"
    },
    {
      "id": 14,
      "name": "Fantastique"
    }
  ],
  "production_companies": [          // Studios de production
    {
      "id": 33,
      "name": "Warner Bros.",
      "logo_path": "/...",
      "origin_country": "US"
    }
  ],
  "production_countries": [          // Pays de production
    {
      "iso_3166_1": "GB",
      "name": "United Kingdom"
    }
  ],
  "spoken_languages": [              // Langues parlées
    {
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "homepage": "https://..."          // Site web officiel
}
```

**Comment accéder aux données** :
```jsx
const { data: movie } = useFetch('/movie/671');

const titre = movie?.title;
const duree = movie?.runtime;                    // 152
const genre = movie?.genres[0]?.name;            // "Aventure"
const budget = movie?.budget;                    // 125000000
const studio = movie?.production_companies[0]?.name; // "Warner Bros."
```

---

### 3. Vidéos/Bandes-annonces (/movie/{id}/videos)

```javascript
{
  "id": 671,
  "results": [
    {
      "id": "5e5f0b9c92514100170b7e3f",
      "key": "VyHV0BRtdxo",          // Clé YouTube !
      "name": "Bande-annonce officielle",
      "site": "YouTube",             // Site d'hébergement
      "size": 1080,                  // Qualité
      "type": "Trailer",             // Type (Trailer, Teaser, Clip...)
      "official": true,              // Officiel ?
      "published_at": "2018-09-20T16:00:03.000Z"
    },
    // ... autres vidéos
  ]
}
```

**Comment récupérer la bande-annonce** :
```jsx
const { data: videos } = useFetch('/movie/671/videos');

// Trouver la première bande-annonce officielle
const trailer = videos?.results?.find(
    v => v.type === 'Trailer' && v.site === 'YouTube'
);

const youtubeKey = trailer?.key;  // "VyHV0BRtdxo"
const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeKey}`;
```

---

### 4. Recherche multi (/search/multi)

```javascript
{
  "page": 1,
  "results": [
    {
      "id": 671,
      "media_type": "movie",      // 🔴 Important ! "movie" ou "tv"
      "title": "Harry Potter",    // Pour les films
      "name": "...",              // Pour les séries (null pour films)
      "poster_path": "/...",
      // ... autres propriétés
    },
    {
      "id": 1234,
      "media_type": "tv",         // Série TV
      "name": "Breaking Bad",     // Pour les séries
      "title": "...",             // Pour les films (null pour séries)
      "first_air_date": "...",    // Pour les séries
      // ...
    }
  ]
}
```

**Gérer films ET séries** :
```jsx
const { data } = useFetch('/search/multi', { query: 'Harry' });

data?.results.forEach(item => {
    const titre = item.media_type === 'movie' ? item.title : item.name;
    const type = item.media_type; // "movie" ou "tv"
    
    console.log(titre, type);
});
```

---

### 5. Séries TV (/tv/{id})

Structure similaire aux films mais avec des propriétés différentes :

```javascript
{
  "id": 1399,
  "name": "Game of Thrones",           // 'name' au lieu de 'title'
  "first_air_date": "2011-04-17",      // Au lieu de 'release_date'
  "number_of_seasons": 8,
  "number_of_episodes": 73,
  "episode_run_time": [60],            // Durée moyenne des épisodes
  "seasons": [                         // Détails des saisons
    {
      "id": 3624,
      "season_number": 1,
      "episode_count": 10,
      "air_date": "2011-04-17"
    }
    // ... autres saisons
  ],
  // ... autres propriétés similaires aux films
}
```

---

## 🎯 Astuce : Comment explorer les données

### Technique 1 : Afficher toutes les clés

```jsx
const { data } = useFetch('/movie/671');

useEffect(() => {
    if (data) {
        console.log("Clés disponibles:", Object.keys(data));
    }
}, [data]);

// Affiche : ["id", "title", "overview", "poster_path", ...]
```

### Technique 2 : Afficher proprement avec JSON.stringify

```jsx
console.log(JSON.stringify(data, null, 2));
// Le paramètre 'null, 2' indente le JSON pour le rendre lisible
```

### Technique 3 : Utiliser console.table pour les tableaux

```jsx
const { data } = useFetch('/movie/popular');

useEffect(() => {
    if (data?.results) {
        console.table(data.results.map(film => ({
            ID: film.id,
            Titre: film.title,
            Note: film.vote_average,
            Date: film.release_date
        })));
    }
}, [data]);
```

Affiche un joli tableau dans la console ! 📊

---

### Technique 4 : Créer un composant de debug

```jsx
// components/Debug/Debug.jsx
const Debug = ({ data, title = "Debug" }) => {
    if (!data) return null;
    
    return (
        <details style={{ 
            background: '#1a1a1a', 
            padding: '10px', 
            margin: '10px',
            color: '#fff',
            fontFamily: 'monospace'
        }}>
            <summary>{title}</summary>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </details>
    );
};

// Utilisation
<Debug data={movie} title="Données du film" />
```

---

## 📖 Ressources pour explorer l'API

1. **Documentation officielle** : https://developers.themoviedb.org/3
2. **API Explorer TMDB** : https://developers.themoviedb.org/3/getting-started/introduction
3. **Liste des genres** : https://www.themoviedb.org/talk/5daf6eb0ae36680011d7e6ee
4. **Extensions navigateur** :
   - JSON Viewer
   - JSONView
   - Wappalyzer (pour voir les technologies utilisées)

---

## 🧭 Routing et Navigation {#routing}

### Configuration du Router (`App.jsx`)

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detail/:id/:type" element={<Detail />} />
                <Route path="/favoris" element={<Favoris />} />
                <Route path="/films/:type" element={<Catalogue />} />
                <Route path="/search" element={<Search />} />
                <Route path="*" element={<div>Page 404</div>} />
            </Routes>
        </BrowserRouter>
    );
}
```

**Concepts clés** :
- `BrowserRouter` : Active le routing
- `Routes` : Conteneur des routes
- `Route` : Définit une route avec `path` et `element`
- `:id`, `:type` : Paramètres dynamiques

### Navigation entre pages

#### Avec `Link` (recommandé)
```jsx
import { Link } from 'react-router-dom';

<Link to="/detail/671/movie">Voir le film</Link>
```

#### Avec `useNavigate` (navigation programmatique)
```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/favoris');
```

### Récupérer les paramètres d'URL

```jsx
import { useParams } from 'react-router-dom';

function Detail() {
    const { id, type } = useParams();
    console.log(id, type); // 671, movie
}
```

---

## 💾 Gestion de l'état local {#state-management}

### LocalStorage pour la persistance

#### Sauvegarder des favoris
```javascript
// Récupérer
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Ajouter
favorites.push(movie);
localStorage.setItem("favorites", JSON.stringify(favorites));

// Supprimer
const updated = favorites.filter(fav => fav.id !== movie.id);
localStorage.setItem("favorites", JSON.stringify(updated));
```

#### Sauvegarder des commentaires
```javascript
const key = `comments_${type}_${id}`;
const comments = JSON.parse(localStorage.getItem(key)) || [];
comments.push(newComment);
localStorage.setItem(key, JSON.stringify(comments));
```

### Synchroniser useState avec localStorage

```jsx
const [isFav, setIsFav] = useState(false);

useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const found = favorites.some(fav => fav.id === movie.id);
    setIsFav(found);
}, [movie]);
```

---

## 🧩 Composants principaux {#composants}

### 1. MovieCard - Carte de film

**Rôle** : Afficher une affiche de film cliquable

```jsx
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    const imgUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        : 'https://via.placeholder.com/300x450?text=No+Image';

    const title = movie.title || movie.name;
    const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');

    return (
        <Link to={`/detail/${movie.id}/${mediaType}`} className="card">
            <img src={imgUrl} alt={title} loading="lazy" />
            <p>{title}</p>
        </Link>
    );
};
```

**Points clés** :
- ✅ Gestion de l'image par défaut si `poster_path` est null
- ✅ Détection automatique du type (movie/tv)
- ✅ `loading="lazy"` pour optimiser le chargement

### 2. Row - Ligne horizontale de films

**Rôle** : Afficher une catégorie de films (ex: "Films Populaires")

```jsx
import { useFetch } from '../../hooks/useFetch';
import MovieCard from '../MovieCard/MovieCard';

const Row = ({ title, endpoint, type = 'movie' }) => {
    const { data, loading, error } = useFetch(endpoint);
    const items = data?.results || [];

    if (loading) return <div>Chargement...</div>;
    if (error) return null;

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row-posters">
                {items.map(item => (
                    <MovieCard key={item.id} movie={item} />
                ))}
            </div>
        </div>
    );
};
```

**Points clés** :
- ✅ Utilise le hook `useFetch` pour récupérer les données
- ✅ `data?.results` pour éviter les erreurs si data est null
- ✅ `key={item.id}` obligatoire pour les listes React

### 3. FavoriteButton - Bouton favori

```jsx
const FavoriteButton = ({ movie }) => {
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFav(favorites.some(fav => fav.id === movie.id));
    }, [movie]);

    const handleToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (isFav) {
            favorites = favorites.filter(fav => fav.id !== movie.id);
            toast.success("Retiré des favoris");
        } else {
            favorites.push(movie);
            toast.success("Ajouté aux favoris");
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFav(!isFav);
    };

    return (
        <button onClick={handleToggle}>
            {isFav ? '❤️' : '🤍'}
        </button>
    );
};
```

**Points clés** :
- ✅ `e.stopPropagation()` empêche le clic de remonter au parent
- ✅ `toast` pour afficher des notifications
- ✅ État synchronisé avec localStorage

### 4. Button - Bouton réutilisable

```jsx
const Button = ({ children, type = 'primary', onClick, className = '' }) => {
    return (
        <button 
            className={`btn btn-${type} ${className}`} 
            onClick={onClick}
        >
            {children}
        </button>
    );
};
```

**Usage** :
```jsx
<Button type="primary">▶ Lecture</Button>
<Button type="secondary">Plus d'infos</Button>
```

---

## 🪝 Hooks personnalisés {#hooks}

### Comprendre la récupération de données API avec React

Avant de voir les hooks personnalisés, comprenons **comment React récupère et gère les données d'une API**.

---

## 🔄 Le cycle complet de récupération des données API

### Étape par étape : De l'API à l'affichage

```
1. Composant se monte (mount)
         ↓
2. useEffect se déclenche
         ↓
3. Appel fetch() vers l'API
         ↓
4. Attente de la réponse (loading = true)
         ↓
5. Réception des données JSON
         ↓
6. setState met à jour les données
         ↓
7. React re-rend le composant
         ↓
8. Affichage des données à l'écran
```

---

## 📖 Explication détaillée : useState et useEffect

### 🎯 useState : Gérer l'état des données

**Qu'est-ce que l'état (state) ?**
- C'est une variable spéciale React qui **déclenche un re-render** quand elle change
- Contrairement à `let variable`, qui ne met pas à jour l'UI

#### Syntaxe de base

```jsx
const [data, setData] = useState(null);
//     ↑      ↑           ↑        ↑
//   valeur  fonction  hook   valeur initiale
//           de mise
//           à jour
```

**Décortiquons** :
- `data` : La valeur actuelle (lecture seule, ne JAMAIS modifier directement)
- `setData` : Fonction pour changer `data` (déclenche un re-render)
- `useState(null)` : Valeur initiale (ici `null`)

#### Exemple concret

```jsx
// ❌ MAUVAIS - Ne fonctionne PAS
let data = null;
data = { title: "Film" }; // L'UI ne se met pas à jour

// ✅ BON - Fonctionne
const [data, setData] = useState(null);
setData({ title: "Film" }); // L'UI se met à jour automatiquement
```

---

### ⚡ useEffect : Gérer les effets de bord

**Qu'est-ce qu'un effet de bord ?**
- Toute opération qui **sort du cadre du rendu** : appels API, timers, subscriptions
- React a besoin de savoir QUAND exécuter ces opérations

#### Syntaxe de base

```jsx
useEffect(() => {
    // Code à exécuter
}, [dependency]);
//  ↑
//  Tableau de dépendances
```

**Les 3 cas d'usage** :

```jsx
// 1️⃣ S'exécute à CHAQUE render (⚠️ Attention aux boucles infinies !)
useEffect(() => {
    console.log("À chaque render");
});

// 2️⃣ S'exécute UNE SEULE FOIS au montage (tableau vide)
useEffect(() => {
    console.log("Au montage du composant");
}, []);

// 3️⃣ S'exécute quand 'id' change
useEffect(() => {
    console.log("Quand id change:", id);
}, [id]);
```

---

### 🔄 Comment useState et useEffect travaillent ensemble

Voici un exemple complet pour charger des films :

```jsx
function MovieList() {
    // 1️⃣ ÉTAT : Stocker les données
    const [movies, setMovies] = useState([]);        // Films
    const [loading, setLoading] = useState(true);    // État de chargement
    const [error, setError] = useState(null);        // Erreur éventuelle
    
    // 2️⃣ EFFET : Charger les données au montage
    useEffect(() => {
        // Fonction async pour fetch
        const loadMovies = async () => {
            try {
                setLoading(true);  // Début du chargement
                
                const response = await fetch('https://api.../movie/popular?api_key=...');
                const data = await response.json();
                
                setMovies(data.results);  // ✅ Stocke les films
                setLoading(false);        // ✅ Fin du chargement
            } catch (err) {
                setError(err.message);    // ✅ Gère l'erreur
                setLoading(false);
            }
        };
        
        loadMovies();
    }, []); // [] = exécute UNE FOIS au montage
    
    // 3️⃣ RENDU CONDITIONNEL : Affichage selon l'état
    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur : {error}</div>;
    
    return (
        <div>
            {movies.map(movie => (
                <div key={movie.id}>{movie.title}</div>
            ))}
        </div>
    );
}
```

**Chronologie d'exécution** :

```
Temps 0ms : Composant monte
  → useState initialise : movies=[], loading=true, error=null
  → Premier render avec "Chargement..."

Temps 1ms : useEffect se déclenche
  → loadMovies() démarre
  → fetch() vers l'API

Temps 500ms : API répond
  → setMovies([...]) est appelé
  → React re-render le composant
  → Affichage de la liste des films
```

---

## 🎓 Le problème sans hook personnalisé

Imaginez répéter ce code dans **chaque composant** :

```jsx
// Dans Home.jsx
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => { /* fetch logic */ }, []);

// Dans Detail.jsx
const [movie, setMovie] = useState(null);
const [loading, setLoading] = useState(true);
useEffect(() => { /* fetch logic */ }, []);

// Dans Search.jsx
const [results, setResults] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => { /* fetch logic */ }, []);
```

**Problèmes** :
- ❌ Code dupliqué
- ❌ Risque d'erreurs
- ❌ Difficile à maintenir
- ❌ Gestion d'erreur à refaire partout

**Solution** : Créer un hook personnalisé `useFetch` ! ✅

---

## 🛠️ Le hook personnalisé useFetch expliqué en détail

### 1. useFetch - Hook pour appels API

**Rôle** : Simplifier les appels API avec gestion du loading/error

```jsx
import { useState, useEffect } from 'react';
import { getUrl } from '../utils/api';

export function useFetch(endpoint, params = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!endpoint) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = getUrl(endpoint, params);
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error('Erreur:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, JSON.stringify(params)]);

    return { data, loading, error };
}
```

---

### 📖 Explication ligne par ligne de useFetch

#### Partie 1 : Déclaration des états

```jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

**Pourquoi 3 états ?**

1. **`data`** : Stocke la réponse de l'API
   - Valeur initiale : `null` (pas encore de données)
   - Devient : `{ results: [...], page: 1, ... }` après le fetch

2. **`loading`** : Indique si le chargement est en cours
   - Valeur initiale : `true` (on charge dès le départ)
   - Permet d'afficher un spinner/loader
   - Devient `false` quand c'est terminé

3. **`error`** : Stocke un message d'erreur éventuel
   - Valeur initiale : `null` (pas d'erreur au départ)
   - Devient : `"Erreur HTTP 404"` si problème

**Machine à états** :
```
État initial    : loading=true,  data=null,     error=null
Succès          : loading=false, data={...},    error=null
Échec           : loading=false, data=null,     error="message"
```

---

#### Partie 2 : Le useEffect

```jsx
useEffect(() => {
    if (!endpoint) return;
    // ...
}, [endpoint, JSON.stringify(params)]);
```

**`if (!endpoint) return;`** : Pourquoi ?
- Évite d'exécuter fetch si `endpoint` est vide/null
- Cas d'usage : `const { data } = useFetch(query ? '/search/multi' : null, ...)`

**Tableau de dépendances `[endpoint, JSON.stringify(params)]`** :
- **`endpoint`** : Si l'endpoint change, refaire le fetch
  - Ex : `/movie/popular` → `/tv/popular` = nouveau fetch
  
- **`JSON.stringify(params)`** : Pourquoi stringify ?
  ```jsx
  // ❌ Sans stringify
  [endpoint, params]
  // params est un objet, React compare par référence
  // { page: 1 } !== { page: 1 } (objets différents en mémoire)
  // = Boucle infinie !
  
  // ✅ Avec stringify
  [endpoint, JSON.stringify(params)]
  // '{"page":1}' === '{"page":1}' (strings identiques)
  // = Fonctionne correctement
  ```

---

#### Partie 3 : La fonction fetchData

```jsx
const fetchData = async () => {
    setLoading(true);    // 1️⃣ Commence le chargement
    setError(null);      // 2️⃣ Réinitialise les erreurs précédentes
    
    try {
        // 3️⃣ Construire l'URL
        const url = getUrl(endpoint, params);
        
        // 4️⃣ Appel API
        const response = await fetch(url);
        
        // 5️⃣ Vérifier le statut HTTP
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }
        
        // 6️⃣ Parser le JSON
        const result = await response.json();
        
        // 7️⃣ Stocker les données
        setData(result);
        
    } catch (err) {
        // 8️⃣ Gérer l'erreur
        console.error('Erreur:', err);
        setError(err.message);
        
    } finally {
        // 9️⃣ Toujours arrêter le loading (succès ou échec)
        setLoading(false);
    }
};
```

**Décortiquons chaque étape** :

##### 1️⃣ `setLoading(true)`
- Informe React : "Je commence à charger"
- Le composant re-render et affiche un loader

##### 2️⃣ `setError(null)`
- Réinitialise les erreurs d'un appel précédent
- Important pour éviter d'afficher une vieille erreur

##### 3️⃣ `const url = getUrl(endpoint, params)`
- Construit l'URL complète avec api_key, language, etc.
- Ex : `https://api.themoviedb.org/3/movie/popular?api_key=...&language=fr-FR&page=2`

##### 4️⃣ `await fetch(url)`
- Lance la requête HTTP GET vers l'API
- `await` = attendre la réponse (asynchrone)
- Retourne un objet `Response`

##### 5️⃣ `if (!response.ok)`
- Vérifie le statut HTTP (200-299 = ok, 400-599 = erreur)
- `response.ok` = `true` si statut 2xx
- Lance une erreur si problème (404, 500, etc.)

##### 6️⃣ `await response.json()`
- Convertit la réponse (texte JSON) en objet JavaScript
- Ex : `'{"title":"Film"}'` → `{ title: "Film" }`

##### 7️⃣ `setData(result)`
- Stocke les données dans l'état
- Déclenche un re-render du composant

##### 8️⃣ `catch (err)`
- Si une erreur se produit (réseau, JSON invalide, etc.)
- `setError(err.message)` stocke le message d'erreur

##### 9️⃣ `finally`
- S'exécute TOUJOURS (succès ou échec)
- `setLoading(false)` arrête le loader

---

#### Partie 4 : Le retour

```jsx
return { data, loading, error };
```

**Pourquoi retourner un objet ?**
- Permet de récupérer seulement ce dont on a besoin
- Destructuration flexible

```jsx
// Récupérer tout
const { data, loading, error } = useFetch('/movie/popular');

// Récupérer seulement data
const { data } = useFetch('/movie/popular');

// Renommer data
const { data: movies } = useFetch('/movie/popular');
```

---

## 🎯 Utilisation de useFetch dans un composant

### Exemple complet

```jsx
import { useFetch } from '../../hooks/useFetch';
import MovieCard from '../MovieCard/MovieCard';

function PopularMovies() {
    // 1️⃣ Appel du hook
    const { data, loading, error } = useFetch('/movie/popular', { page: 1 });
    
    // 2️⃣ Gestion du loading
    if (loading) {
        return <div className="loader">Chargement des films...</div>;
    }
    
    // 3️⃣ Gestion de l'erreur
    if (error) {
        return <div className="error">Erreur : {error}</div>;
    }
    
    // 4️⃣ Vérifier que data existe
    if (!data || !data.results) {
        return <div>Aucun film trouvé</div>;
    }
    
    // 5️⃣ Afficher les données
    return (
        <div className="movies-grid">
            {data.results.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}
```

---

### Chronologie complète d'exécution

```
🕐 T = 0ms : Composant PopularMovies monte
  ├─ useFetch s'initialise
  │   ├─ data = null
  │   ├─ loading = true
  │   └─ error = null
  ├─ Premier render
  └─ Affiche : "Chargement des films..."

🕐 T = 1ms : useEffect de useFetch se déclenche
  ├─ fetchData() démarre
  ├─ Construction de l'URL
  └─ fetch() vers l'API TMDB

🕐 T = 250ms : API répond
  ├─ response.ok = true (statut 200)
  ├─ response.json() parse les données
  ├─ setData({ results: [...], page: 1, ... })
  ├─ setLoading(false)
  └─ React re-render PopularMovies

🕐 T = 251ms : Deuxième render
  ├─ loading = false
  ├─ data = { results: [...] }
  └─ Affiche : Liste des films avec MovieCard
```

---

## 🔍 Cas d'usage avancés

### 1. Paramètres dynamiques

```jsx
function MoviesByGenre({ genreId }) {
    const { data, loading } = useFetch('/discover/movie', {
        with_genres: genreId,
        sort_by: 'popularity.desc'
    });
    
    // Si genreId change (ex: 28 → 35), useFetch refetch automatiquement !
}
```

**Pourquoi ça refetch ?**
- `genreId` change → `params` change
- `JSON.stringify(params)` donne un nouveau string
- `useEffect` détecte le changement → re-exécute `fetchData()`

---

### 2. Recherche conditionnelle

```jsx
function SearchMovies() {
    const [query, setQuery] = useState('');
    
    // Ne fetch QUE si query n'est pas vide
    const { data, loading } = useFetch(
        query ? '/search/multi' : null,  // null = pas de fetch
        { query }
    );
    
    return (
        <>
            <input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {loading && <div>Recherche...</div>}
            {data?.results && <ResultsList results={data.results} />}
        </>
    );
}
```

---

### 3. Plusieurs appels dans un composant

```jsx
function MovieDetail({ id }) {
    const { data: movie } = useFetch(`/movie/${id}`);
    const { data: videos } = useFetch(`/movie/${id}/videos`);
    const { data: recommendations } = useFetch(`/movie/${id}/recommendations`);
    
    // 3 appels API en parallèle !
}
```

---

## ⚠️ Pièges courants à éviter

### 1. Oublier le tableau de dépendances

```jsx
// ❌ MAUVAIS - Boucle infinie !
useEffect(() => {
    fetchData();
}); // Pas de tableau = s'exécute à chaque render

// ✅ BON
useEffect(() => {
    fetchData();
}, []); // [] = une seule fois
```

---

### 2. Modifier l'état directement

```jsx
// ❌ MAUVAIS
const [data, setData] = useState([]);
data.push(newItem); // Ne déclenche PAS de re-render !

// ✅ BON
setData([...data, newItem]); // Crée un nouveau tableau
```

---

### 3. Ne pas gérer le cas où data est null

```jsx
// ❌ MAUVAIS - Erreur si data est null
return <div>{data.results.map(...)}</div>;

// ✅ BON - Optional chaining
return <div>{data?.results?.map(...)}</div>;
```

---

### 2. useMovieData - Hook spécialisé

**Rôle** : Simplifier les appels API avec gestion du loading/error

```jsx
import { useState, useEffect } from 'react';
import { getUrl } from '../utils/api';

export function useFetch(endpoint, params = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!endpoint) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = getUrl(endpoint, params);
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error('Erreur:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, JSON.stringify(params)]);

    return { data, loading, error };
}
```

**Usage** :
```jsx
const { data, loading, error } = useFetch('/movie/popular');

if (loading) return <div>Chargement...</div>;
if (error) return <div>Erreur : {error}</div>;

return <div>{data.results.map(...)}</div>;
```

**Avantages** :
- ✅ Code réutilisable
- ✅ Gestion automatique des états
- ✅ Déclenchement automatique à chaque changement d'endpoint

### 2. useMovieData - Hook spécialisé

**Rôle** : Charger toutes les données d'un film (détails + trailers + recommandations)

```jsx
export function useMovieData(id, type = 'movie') {
    const [movie, setMovie] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [trailerKey, setTrailerKey] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Logique de chargement...
    }, [id, type]);

    return { movie, recommendations, trailerKey, loading };
}
```

---

## 🎨 CSS et Styling {#styling}

### Organisation

Chaque composant a son propre fichier CSS :
```
MovieCard/
  ├── MovieCard.jsx
  └── MovieCard.css
```

### CSS Import
```jsx
import './MovieCard.css';
```

### Styles globaux (`index.css`)

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background-color: #141414;
    color: white;
}
```

### Exemples de styles

#### Hero Section
```css
.hero {
    height: 80vh;
    background-size: cover;
    background-position: center;
    position: relative;
}

.hero-overlay {
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.9),
        transparent
    );
}
```

#### Row horizontal scrollable
```css
.row-posters {
    display: flex;
    gap: 15px;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 20px 0;
}

.row-posters::-webkit-scrollbar {
    height: 8px;
}
```

#### Modal
```css
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}
```

---

## ⭐ Fonctionnalités avancées {#fonctionnalites}

### 1. Modal de bande-annonce

```jsx
const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

// Bouton d'ouverture
<Button onClick={() => setIsTrailerModalOpen(true)}>
    Bande-annonce
</Button>

// Modal
{isTrailerModalOpen && (
    <div className="modal-overlay" onClick={() => setIsTrailerModalOpen(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsTrailerModalOpen(false)}>✕</button>
            <iframe
                src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1`}
                allowFullScreen
            />
        </div>
    </div>
)}
```

**Points clés** :
- ✅ `e.stopPropagation()` empêche la fermeture en cliquant sur le contenu
- ✅ `youtube-nocookie.com` pour la confidentialité
- ✅ `autoplay=1` pour lancer automatiquement

### 2. Notifications avec react-hot-toast

```jsx
import toast from 'react-hot-toast';

// Dans App.jsx
<Toaster position="bottom-center" />

// Dans un composant
toast.success("Ajouté aux favoris");
toast.error("Erreur de connexion");
```

**Options de style** :
```jsx
toast.success("Message", {
    style: {
        background: '#333',
        color: '#fff',
    },
    duration: 3000,
});
```

### 3. Recherche dynamique

```jsx
const [query, setQuery] = useState('');
const { data, loading } = useFetch(
    query ? `/search/multi` : null,
    { query }
);

<input 
    type="text" 
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Rechercher..."
/>
```

### 4. Lazy loading d'images

```jsx
<img src={imgUrl} alt={title} loading="lazy" />
```

---

## 📝 Checklist de reproduction

### Étape 1 : Setup initial
- [ ] Créer le projet avec Vite
- [ ] Installer les dépendances (react-router-dom, react-hot-toast, react-icons)
- [ ] Créer le fichier `.env` avec la clé TMDB
- [ ] Créer la structure de dossiers

### Étape 2 : Configuration de base
- [ ] Configurer `utils/api.js`
- [ ] Créer le hook `useFetch.js`
- [ ] Configurer le routing dans `App.jsx`

### Étape 3 : Composants de base
- [ ] Créer `Button`
- [ ] Créer `MovieCard`
- [ ] Créer `Row`

### Étape 4 : Pages principales
- [ ] Créer `Home` avec hero + rows
- [ ] Créer `Detail` avec infos film
- [ ] Créer `Favoris`

### Étape 5 : Fonctionnalités
- [ ] Implémenter `FavoriteButton`
- [ ] Ajouter les modals (trailer, commentaires)
- [ ] Créer la page Search

### Étape 6 : Finitions
- [ ] Ajouter les styles CSS
- [ ] Tester toutes les fonctionnalités
- [ ] Optimiser les performances (lazy loading)

---

## 🔧 Commandes utiles

```bash
# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Preview du build
npm run preview

# Linter
npm run lint
```

---

## 🎓 Concepts importants à retenir

### 1. Composition de composants
Diviser l'UI en petits composants réutilisables

### 2. Hooks
- `useState` pour l'état local
- `useEffect` pour les effets de bord
- Hooks personnalisés pour la logique réutilisable

### 3. Props
Passer des données du parent à l'enfant

### 4. Conditional Rendering
Afficher différents contenus selon l'état

### 5. Event Handling
Gérer les clics, les changements d'input, etc.

### 6. API Integration
Fetch de données depuis une API externe

### 7. Routing
Navigation entre pages sans rechargement

### 8. LocalStorage
Persistance des données côté client

---

## 🚀 Améliorations possibles

1. **Authentification** : Ajouter un système de login
2. **Base de données** : Sauvegarder favoris/commentaires en backend
3. **Infinite Scroll** : Charger plus de résultats en scrollant
4. **Filtres avancés** : Par genre, année, note, etc.
5. **Mode sombre/clair** : Toggle de thème
6. **Responsive design** : Optimiser pour mobile
7. **Progressive Web App** : Rendre l'app installable
8. **TypeScript** : Ajouter du typage pour plus de sécurité

---

## 📚 Ressources utiles

- **React** : https://react.dev
- **Vite** : https://vitejs.dev
- **React Router** : https://reactrouter.com
- **TMDB API** : https://developers.themoviedb.org
- **react-hot-toast** : https://react-hot-toast.com

---

## ✅ Conclusion

Vous avez maintenant toutes les clés pour reproduire ce projet ! 

**Conseils** :
- Commencez simple (une page, un composant)
- Testez au fur et à mesure
- Consultez la documentation officielle
- N'hésitez pas à expérimenter

Bon code ! 🚀
