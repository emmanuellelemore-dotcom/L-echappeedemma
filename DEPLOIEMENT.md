# Guide de déploiement - L'échappée d'Emma

## 📋 Vue d'ensemble

Votre site sera déployé en deux parties :
- **Frontend** (site web) → Hébergement OVH Starter
- **Emails** (formulaires) → EmailJS (service gratuit)

---

## 🔧 Étape 1 : Configuration EmailJS

### 1.1 - Créer un compte EmailJS

1. Allez sur [https://www.emailjs.com](https://www.emailjs.com)
2. Cliquez sur **"Sign Up"**
3. Créez votre compte (gratuit jusqu'à 200 emails/mois)

### 1.2 - Connecter votre email

1. Une fois connecté, allez dans **"Email Services"**
2. Cliquez sur **"Add New Service"**
3. Choisissez votre fournisseur (Gmail, Outlook, etc.)
4. Suivez les instructions pour connecter votre email professionnel
5. **Notez le Service ID** (ex: `service_abc123`)

### 1.3 - Créer les templates d'email

Vous devez créer **3 templates** (un pour chaque formulaire) :

#### Template 1 : Contact (TEMPLATE_CONTACT)

1. Allez dans **"Email Templates"** → **"Create New Template"**
2. **Template Name:** `Contact - L'échappée d'Emma`
3. **Template ID:** Notez-le (ex: `template_contact`)
4. **Content (corps du mail):**

```
Nouveau message de contact - L'échappée d'Emma

De: {{from_name}}
Email: {{from_email}}
Téléphone: {{phone}}
Sujet: {{subject}}

Message:
{{message}}
```

5. **To Email:** `enzo.schneider318@gmail.com` (votre email pro)
6. **From Name:** `Site L'échappée d'Emma`
7. Cliquez sur **"Save"**

#### Template 2 : Devis (TEMPLATE_QUOTE)

1. Créez un nouveau template
2. **Template Name:** `Demande de devis`
3. **Template ID:** Notez-le (ex: `template_quote`)
4. **Content:**

```
Nouvelle demande de devis - L'échappée d'Emma

Client: {{title}} {{client_name}}
Email: {{client_email}}
Téléphone: {{client_phone}}

DÉTAILS DU VOYAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Destination: {{destination}}
Date de départ: {{depart_date}}
Date de retour: {{return_date}}
Durée: {{duration}}

VOYAGEURS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Adultes: {{adults}}
Enfants: {{children}}
Avec qui voyagez-vous: {{travel_party}}

BUDGET: {{budget}}

DESCRIPTION DU PROJET:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{description}}
```

5. **To Email:** `enzo.schneider318@gmail.com`
6. Cliquez sur **"Save"**

#### Template 3 : Feedback (TEMPLATE_FEEDBACK)

1. Créez un nouveau template
2. **Template Name:** `Feedback client`
3. **Template ID:** Notez-le (ex: `template_feedback`)
4. **Content:**

```
Nouveau feedback - L'échappée d'Emma

Note: {{rating}}/5 {{rating_emoji}}
Ressenti: {{rating_label}}

Commentaire:
{{comment}}

Email du visiteur: {{user_email}}
```

5. **To Email:** `enzo.schneider318@gmail.com`
6. Cliquez sur **"Save"**

### 1.4 - Récupérer votre Public Key

1. Allez dans **"Account"** → **"General"**
2. Trouvez **"Public Key"**
3. **Notez-la** (ex: `AbCdEfGhIjKlMnOp`)

---

## 🔑 Étape 2 : Configurer les clés dans le projet

Ouvrez le fichier `src/lib/emailjs.ts` et remplacez les valeurs :

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_abc123',           // ← Votre Service ID
  TEMPLATE_CONTACT: 'template_contact',    // ← ID du template Contact
  TEMPLATE_QUOTE: 'template_quote',        // ← ID du template Devis
  TEMPLATE_FEEDBACK: 'template_feedback',  // ← ID du template Feedback
  PUBLIC_KEY: 'AbCdEfGhIjKlMnOp',          // ← Votre Public Key
};
```

---

## 🏗️ Étape 3 : Build du site

1. Ouvrez PowerShell dans le dossier du projet
2. Lancez la commande de build :

```powershell
npm run build
```

3. Un dossier **`dist/`** sera créé avec tous les fichiers du site

---

## 🚀 Étape 4 : Déploiement sur OVH

### 4.1 - Accéder à l'hébergement OVH

1. Connectez-vous à [https://www.ovh.com/manager/](https://www.ovh.com/manager/)
2. Allez dans **"Hébergements Web"**
3. Cliquez sur votre hébergement

### 4.2 - Uploader les fichiers via FTP

#### Option A : Via FileZilla (recommandé)

1. Téléchargez [FileZilla](https://filezilla-project.org/)
2. Dans OVH Manager, allez dans **"FTP-SSH"** → Notez :
   - **Hôte FTP** (ex: `ftp.cluster123.hosting.ovh.net`)
   - **Login FTP** (ex: `votre_login`)
   - Créez un **mot de passe FTP** si nécessaire
3. Ouvrez FileZilla et connectez-vous avec ces identifiants
4. Sur le serveur OVH, allez dans le dossier **`www/`**
5. **Supprimez tout ce qu'il y a dedans**
6. Uploadez **tout le contenu** du dossier **`dist/`** dans **`www/`**

#### Option B : Via le gestionnaire de fichiers OVH

1. Dans OVH Manager, cliquez sur **"FTP-SSH"** → **"Explorateur FTP"**
2. Allez dans le dossier **`www/`**
3. Supprimez tout ce qu'il y a dedans
4. Uploadez tous les fichiers du dossier **`dist/`**

### 4.3 - Configuration du domaine

1. Dans OVH Manager, allez dans **"Multisite"**
2. Vérifiez que votre domaine pointe sur le dossier **`www/`**
3. Si vous avez plusieurs domaines (.com et .fr), ajoutez-les tous les deux

### 4.4 - Activer HTTPS/SSL

1. Dans OVH Manager, allez dans **"SSL"**
2. Activez le certificat SSL gratuit Let's Encrypt
3. Attendez quelques minutes pour la propagation

---

## ✅ Étape 5 : Vérification

1. Allez sur **lechappeedemma.com** et **lechappeedemma.fr**
2. Testez les 3 formulaires :
   - Page **Contact**
   - Page **Créer mon voyage** (devis)
   - Widget **Feedback** (apparaît après 5 secondes)
3. Vérifiez que vous recevez bien les emails sur `enzo.schneider318@gmail.com`

---

## 🔧 Configuration optionnelle

### Redirection .fr → .com (ou inverse)

Si vous voulez que `.fr` redirige vers `.com` :

1. Dans OVH Manager → **"Domaines"** → Sélectionnez `.fr`
2. Allez dans **"Redirection"**
3. Configurez une redirection 301 vers `https://lechappeedemma.com`

### Fichier robots.txt et sitemap.xml

Les fichiers sont déjà présents dans `public/`. Après le build, ils seront automatiquement copiés à la racine du site.

Pour le sitemap, remplacez les URLs par vos vraies URLs :

Ouvrez `public/sitemap.xml` et remplacez `https://example.com` par `https://lechappeedemma.com`

---

## ⭐ Activer les avis Google (Places API)

La section avis Google du site est déjà prête. Il reste uniquement à connecter votre clé API Google.

### 1) Créer un projet Google Cloud

1. Ouvrez [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. Créez un projet (ou réutilisez un projet existant)
3. Vérifiez que la facturation est activée sur ce projet

### 2) Activer l’API nécessaire

1. Dans **APIs & Services** → **Library**
2. Activez **Places API**

### 3) Générer une clé API

1. Allez dans **APIs & Services** → **Credentials**
2. Cliquez sur **Create Credentials** → **API key**
3. Copiez la clé

### 4) Sécuriser la clé (fortement recommandé)

Dans la clé API :

- **API restrictions** : autorisez uniquement **Places API**
- **Application restrictions** :
   - si usage serveur uniquement : limitez par IP du serveur
   - si plusieurs environnements, ajoutez les IP/serveurs nécessaires

### 5) Configurer les variables d’environnement serveur

Dans l’environnement du backend (local + production), ajoutez :

```env
GOOGLE_MAPS_API_KEY=VOTRE_CLE_API
GOOGLE_PLACE_ID=ChIJm2NF0mML5kcRXlMfFIy36ew
CONTACT_PORT=3001
```

> `GOOGLE_PLACE_ID` est déjà prérempli dans le code avec votre fiche :
> **L'échappée d'Emma - Travel Planner Grand Nord**
> `ChIJm2NF0mML5kcRXlMfFIy36ew`

### 6) Redémarrer les services

En local :

```powershell
# Terminal 1
npm run server

# Terminal 2
npm run dev
```

### 7) Vérifier le fonctionnement

1. Ouvrez la page d’accueil
2. Allez à la section **Vos avis Google**
3. Vérifiez que les avis s’affichent
4. Le bouton **Laisser un avis Google** ouvre bien Google

### Dépannage rapide

- **Aucun avis affiché** : vérifiez `GOOGLE_MAPS_API_KEY`
- **Erreur API** : vérifiez que **Places API** est bien activée
- **403/permission denied** : ajustez les restrictions de clé (API/IP)
- **En local via Vite** : le proxy `/api` vers `http://localhost:3001` doit être actif


---

## 📊 Limites EmailJS (gratuit)

- **200 emails par mois**
- Si vous dépassez, vous pouvez passer au plan payant (7€/mois pour 1000 emails)

---

## 🆘 Dépannage

### Les emails ne sont pas reçus

1. Vérifiez les **Templates EmailJS** (bon format de variables)
2. Vérifiez votre **Service Email** (bien connecté)
3. Regardez dans les **Spams**
4. Vérifiez dans EmailJS → **"Auto-Reply"** que l'email est bien configuré

### Le site ne s'affiche pas

1. Vérifiez que tous les fichiers du dossier `dist/` sont bien uploadés
2. Vérifiez que le fichier `index.html` est bien à la racine de `www/`
3. Videz le cache du navigateur (Ctrl+F5)

### Erreur 404 sur les pages

Ajoutez un fichier `.htaccess` dans le dossier `www/` avec :

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

## 📝 Checklist finale

- [ ] Compte EmailJS créé
- [ ] Service email connecté
- [ ] 3 templates créés (Contact, Devis, Feedback)
- [ ] Clés EmailJS configurées dans `src/lib/emailjs.ts`
- [ ] Build réalisé (`npm run build`)
- [ ] Fichiers uploadés sur OVH
- [ ] Domaines configurés
- [ ] SSL activé
- [ ] Formulaires testés et emails reçus

---

🎉 **Félicitations ! Votre site est en ligne !**

Pour toute modification du site, il faudra :
1. Modifier le code
2. Relancer `npm run build`
3. Ré-uploader le contenu de `dist/` sur OVH
