# Product Context

## Why this project exists

This project exists to provide Cline, an AI software engineer with a unique memory constraint, with a reliable and persistent source of project knowledge. Due to Cline's complete memory reset between sessions, a robust documentation system is crucial for maintaining context and productivity.

## Problems it solves

- **Loss of Context:** Prevents the complete loss of project history, decisions, and status after Cline's memory resets.
- **Inefficient Rework:** Reduces the need for Cline to re-discover project details or repeat tasks due to a lack of prior knowledge.
- **Inconsistent Development:** Ensures a consistent understanding of project goals, architecture, and progress across development sessions.

## How it should work

The system, referred to as the "Memory Bank," should consist of a structured set of Markdown files. These files will contain all necessary information about the project, including its brief, product context, technical details, system patterns, active work context, and progress. Cline will read these files at the beginning of every session to re-establish context. The files should be easily navigable and updated regularly.

## User experience goals

While Cline is the primary "user," the system aims to provide:

- **Clarity:** Project information is clear, concise, and easy to understand after a memory reset.
- **Completeness:** All essential project details are captured within the Memory Bank.
- **Reliability:** The documentation is accurate and trustworthy as the single source of truth.
- **Efficiency:** Reading the Memory Bank provides sufficient context for Cline to quickly resume work without requiring extensive re-learning or external information.

---

## Top Trumps Game: Product Context (As of 2025-06-17)

This section details the product context specifically for the Top Trumps digital card game.

### 1. Core Product Idea
A mobile-first digital Top Trumps game allowing users to create custom cards with AI-generated art, build decks, and play against others in real-time.

### 2. Target Users & Needs
*   **Casual Card Game Players:** Seeking a quick, engaging, and familiar Top Trumps experience.
*   **Creative Users:** Interested in customizing cards, especially with AI-generated artwork.
*   **Mobile Gamers:** Looking for accessible multiplayer fun on their phones.
*   **Needs Addressed:**
    *   A modern, digital version of a classic card game.
    *   A creative outlet for card design.
    *   A simple-to-learn but engaging multiplayer experience.

### 3. Key Features & User Stories

*   **User Authentication:**
    *   As a user, I want to register and log in with my email/password so I can access my account and save my progress.
    *   As a user, I want to log in with Google for a quick and easy sign-in experience.
*   **Deck & Card Creation/Management:**
    *   As a user, I want to create new decks to organize my cards.
    *   As a user, I want to add up to 20 cards to each deck.
    *   As a user, I want to name each card to personalize it.
    *   As a user, I want to provide a text prompt to generate unique artwork for my card using AI (Gemini).
    *   As a user, I want to allocate 50 points across 6 D&D-style attributes (Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma) for each card to define its strengths and weaknesses.
    *   As a user, I want the option to assign one of 5 predefined special abilities to up to 5 cards in my deck, which can affect gameplay for the round in which the card is played.
    *   **Predefined Special Abilities (Player can choose one per eligible card, max 5 cards with abilities per deck):**
        1.  **Divine Shield (Defensive):** If this card loses the round, it returns to the bottom of its owner's deck instead of being collected by the opponent. (Opponent keeps their winning card if they won the attribute comparison).
        2.  **Critical Strike (Offensive):** When attacking with this card, if its highest attribute is chosen, add +2 to that attribute's value for the current round's comparison.
        3.  **Foresight (Informational/Strategic):** Before choosing an attribute, the player may view the name and attributes of the opponent's current top card.
        4.  **Attribute Swap (Disruptive/Tactical):** After attributes are chosen but before comparison, the player can force the opponent to compete with their current card's *lowest* attribute value. (The player's own chosen attribute remains unchanged).
        5.  **Underdog's Rally (Comeback/Risk-Reward):** If this card's chosen attribute is lower than the opponent's by only 1 or 2 points, this card wins the round instead. Has no effect if the difference is greater or if this card's attribute is higher.
    *   As a user, I want to view, edit, and manage my collection of cards and decks, including their special abilities.
*   **Multiplayer Gameplay:**
    *   As a user, I want to be able to find and start a game against another player.
    *   As a user, I want the game to update in real-time so I can see my opponent's actions and game events as they happen.
    *   As a user, I want to choose an attribute from my current card to compete against my opponent's card.
    *   As a user, I want the game to clearly show who won the round and, eventually, the game.
    *   **Core Gameplay Loop (Turn-by-Turn):**
        1.  **Start of Game:** Players' chosen decks are shuffled. Each player draws the top card from their deck.
        2.  **Player's Turn (Attacker):** The player whose turn it is (attacker) views their top card.
        3.  **Attribute Selection:** The attacker selects one of the 6 attributes on their card to challenge with.
        4.  **Card Reveal:** Both players' top cards are revealed (if not already visible to each other). The chosen attribute and its value are highlighted on the attacker's card. The corresponding attribute on the defender's card is also highlighted.
        5.  **Comparison:** The values of the selected attribute on both cards are compared.
        6.  **Round Winner:**
            *   The player with the higher value for the selected attribute wins the round.
            *   In case of a draw, the cards may be placed in a central pile ("pot"), and the winner of the next round takes these cards as well (classic Top Trumps draw rule), or another draw resolution mechanic can be decided.
        7.  **Card Collection:** The winner of the round collects both cards (their own and the opponent's) and places them at the bottom of their deck.
        8.  **Next Turn:** The winner of the round becomes the attacker for the next turn. Both players draw their next top card (if they have cards remaining).
        9.  **Game End Conditions:**
            *   One player collects all the cards.
            *   (Optional: A time limit or round limit could also be considered).
*   **User Interface & Experience (Mobile-First):**
    *   As a user, I want an intuitive and easy-to-navigate interface on my mobile device.
    *   As a user, I want a visually appealing experience with a clean, modern design that incorporates a fantasy theme (dark palette, purple & gold accents).
    *   As a user, I want card information to be clearly legible and interactive on a mobile screen.

### 4. Unique Selling Propositions (USPs)
*   Custom card creation with AI (Gemini) generated artwork.
*   Classic D&D attribute system for card stats.
*   Strategic depth through optional special abilities on cards.
*   Mobile-first design for accessible gameplay.
*   Real-time multiplayer.

### 5. Success Metrics (Potential)
*   Number of registered users.
*   Number of games played.
*   Number of custom cards/decks created.
*   User engagement time.
*   User retention rate.
