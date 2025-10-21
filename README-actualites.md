# Guide d'utilisation du système d'actualités EFMADECH

## Pages créées

### 1. Page Actualités (`actualites.html`)
- Page principale listant tous les articles
- Système de filtres par catégorie (Innovation, Nouveaux Produits, Événements, Entreprise)
- Barre de recherche fonctionnelle
- Pagination automatique
- Design responsive et moderne
- Animations et effets visuels

### 2. Page Article de Référence (`article-automatisation.html`)
- Modèle complet pour créer de nouveaux articles
- Structure professionnelle avec navigation, contenu riche et sidebar
- Table des matières interactive
- Système de partage social
- Articles similaires en sidebar
- Navigation entre articles

## Comment ajouter un nouvel article

### Étape 1 : Créer la page article
1. **Dupliquer** le fichier `article-automatisation.html`
2. **Renommer** le fichier (ex: `article-nouveau-produit.html`)

### Étape 2 : Personnaliser le contenu
Remplacer les éléments suivants dans le nouveau fichier :

#### Titre et métadonnées
```html
<title>Votre Nouveau Titre - EFMADECH</title>
```

#### Breadcrumb
```html
<span>Votre Nouveau Titre</span>
```

#### En-tête d'article
```html
<span class="article-category">Votre Catégorie</span>
<span>Votre Date</span>
<h1 class="article-title fade-in">Votre Titre Principal</h1>
<p class="article-subtitle fade-in">Votre sous-titre/résumé</p>
```

#### Image principale
```html
<!-- Structure simplifiée sans image-container -->
<section class="article-hero-image">
    <div class="container">
        <img src="assets/images/votre-image.jpg" alt="Description de votre image" class="hero-image">
        <div class="image-caption">
            <p>Votre description d'image</p>
        </div>
    </div>
</section>
```
**⚠️ IMPORTANT** : Ne pas ajouter de div `image-container`, utiliser directement cette structure.

#### Contenu principal
- Remplacer les sections `<section id="...">` avec votre contenu
- **IMPORTANT** : Chaque section doit avoir un ID unique correspondant à la table des matières
- Adapter la table des matières dans la sidebar (liens `<a href="#votre-id">`)
- Mettre à jour les articles similaires avec de vraies images et liens
- **ATTENTION** : Vérifier que les textes dans les sections CTA (fond bleu) soient bien visibles

#### Navigation entre articles
```html
<!-- Mettre à jour les liens vers les articles précédent/suivant -->
<a href="article-precedent.html">
<a href="article-suivant.html">
```

### Étape 3 : Ajouter l'article à la page actualités
Dans `actualites.html`, ajouter une nouvelle carte d'article :

```html
<article class="article-card scroll-reveal" data-category="votre-categorie">
    <div class="article-image">
        <img src="assets/images/votre-image.jpg" alt="Description">
        <div class="article-overlay">
            <span class="article-category">Votre Catégorie</span>
            <div class="article-date">
                <i class="fas fa-calendar"></i>
                <span>Votre Date</span>
            </div>
        </div>
    </div>
    <div class="article-content">
        <h3>Votre Titre</h3>
        <p>Votre résumé (150-200 caractères)...</p>
        <div class="article-meta">
            <div class="read-time">
                <i class="fas fa-clock"></i>
                <span>X min de lecture</span>
            </div>
            <a href="votre-article.html" class="read-more">
                Lire plus <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>
</article>
```

## Catégories disponibles
- `innovation` : Innovation
- `produits` : Nouveaux Produits  
- `evenements` : Événements
- `entreprise` : Entreprise

## Images recommandées
- **Articles (page actualités)** : 380x250px minimum
- **Hero image (page article)** : 1200x500px minimum, bien centrée
- **Images contenu** : 700x400px recommandé
- **Sidebar articles similaires** : 60x60px

## Points d'attention pour l'implémentation

### ⚠️ **Problèmes résolus et bonnes pratiques :**

#### 1. **Largeur du contenu**
- Layout : **Sidebar 25%** (1fr) / **Contenu principal 75%** (3fr)
- **IMPORTANT** : Utiliser `grid-template-columns: 1fr 3fr` (sidebar PUIS contenu)
- Le contenu principal a maintenant tout l'espace nécessaire
- Le système est responsive et s'adapte automatiquement

#### 2. **Images**
- **Structure simplifiée** : Pas de `.image-container`, utiliser directement `.hero-image`
- **Hero images** : Recommandé 1200x500px minimum, bien centrées
- **Position de la caption** : Utilise `bottom: 0` et `z-index: 2` pour éviter les superpositions
- **Images article** : 700x400px recommandé
- **Images sidebar** : 60x60px pour les articles similaires
- **⚠️ IMPORTANT** : Effet parallaxe désactivé pour éviter les problèmes de positionnement

