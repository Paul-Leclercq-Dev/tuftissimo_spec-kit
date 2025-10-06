# Workflow de Commande Utilisateur - Tuftissimo

> **Version**: 2.7 · **Date**: 6 octobre 2025 · **API**: http://localhost:3000

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Types de commandes](#types-de-commandes)
3. [Workflow Commande Produit](#workflow-commande-produit)
4. [Workflow Commande Sur-mesure](#workflow-commande-sur-mesure)
5. [Calculs de Prix](#calculs-de-prix)
6. [Gestion Utilisateur/Guest](#gestion-utilisateurguest)
7. [États des commandes](#états-des-commandes)
8. [Exemples concrets](#exemples-concrets)

---

## 🎯 Vue d'ensemble

Le système Tuftissimo gère **deux types de commandes** :
- **Commande Produit** : Sélection d'un produit catalogue avec personnalisation
- **Commande Sur-mesure** : Création complètement personnalisée avec devis

Chaque commande peut être passée par :
- **Utilisateur connecté** (`userId` rempli)
- **Utilisateur guest** (`userId = null`, email obligatoire)

---

## 🛍️ Types de commandes

### 1. Commande Produit (`OrderKind.PRODUCT`)
- Basée sur un produit existant du catalogue
- Personnalisation via enums : `material`, `size`, `backing`
- Prix calculé automatiquement selon les facteurs
- Stock décompté automatiquement

### 2. Commande Sur-mesure (`OrderKind.CUSTOM`)
- Création libre avec brief client
- Processus de devis préalable
- Conversion en commande après acceptation
- Pas de décompte stock

---

## 🛒 Workflow Commande Produit

### **Étape 1 : Sélection produit**
```
Utilisateur navigue → Catalogue → Fiche produit
```

### **Étape 2 : Personnalisation**
```
Choix des options :
- Material: COTTON_A | COTTON_B | WOOL_A
- Size: S | M | L  
- Backing: ADHESIVE | NON_ADHESIVE
- Quantity: nombre entier ≥ 1
```

### **Étape 3 : Ajout au panier/Commande directe**
```http
POST /orders/product
Content-Type: application/json

{
  "productSlug": "tapis-moderne-bleu",
  "material": "COTTON_B",
  "size": "M", 
  "backing": "ADHESIVE",
  "quantity": 2,
  "email": "client@example.com",
  "address": "123 Rue de la Paix, Madrid",
  "country": "ES"
}
```

### **Étape 4 : Traitement serveur**
```typescript
// 1. Validation produit
const product = await prisma.product.findUnique({ where: { slug } });
// Vérifications : existe, prix défini, stock suffisant

// 2. Calcul prix unitaire
const unitPrice = calculateUnitPrice(
  product.priceCents,  // ex: 5000 (50€)
  "COTTON_B",          // facteur 1.1
  "M",                 // facteur 1.3  
  "ADHESIVE"           // +300 cents
);
// Résultat : 5000 * 1.1 * 1.3 + 300 = 7450 cents

// 3. Calcul totaux
const totals = computeTotals(7450, 2, "ES");
// subtotal: 14900, tax: 3129, shipping: 500, total: 18529

// 4. Transaction DB
await prisma.$transaction([
  // Décompte stock
  prisma.product.update({ 
    where: { id }, 
    data: { stock: stock - quantity } 
  }),
  // Création commande
  prisma.order.create({ data: orderData })
]);
```

### **Étape 5 : Réponse**
```json
{
  "id": 123,
  "kind": "PRODUCT", 
  "status": "pending",
  "lineLabel": "Tapis Moderne Bleu — COTTON_B/M/ADHESIVE",
  "quantity": 2,
  "priceCents": 14900,
  "taxCents": 3129,
  "shippingCents": 500,
  "totalCents": 18529,
  "currency": "EUR",
  "email": "client@example.com",
  "country": "ES",
  "productId": 456,
  "userId": null
}
```

---

## 🎨 Workflow Commande Sur-mesure

### **Étape 1 : Demande de devis**
```http
POST /custom-order
Content-Type: application/json

{
  "width": 120.5,
  "height": 80,
  "colors": ["bleu", "blanc", "gris"],
  "inspirationUrl": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  "notes": "Style moderne, motif géométrique",
  "materialCode": "WOOL_A",
  "sizeCode": "L",
  "backing": "NON_ADHESIVE",
  "requesterName": "Marie Dupont",
  "requesterEmail": "marie@example.com"
}
```

### **Étape 2 : Traitement demande**
```typescript
// Création CustomOrder
const customOrder = await prisma.customOrder.create({
  data: {
    ...dto,
    colors: JSON.stringify(dto.colors),
    status: "new"
  }
});
```

### **Étape 3 : Processus de devis (manuel)**
```
Artisan étudie la demande → Calcule prix → Envoie devis
```

### **Étape 4 : Mise à jour devis**
```http
PATCH /custom-order/123
Content-Type: application/json

{
  "quotedPriceCents": 25000,  // 250€
  "status": "quoted"
}
```

### **Étape 5 : Acceptation client & Conversion**
```http
POST /custom-order/123/accept
```

```typescript
// Conversion en Order
const order = await prisma.order.create({
  data: {
    kind: "CUSTOM",
    customOrderId: customOrder.id,
    lineLabel: "Commande artisanale",
    quantity: 1,
    priceCents: customOrder.quotedPriceCents,
    // + calculs TVA/livraison
    email: customOrder.requesterEmail,
    userId: userId ?? null
  }
});
```

---

## 💰 Calculs de Prix

### **Facteurs de prix (pricing.ts)**
```typescript
// Matériaux
COTTON_A: 1.0    // Prix de base
COTTON_B: 1.1    // +10%
WOOL_A: 1.25     // +25%

// Tailles  
S: 1.0           // Prix de base
M: 1.3           // +30%
L: 1.6           // +60%

// Backing
NON_ADHESIVE: 0  // Gratuit
ADHESIVE: 300    // +3€
```

### **Calcul unitaire**
```typescript
function calculateUnitPrice(basePriceCents, material, size, backing) {
  return Math.round(
    basePriceCents * MATERIAL_FACTOR[material] * SIZE_FACTOR[size] + BACKING_ADD_CTS[backing]
  );
}
```

### **Calcul totaux (compute-totals.ts)**
```typescript
function computeTotals(unitPriceCents, quantity, country) {
  const subtotalCents = Math.round(unitPriceCents * quantity);
  const taxCents = Math.round((subtotalCents * 21) / 100);  // TVA 21%
  const shippingCents = country === 'ES' ? 500 : 1000;      // ES: 5€, FR: 10€
  const totalCents = subtotalCents + taxCents + shippingCents;
  
  return { subtotalCents, taxCents, shippingCents, totalCents, vatRatePercent: 21 };
}
```

---

## 👤 Gestion Utilisateur/Guest

### **Utilisateur connecté**
```http
Authorization: Bearer jwt_token
# ou Cookie: access_token=jwt_token

POST /orders/product
# userId automatiquement extrait du token
```

### **Utilisateur guest**
```http
# Pas d'authentification

POST /orders/product
{
  "email": "guest@example.com",  // Obligatoire
  // ... autres champs
}
# userId = null dans la DB
```

### **Consultation commandes**
```http
# Utilisateur connecté
GET /orders?user=me
Authorization: Bearer jwt_token

# Réponse : seulement ses commandes
```

---

## 📊 États des commandes

```typescript
enum OrderStatus {
  pending    // Créée, en attente paiement
  paid       // Payée (via webhook Stripe)
  failed     // Paiement échoué
  preparing  // En préparation 
  shipped    // Expédiée
  cancelled  // Annulée
}
```

### **Transitions d'états**
```
pending → paid (webhook Stripe)
pending → failed (webhook Stripe)
paid → preparing (action admin)
preparing → shipped (action admin)
pending|paid → cancelled (action admin)
```

---

## 📝 Exemples concrets

### **Exemple 1 : Commande simple utilisateur connecté**

**Contexte** : Marie (connectée) commande 1 tapis coton M avec backing adhésif

```http
POST /orders/product
Authorization: Bearer eyJhbGciOiJIUzI1...
Content-Type: application/json

{
  "productSlug": "tapis-salon-beige",
  "material": "COTTON_A", 
  "size": "M",
  "backing": "ADHESIVE",
  "quantity": 1,
  "email": "marie@tuftissimo.com",
  "address": "45 Calle Mayor, Madrid",
  "country": "ES"
}
```

**Calculs** :
- Prix base produit : 8000 cents (80€)
- Material COTTON_A : ×1.0 = 8000
- Size M : ×1.3 = 10400  
- Backing ADHESIVE : +300 = 10700 cents
- Subtotal : 10700 cents
- TVA 21% : 2247 cents
- Livraison ES : 500 cents
- **Total : 13447 cents (134.47€)**

**Réponse** :
```json
{
  "id": 789,
  "kind": "PRODUCT",
  "status": "pending",
  "lineLabel": "Tapis Salon Beige — COTTON_A/M/ADHESIVE",
  "quantity": 1,
  "priceCents": 10700,
  "taxCents": 2247, 
  "shippingCents": 500,
  "totalCents": 13447,
  "currency": "EUR",
  "email": "marie@tuftissimo.com",
  "address": "45 Calle Mayor, Madrid",
  "country": "ES",
  "userId": 456,
  "productId": 123,
  "createdAt": "2025-10-06T10:30:00Z"
}
```

### **Exemple 2 : Commande guest multiple**

**Contexte** : Client anonyme commande 3 tapis laine L pour la France

```http
POST /orders/product
Content-Type: application/json

{
  "productSlug": "tapis-berbere-rouge",
  "material": "WOOL_A",
  "size": "L", 
  "backing": "NON_ADHESIVE",
  "quantity": 3,
  "email": "client.paris@gmail.com",
  "address": "12 Rue de Rivoli, Paris",
  "country": "FR"
}
```

**Calculs** :
- Prix base : 12000 cents (120€)
- Material WOOL_A : ×1.25 = 15000
- Size L : ×1.6 = 24000
- Backing NON_ADHESIVE : +0 = 24000 cents/unité
- Subtotal 3 unités : 72000 cents
- TVA 21% : 15120 cents  
- Livraison FR : 1000 cents
- **Total : 88120 cents (881.20€)**

### **Exemple 3 : Commande sur-mesure**

**Phase 1 - Demande devis** :
```http
POST /custom-order
{
  "width": 200,
  "height": 150, 
  "colors": ["noir", "or", "blanc"],
  "inspirationUrl": "https://pinterest.com/pin/123456",
  "notes": "Motif art déco pour salon de luxe",
  "requesterName": "Jean Dupuis",
  "requesterEmail": "jean.dupuis@luxury.com"
}
```

**Phase 2 - Artisan établit devis** :
```http
PATCH /custom-order/555
{
  "quotedPriceCents": 45000,  // 450€
  "status": "quoted"
}
```

**Phase 3 - Client accepte** :
```http  
POST /custom-order/555/accept
Authorization: Bearer jwt_token_jean
```

**Résultat - Order créée** :
```json
{
  "id": 999,
  "kind": "CUSTOM",
  "status": "pending", 
  "customOrderId": 555,
  "lineLabel": "Commande artisanale",
  "quantity": 1,
  "priceCents": 45000,
  "taxCents": 9450,   // 21% de 45000
  "shippingCents": 500,
  "totalCents": 54950, // 549.50€
  "currency": "EUR",
  "email": "jean.dupuis@luxury.com",
  "userId": 789
}
```

---

## 🔄 Routes API Complètes

### **Endpoints de commande**
```
POST   /orders/product     # Commande produit avec calculs
POST   /orders             # Commande générique (admin)
GET    /orders             # Liste toutes (admin)
GET    /orders?user=me     # Mes commandes (user)
GET    /orders/:id         # Détail commande
PUT    /orders/:id         # Modification (admin)
DELETE /orders/:id         # Suppression (admin)
```

### **Endpoints sur-mesure**
```
POST   /custom-order       # Demande devis
GET    /custom-order       # Liste devis (admin)
GET    /custom-order/:id   # Détail devis
PATCH  /custom-order/:id   # Mise à jour devis
POST   /custom-order/:id/accept  # Accepter → Order
```

### **Endpoints auth**
```
POST   /user/signup        # Inscription
POST   /user/login         # Connexion
POST   /user/logout        # Déconnexion  
GET    /user/me            # Profil user
POST   /admin/login        # Connexion admin
GET    /admin/me           # Profil admin
```

---

## 📚 Documentation technique

- **API Documentation** : http://localhost:3000/api (Swagger)
- **Types TypeScript** : Voir `@prisma/client` 
- **Base de données** : SQLite (dev), PostgreSQL (prod)
- **Authentification** : JWT en cookies httpOnly
- **Validation** : class-validator + DTO NestJS

---

**Prochaines étapes** : Intégration Stripe (webhooks), emails Resend, frontend Next.js

---

*Généré le 6 octobre 2025 - API Tuftissimo v2.7*