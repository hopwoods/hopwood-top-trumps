# Firestore Schema for FableForge

This document outlines the proposed Firestore schema for storing deck and card data in the FableForge application.

## 1. Decks Collection

*   **Collection Path:** `/decks`
*   **Description:** Stores all user-created decks. Each document represents a single deck.

### Document ID
*   Automatically generated unique ID (e.g., by Firestore `addDoc`). This ID will correspond to `deck.id` in the TypeScript types.

### Fields
*   `userId`
    *   **Type:** `string`
    *   **Description:** The UID of the Firebase authenticated user who owns this deck. Used for security rules and querying user-specific decks.
    *   **Required:** Yes
*   `name`
    *   **Type:** `string`
    *   **Description:** The name of the deck.
    *   **Required:** Yes
*   `description`
    *   **Type:** `string`
    *   **Description:** An optional description for the deck.
    *   **Required:** No
*   `createdAt`
    *   **Type:** `timestamp` (Firestore Server Timestamp)
    *   **Description:** Timestamp indicating when the deck was created.
    *   **Required:** Yes (set by server)
*   `updatedAt`
    *   **Type:** `timestamp` (Firestore Server Timestamp)
    *   **Description:** Timestamp indicating when the deck was last modified.
    *   **Required:** Yes (set by server)
*   `cardCount`
    *   **Type:** `number`
    *   **Description:** The current number of cards in this deck. Can be useful for display and validation. Could be maintained by a Firebase Function or client-side logic.
    *   **Required:** No (but recommended for denormalization)
*   `maxSize`
    *   **Type:** `number`
    *   **Description:** Optional: The maximum number of cards allowed in this deck.
    *   **Required:** No
*   `minSize`
    *   **Type:** `number`
    *   **Description:** Optional: The minimum number of cards required in this deck.
    *   **Required:** No

## 2. Cards Subcollection

*   **Collection Path:** `/decks/{deckId}/cards`
*   **Description:** A subcollection within each deck document. Each document in this subcollection represents a single card belonging to that deck.

### Document ID
*   Automatically generated unique ID (e.g., by Firestore `addDoc`). This ID will correspond to `card.id` in the TypeScript types.

### Fields
*   `name`
    *   **Type:** `string`
    *   **Description:** The name of the card.
    *   **Required:** Yes
*   `imageUrl`
    *   **Type:** `string`
    *   **Description:** Optional URL for the card's image.
    *   **Required:** No
*   `attributes`
    *   **Type:** `map`
    *   **Description:** The core attributes of the card.
    *   **Required:** Yes
    *   **Sub-fields:**
        *   `strength`: `number` (1-10)
        *   `dexterity`: `number` (1-10)
        *   `constitution`: `number` (1-10)
        *   `intelligence`: `number` (1-10)
        *   `wisdom`: `number` (1-10)
        *   `charisma`: `number` (1-10)
*   `specialAbility`
    *   **Type:** `map`
    *   **Description:** The special ability of the card.
    *   **Required:** Yes
    *   **Sub-fields:**
        *   `id`: `string` (Optional, if abilities are predefined and reusable)
        *   `name`: `string`
        *   `description`: `string`
        *   `category`: `string` (e.g., "ATTRIBUTE_MODIFICATION", "GAMEPLAY_MANIPULATION")
        *   `effectDetails`: `map` (Optional, for ability-specific parameters)
*   `createdAt`
    *   **Type:** `timestamp` (Firestore Server Timestamp)
    *   **Description:** Timestamp indicating when the card was created within the deck.
    *   **Required:** Yes (set by server)
*   `updatedAt`
    *   **Type:** `timestamp` (Firestore Server Timestamp)
    *   **Description:** Timestamp indicating when the card was last modified.
    *   **Required:** Yes (set by server)

## 3. Security Rules Considerations (Preliminary)

*   **Decks Collection (`/decks/{deckId}`):**
    *   `allow read, list`: if `request.auth != null && request.auth.uid == resource.data.userId;` (User can only read/list their own decks).
    *   `allow create`: if `request.auth != null && request.resource.data.userId == request.auth.uid;` (User can only create decks for themselves).
    *   `allow update, delete`: if `request.auth != null && request.auth.uid == resource.data.userId;` (User can only update/delete their own decks).
*   **Cards Subcollection (`/decks/{deckId}/cards/{cardId}`):**
    *   `allow read, list, create, update, delete`: if `request.auth != null && get(/databases/$(database)/documents/decks/$(deckId)).data.userId == request.auth.uid;` (User can only manage cards within their own decks).

These rules ensure that users can only access and modify their own data. Further refinement might be needed based on specific sharing or game-play features.

## 4. Indexes

*   Consider creating a composite index on the `decks` collection for `userId` and `updatedAt` (or `createdAt`) if you plan to query user decks sorted by date.
    *   Example: `userId ASC, updatedAt DESC`
