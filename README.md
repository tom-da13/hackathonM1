# 📸 SelfieApp – Application Mobile Ionic/Angular

SelfieApp est une application mobile hybride développée avec **Angular**, **Ionic**, et **Capacitor**.  
Elle permet de **prendre des selfies**, **les gérer dans une galerie**, **voir leurs métadonnées (lieu, date, likes)** et **les visualiser sur une carte interactive**.

---

## 🚀 Fonctionnalités principales

- 📷 **Prise de photo** via la caméra du téléphone (ou upload depuis le navigateur).
- 🖼️ **Galerie photo locale** : affichage des photos sauvegardées avec possibilité de liker.
- 🗺️ **Carte interactive (Leaflet)** : affichage d’un marqueur pour chaque photo selon sa géolocalisation.
- ❤️ **Système de likes** pour chaque photo.
- 💾 **Sauvegarde locale** via Capacitor Storage.
- 🌐 Compatible **Web**, **Android** et **iOS**.

---

## 🧱 Technologies utilisées

- **Ionic Framework 7+**
- **Angular 17+**
- **Capacitor 6+**
- **Plugins Capacitor :**
  - `@capacitor/camera` → Prise de photos
  - `@capacitor/filesystem` → Sauvegarde locale
  - `@capacitor/preferences` → Persistance des données
  - `@capacitor/geolocation` → Récupération de la position GPS
- **Android Studio / Xcode** pour l’émulation ou le déploiement.

## 📂 Structure du projet

src/
 ├── app/
 │   ├── photo.service.ts        # Logique principale (prise, sauvegarde, like, etc.)
 │   ├── tab2/
 │   │   ├── tab2.page.ts        # Composant galerie
 │   │   ├── tab2.page.html      # Interface utilisateur
 │   │   └── tab2.page.scss      # Style
 │   └── tab3/                   # Autres pages (optionnel)
 ├── assets/                     # Ressources statiques
 └── theme/                      # Thème Ionic

---

## ⚙️ Installation

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/ton-utilisateur/selfieApp.git
cd selfieApp

### 2️⃣ Installer les dépendances

npm install

### 3️⃣ Ajouter les plugins Capacitor
npm install @capacitor/core @capacitor/camera @capacitor/storage
npm install @ionic/pwa-elements leaflet
npx cap sync

---

### 💻 Exécution du projet

▶️ Mode développement (Web)
ionic serve

📱 Android
npx cap open android

🍎 iOS
npx cap open ios

🧩 Débogage
Si tu vois une page blanche, vérifie la console du navigateur.

Assure-toi d’avoir installé :
npm install @ionic/pwa-elements leaflet

Pour les plugins Capacitor, n’oublie jamais de faire :
npx cap sync

🗺️ Permissions

L’application nécessite :
- L’accès à la caméra (Camera)
- L’accès à la géolocalisation (pour la carte)

📝 Licence
Ce projet est sous licence MIT — libre à l’utilisation, la modification et la distribution.
