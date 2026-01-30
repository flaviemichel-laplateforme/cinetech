# 🎬 CineTech

Application web de streaming d'informations sur les films et séries, développée avec React et l'API TMDB.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.13.0-CA4245?logo=reactrouter&logoColor=white)

## 📋 Description

CineTech est une plateforme moderne permettant de découvrir, rechercher et gérer vos films et séries préférés. L'application utilise l'API The Movie Database (TMDB) pour fournir des informations détaillées et à jour sur des milliers de contenus.

## ✨ Fonctionnalités

- 🏠 **Page d'accueil** avec sélection de films et séries populaires
- 🎥 **Catalogue Films** avec pagination et filtrage
- 📺 **Catalogue Séries** avec pagination et filtrage
- 🔍 **Recherche avancée** de films et séries
- 📄 **Pages détails** avec informations complètes (synopsis, casting, bande-annonce, etc.)
- ⭐ **Système de favoris** avec stockage local
- 💬 **Commentaires** avec notation pour chaque film/série
- 📱 **Design responsive** adapté à tous les écrans
- 🎨 **Interface moderne** inspirée des plateformes de streaming

## 🛠️ Technologies

- **Frontend Framework** : React 19.2.0
- **Build Tool** : Vite 7.2.4
- **Routing** : React Router DOM 7.13.0
- **Icons** : React Icons 5.5.0
- **Notifications** : React Hot Toast 2.6.0
- **API** : The Movie Database (TMDB)
- **Stockage** : LocalStorage

## 📦 Installation

1. **Cloner le repository**
```bash
git clone https://github.com/flaviemichel-laplateforme/cinetech.git
cd cinetech
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer l'API TMDB**

Créez un fichier `.env` à la racine du projet et ajoutez votre clé API TMDB :
```env
VITE_TMDB_API_KEY=votre_cle_api_tmdb
```

Pour obtenir une clé API gratuite :
- Créez un compte sur [themoviedb.org](https://www.themoviedb.org/)
- Accédez à vos paramètres API
- Générez une clé API v3

4. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🚀 Scripts disponibles

```bash
npm run dev      # Lancer le serveur de développement
npm run build    # Compiler le projet pour la production
npm run preview  # Prévisualiser la version de production
npm run lint     # Vérifier le code avec ESLint
```

## 📁 Structure du projet

```
cinetech/
├── public/
│   └── images/         # Images statiques (logo)
├── src/
│   ├── assets/         # Assets du projet
│   ├── components/     # Composants réutilisables
│   │   ├── BtnReturn/
│   │   ├── Button/
│   │   ├── Catalogue/
│   │   ├── Comments/
│   │   ├── FavoriteButton/
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── MovieCard/
│   │   ├── Rating/
│   │   └── Row/
│   ├── hooks/          # Custom hooks
│   │   ├── useFetch.js
│   │   └── useMovieData.js
│   ├── pages/          # Pages de l'application
│   │   ├── Home/
│   │   ├── Detail/
│   │   ├── Favoris/
│   │   ├── Search/
│   │   ├── MentionsLegales/
│   │   ├── PolitiqueConfidentialite/
│   │   └── CGU/
│   ├── utils/          # Fonctions utilitaires
│   │   └── api.js
│   ├── App.jsx         # Composant racine
│   └── main.jsx        # Point d'entrée
├── .env                # Variables d'environnement
└── package.json
```

## 🔑 Fonctionnalités principales

### 🎯 Gestion des favoris
Les utilisateurs peuvent ajouter des films/séries à leurs favoris. Les données sont stockées dans le LocalStorage du navigateur pour persister entre les sessions.

### 💬 Système de commentaires
Chaque film/série dispose d'un espace commentaire où les utilisateurs peuvent laisser leur avis et une note sur 5 étoiles.

### 🔍 Recherche intelligente
Fonction de recherche globale permettant de trouver rapidement des films et séries par titre.

### 📱 Responsive Design
Interface optimisée pour mobile, tablette et desktop avec des breakpoints adaptés.

## 🌐 Pages

- `/` - Page d'accueil
- `/films/movie` - Catalogue des films
- `/films/tv` - Catalogue des séries
- `/detail/:id/:type` - Détails d'un film/série
- `/favoris` - Liste des favoris
- `/search` - Page de recherche
- `/mentions-legales` - Mentions légales
- `/politique-confidentialite` - Politique de confidentialité
- `/cgu` - Conditions générales d'utilisation

## 📝 API

Ce projet utilise l'API The Movie Database (TMDB) v3. Endpoints principaux utilisés :

- `GET /movie/popular` - Films populaires
- `GET /tv/popular` - Séries populaires
- `GET /movie/{id}` - Détails d'un film
- `GET /tv/{id}` - Détails d'une série
- `GET /search/multi` - Recherche globale
- `GET /movie/{id}/videos` - Vidéos/Bande-annonces
- `GET /movie/{id}/credits` - Casting

## 🎨 Design

L'interface s'inspire des plateformes de streaming modernes avec :
- Palette de couleurs sombre (noir/rouge)
- Animations fluides et transitions
- Cards interactives avec effet hover
- Layout Grid et Flexbox
- Typographie moderne

## 📄 Conformité légale

Le projet inclut les pages légales requises pour une mise en production :
- Mentions légales
- Politique de confidentialité (RGPD)
- Conditions générales d'utilisation

## 👤 Auteur

**Flavie Michel**
- GitHub: [@flaviemichel-laplateforme](https://github.com/flaviemichel-laplateforme)

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [The Movie Database (TMDB)](https://www.themoviedb.org/) pour l'API
- [React Icons](https://react-icons.github.io/react-icons/) pour les icônes
- [Vite](https://vitejs.dev/) pour l'outil de build ultra-rapide