#### 3. **Espacement image/contenu**
- L'image hero a `transform: none !important` pour rester fixe
- Padding optimisé : `60px 0 80px 0` et `margin-top: -20px` pour `.article-content`
- **⚠️ NE PAS** réactiver l'effet parallaxe JavaScript sur `.hero-image`

#### 4. **Sections CTA (fond bleu)**
- Le texte utilise `color: var(--white-color) !important` pour être visible
- Règles spécifiques : `.content-section .cta-section h3` et `.content-section .cta-section p`
- Vérifier que le contraste est suffisant

#### 4. **Table des matières**
- Chaque section doit avoir un ID unique (`id="section-name"`)
- Les liens dans la sidebar doivent correspondre (`href="#section-name"`)
- Le JavaScript détecte automatiquement la section active

#### 5. **Responsive**
- Desktop : Layout en 2 colonnes (contenu + sidebar)
- Mobile : Sidebar en haut, contenu en bas
- Tous les éléments s'adaptent automatiquement

### ✅ **Checklist avant publication :**
- [ ] Titre et métadonnées mis à jour
- [ ] Images optimisées et correctement dimensionnées
- [ ] **Structure image hero** sans `.image-container`
- [ ] **Caption image** positionnée correctement (pas de superposition)
- [ ] Table des matières correspond aux sections
- [ ] **Proportions grid** : 1fr 3fr (sidebar 25% / contenu 75%)
- [ ] **Effet parallaxe désactivé** sur l'image hero
- [ ] Texte visible sur fond bleu dans les CTA
- [ ] Articles similaires avec vrais liens
- [ ] Navigation précédent/suivant fonctionnelle
- [ ] **Image hero fixe** sans `translateY`
- [ ] Testé sur mobile et desktop
- [ ] Article ajouté à la page actualités

### 🚫 **Erreurs à éviter :**
- ❌ **NE PAS** ajouter de div `.image-container` 
- ❌ **NE PAS** utiliser `grid-template-columns: 3fr 1fr` (mauvaises proportions)
- ❌ **NE PAS** réactiver l'effet parallaxe JavaScript sur `.hero-image`
- ❌ **NE PAS** supprimer `transform: none !important` de `.hero-image`
- ❌ **NE PAS** modifier les `bottom: 0` et `z-index` de `.image-caption`
- ❌ **NE PAS** supprimer le `margin-top: -20px` de `.article-content`
- ❌ **NE PAS** oublier de tester la superposition image/contenu

### 🔧 **Configuration technique finale :**

#### CSS Grid Layout :
```css
.content-wrapper {
    grid-template-columns: 1fr 3fr; /* Sidebar puis contenu */
}
```

#### Image Hero :
```css
.hero-image {
    transform: none !important; /* Pas d'effet parallaxe */
    position: relative;
}
```

#### JavaScript :
- Effet parallaxe **désactivé** dans `js/article.js`
- Commenté pour éviter les réactivations accidentelles

## Fonctionnalités incluses

### Page Actualités
- ✅ Filtrage par catégorie
- ✅ Recherche en temps réel
- ✅ Pagination automatique
- ✅ Design responsive
- ✅ Animations au scroll
- ✅ Newsletter intégrée

### Page Article
- ✅ Table des matières interactive
- ✅ Partage social (LinkedIn, Twitter, Facebook, Email)
- ✅ Articles similaires
- ✅ Navigation entre articles
- ✅ Barre de progression de lecture
- ✅ Temps de lecture automatique
- ✅ Design professionnel et moderne
- ✅ **Layout optimisé** : Sidebar 25% / Contenu 75%
- ✅ **Image hero stable** sans effet parallaxe

## Fichiers CSS et JS
- `css/actualites.css` : Styles pour la page actualités
- `css/article.css` : Styles pour les pages d'articles
- `js/actualites.js` : Fonctionnalités de la page actualités
- `js/article.js` : Fonctionnalités des articles

## Navigation
La navigation et le footer sont identiques à ceux de la page index, avec les mêmes styles et la même structure, assurant une cohérence parfaite sur tout le site.

## Responsive Design
Toutes les pages sont entièrement responsives et optimisées pour :
- Desktop (1200px+)
- Tablet (768px-1199px)  
- Mobile (jusqu'à 767px)

## Performance et SEO
- Images optimisées
- Chargement progressif
- Structure sémantique HTML5
- Métadonnées appropriées
- URLs propres
