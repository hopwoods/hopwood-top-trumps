# Firebase Integration Documentation

This document outlines how Firebase is integrated into the FableForge application, covering Authentication, Firestore (database), and potentially Cloud Functions.

## Overview

Firebase provides a suite of backend services that accelerate development. In FableForge, we primarily use:
*   **Firebase Authentication:** For user sign-up, login (email/password, Google Sign-In), session management, and user identification.
*   **Cloud Firestore:** A NoSQL document database for storing application data such as user profiles, game decks, game state, etc.
*   **Firebase Cloud Functions (Potentially):** For server-side logic that needs to run in a trusted environment (e.g., complex game actions, interactions with other services, scheduled tasks). The `fable-forge-functions/` directory suggests this is planned or in use.

## Firebase Setup

*   **Configuration:** Firebase project configuration (API keys, project ID, etc.) is stored in `src/Firebase/FirebaseConfig.ts`. This file initializes the Firebase app.
*   **Security Rules:**
    *   Firestore security rules are defined in `firestore.rules`. These rules dictate who can read and write data to different parts of the database, ensuring data integrity and security.
    *   Storage security rules (if Firebase Storage is used) would also be defined.
*   **Indexes:** Firestore query performance can be optimized by defining composite indexes in `firestore.indexes.json`.

## Firebase Authentication

*   **Integration:** Firebase Auth is integrated via the Firebase Web SDK.
*   **Key Operations (handled by XState actors, e.g., in `AppMachine` or `AuthMachine`):**
    *   `checkAuthStatusActor`: Uses `onAuthStateChanged` to monitor the user's authentication state globally.
    *   `registerWithEmailActor`: Handles new user registration with email and password.
    *   `loginWithEmailActor`: Handles user login with email and password.
    *   `loginWithGoogleActor`: Manages Google Sign-In popup flow.
    *   `logoutActor`: Signs the current user out.
*   **User Object:** The Firebase `User` object is stored in the `AppMachine`'s context (`currentUser`) when a user is authenticated. This object contains user UID, email, display name, etc.

## Cloud Firestore (Database)

*   **Data Modeling:** (This section should be expanded with details of the Firestore data structures as the application develops.)
    *   **Users Collection:** Likely a collection to store additional user profile information beyond what Firebase Auth provides (e.g., game statistics, preferences). Documents would typically be keyed by user UID.
    *   **Decks Collection:** To store user-created card decks. Each deck would be a document, potentially in a subcollection under a user or in a top-level collection.
    *   **Games Collection:** To store active or completed game states.
*   **Access Patterns:** Components and XState actors interact with Firestore using the Firebase SDK's functions (`getDoc`, `setDoc`, `addDoc`, `query`, `onSnapshot`, etc.).
*   **Data Fetching & Updates:** Typically handled within XState services/actors to keep this logic separate from UI components and manage loading/error states.

## Firebase Cloud Functions (`fable-forge-functions/`)

*   **Purpose:** If used, Cloud Functions would handle backend logic that shouldn't run on the client for security or performance reasons.
*   **Examples:**
    *   Validating complex game moves.
    *   Calculating scores or rewards.
    *   Interacting with third-party APIs securely.
    *   Performing data migrations or scheduled cleanups.
*   **Triggers:** Functions can be triggered by HTTPS requests, Firestore events (e.g., document creation/update), Auth events (e.g., user creation), Pub/Sub messages, etc.
*   **Development:** The `fable-forge-functions/` directory contains the source code (likely TypeScript, compiled to JavaScript) and deployment configuration for these functions.

## Security Considerations

*   **Firestore Security Rules:** Are critical for protecting data. They should be as restrictive as possible while allowing necessary application functionality.
*   **Cloud Function Security:** If functions are callable via HTTPS, ensure proper authentication and authorization checks are in place.
*   **API Keys:** Firebase API keys in `FirebaseConfig.ts` are generally considered public and are used to identify your Firebase project to Google's servers. Security is primarily enforced by Auth and Firestore/Storage rules, not by hiding these keys.

This documentation provides a high-level overview. Specific implementation details for data models, security rules, and function logic will be documented further as the features are built out.
