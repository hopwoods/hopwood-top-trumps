/**
 * Represents the possible categories for a special ability.
 * This helps in classifying and potentially applying logic based on the ability type.
 */
export const SpecialAbilityCategory = {
  ATTRIBUTE_MODIFICATION: 'ATTRIBUTE_MODIFICATION',
  GAMEPLAY_MANIPULATION: 'GAMEPLAY_MANIPULATION',
  INFORMATION: 'INFORMATION',
  ROUND_MODIFICATION: 'ROUND_MODIFICATION',
} as const;

export type SpecialAbilityCategory = typeof SpecialAbilityCategory[keyof typeof SpecialAbilityCategory];

/**
 * Defines the structure for a special ability that a card can have.
 */
export interface SpecialAbility {
  /** A unique identifier for the special ability, especially if they become predefined or reusable. */
  readonly id: string;
  /** The name of the special ability. */
  name: string;
  /** A detailed description of what the special ability does. */
  description: string;
  /** The category of the special ability. */
  category: SpecialAbilityCategory;
  /**
   * Optional field to store specific parameters or details related to the ability's effect.
   * For example, { "attribute": "strength", "modifier": 2 } for an attribute modification.
   * // TODO: [DECK_MGMT_EFFECT_DETAILS] Refine this 'unknown' type once specific effect structures are defined.
   */
  effectDetails?: Record<string, unknown>;
}

/**
 * Represents the six core attributes of a card.
 * Each attribute value is expected to be between 1 and 10.
 * The sum of all attributes for a single card must equal 50.
 */
export interface CardAttributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

/**
 * Defines the structure for a single card.
 */
export interface Card {
  /** A unique, immutable identifier for the card (e.g., UUID). */
  readonly id: string;
  /** The name of the card. */
  name: string;
  /** An optional URL for the card's image. */
  imageUrl?: string;
  /** The core attributes of the card. */
  attributes: CardAttributes;
  /** Each card can have one special ability (optional for default deck). */
  specialAbility?: SpecialAbility;
  /** Timestamp for when the card was created. */
  readonly createdAt: Date;
  /** Timestamp for when the card was last updated. */
  updatedAt: Date;
}

/**
 * Defines the structure for a deck of cards.
 */
export interface Deck {
  /** A unique, immutable identifier for the deck (e.g., UUID). */
  readonly id: string;
  /** The identifier of the user who owns this deck. */
  userId: string;
  /** The name of the deck. */
  name: string;
  /** An optional description for the deck. */
  description?: string;
  /** An array containing the cards in this deck. */
  cards: Card[];
  /** Optional: The number of cards in the deck. */
  cardCount?: number;
  /** Optional: The maximum number of cards allowed in this deck. */
  maxSize?: number;
  /** Optional: The minimum number of cards required in this deck. */
  minSize?: number;
  /** Timestamp for when the deck was created. */
  readonly createdAt: Date;
  /** Timestamp for when the deck was last updated. */
  updatedAt: Date;
}

/**
 * Defines the shape of the data payload for updating a deck.
 * This ensures only specific, editable fields are sent in the update operation.
 */
export type DeckUpdatePayload = Pick<Deck, 'name' | 'description'>;

export interface DeckMachineInput {
  userId: string;
}

export interface DeckMachineContext {
  userId: string | null; // Store the userId from input
  decks: Deck[]
  selectedDeck: Deck | null
  deckToDelete: { id: string; name: string } | null
  error: Error | null
  // TODO: [DECK_MGMT_CARD_EDIT] Add context for current card being edited/created if needed
}

export type DeckMachineEvents =
  | { type: 'FETCH_DECKS' }
  | { type: 'FETCH_DECKS_SUCCESS'; output: Deck[] }
  | { type: 'FETCH_DECKS_FAILURE'; error: Error }
  | { type: 'CREATE_NEW_DECK' } // Event to initiate new deck creation UI
  | { type: 'EDIT_DECK'; deck: Deck } // Event to select a deck for editing
  | { type: 'VIEW_DECK_LIST' } // Event to go back to viewing the list of decks
  | { type: 'SAVE_DECK'; deck: Partial<Deck> & { name: string } }
  | { type: 'SAVE_DECK_SUCCESS'; output: Deck }
  | { type: 'SAVE_DECK_FAILURE'; error: Error }
  | { type: 'DELETE_DECK'; deckId: string; deckName: string }
  | { type: 'CONFIRM_DELETE' }
  | { type: 'CANCEL_DELETE' }
  | { type: 'DELETE_DECK_SUCCESS'; output: { id: string } }
  | { type: 'DELETE_DECK_FAILURE'; error: Error }
  | { type: 'ADD_CARD_TO_DECK'; deckId: string; card: Card } // More granular events for card ops
  | { type: 'UPDATE_CARD_IN_DECK'; deckId: string; card: Card }
  | { type: 'REMOVE_CARD_FROM_DECK'; deckId: string; cardId: string }
  | { type: 'CANCEL_DECK_EDIT' } // To cancel editing/creating a deck
