// Using relative path assuming this file is in fable-forge-functions/src/data/
// and types are in fable-forge-functions/src (if copied) or accessible via a path alias.
// For now, let's define simplified types here for the data structure.
// If types can be shared from the main /src directory, that's preferable.
// Assuming for now we define local types for clarity within functions.

interface CardAttributesData {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

interface CardDataForCreation {
  name: string;
  imageUrl?: string;
  attributes: CardAttributesData;
  // specialAbility is omitted as per user request for default deck
}

interface DeckDataForCreation {
  name: string;
  description?: string;
  cardsData: CardDataForCreation[];
}

export const staticDefaultDeckData: DeckDataForCreation = {
  name: 'Starter Deck',
  description: 'A balanced deck to get you started on your FableForge journey!',
  cardsData: [
    {
      name: 'Grimgar, Orc Warlord',
      imageUrl: 'https://placehold.co/600x800/2c5282/ffffff?text=Grimgar',
      attributes: { strength: 10, dexterity: 7, constitution: 10, intelligence: 6, wisdom: 9, charisma: 8 },
    },
    {
      name: 'Elara, Sunfire Sorceress',
      imageUrl: 'https://placehold.co/600x800/9b2c2c/ffffff?text=Elara',
      attributes: { strength: 5, dexterity: 8, constitution: 7, intelligence: 10, wisdom: 10, charisma: 10 },
    },
    {
      name: 'Kaelen, Shadow Rogue',
      imageUrl: 'https://placehold.co/600x800/1a202c/ffffff?text=Kaelen',
      attributes: { strength: 7, dexterity: 10, constitution: 7, intelligence: 9, wisdom: 7, charisma: 10 },
    },
    {
      name: 'Sir Gideon, the Stalwart',
      imageUrl: 'https://placehold.co/600x800/b794f4/ffffff?text=Gideon',
      attributes: { strength: 9, dexterity: 6, constitution: 10, intelligence: 7, wisdom: 9, charisma: 9 },
    },
    {
      name: 'Morwen, Witch of the Fens',
      imageUrl: 'https://placehold.co/600x800/2c7a7b/ffffff?text=Morwen',
      attributes: { strength: 5, dexterity: 7, constitution: 8, intelligence: 10, wisdom: 10, charisma: 10 },
    },
    {
      name: 'Drakon, the Ancient Wyrm',
      imageUrl: 'https://placehold.co/600x800/c53030/ffffff?text=Drakon',
      attributes: { strength: 10, dexterity: 5, constitution: 10, intelligence: 10, wisdom: 8, charisma: 7 },
    },
    {
      name: 'The Void Lich',
      imageUrl: 'https://placehold.co/600x800/5a3e8a/ffffff?text=Void+Lich',
      attributes: { strength: 6, dexterity: 6, constitution: 8, intelligence: 10, wisdom: 10, charisma: 10 },
    },
    {
      name: 'Anya, Swiftfoot Ranger',
      imageUrl: 'https://placehold.co/600x800/38a169/ffffff?text=Anya',
      attributes: { strength: 7, dexterity: 10, constitution: 8, intelligence: 7, wisdom: 10, charisma: 8 },
    },
    {
      name: 'Brother Theron, Cleric of Light',
      imageUrl: 'https://placehold.co/600x800/f6e05e/000000?text=Theron',
      attributes: { strength: 8, dexterity: 6, constitution: 9, intelligence: 7, wisdom: 10, charisma: 10 },
    },
    { // Glimmer - Cha 11 -> 10, +1 Str
      name: 'Glimmer, Fey Trickster',
      imageUrl: 'https://placehold.co/600x800/ed64a6/ffffff?text=Glimmer',
      attributes: { strength: 5, dexterity: 10, constitution: 6, intelligence: 9, wisdom: 10, charisma: 10 },
    },
    { // Ironhide Golem - Cha 12 -> 10, +2 Dex
      name: 'Ironhide Golem',
      imageUrl: 'https://placehold.co/600x800/718096/ffffff?text=Golem',
      attributes: { strength: 10, dexterity: 5, constitution: 10, intelligence: 5, wisdom: 10, charisma: 10 },
    },
    {
      name: "Captain 'Salty' Silvermane",
      imageUrl: 'https://placehold.co/600x800/4a5568/ffffff?text=Silvermane',
      attributes: { strength: 8, dexterity: 9, constitution: 9, intelligence: 7, wisdom: 7, charisma: 10 },
    },
    {
      name: 'The Silent Assassin',
      imageUrl: 'https://placehold.co/600x800/2d3748/ffffff?text=Assassin',
      attributes: { strength: 7, dexterity: 10, constitution: 7, intelligence: 10, wisdom: 8, charisma: 8 },
    },
    {
      name: 'High Druid Caelan',
      imageUrl: 'https://placehold.co/600x800/3f9142/ffffff?text=Caelan',
      attributes: { strength: 6, dexterity: 7, constitution: 9, intelligence: 9, wisdom: 10, charisma: 9 },
    },
    { // Groknar - Cha 13 -> 10, +2 Dex, +1 Int
      name: 'Groknar, Hill Giant Chieftain',
      imageUrl: 'https://placehold.co/600x800/b7791f/ffffff?text=Groknar',
      attributes: { strength: 10, dexterity: 6, constitution: 10, intelligence: 6, wisdom: 8, charisma: 10 },
    },
    {
      name: 'Seraphina, Celestial Champion',
      imageUrl: 'https://placehold.co/600x800/faf089/000000?text=Seraphina',
      attributes: { strength: 9, dexterity: 8, constitution: 9, intelligence: 8, wisdom: 8, charisma: 8 },
    },
    {
      name: 'The Abyssal Horror',
      imageUrl: 'https://placehold.co/600x800/702459/ffffff?text=Horror',
      attributes: { strength: 10, dexterity: 8, constitution: 10, intelligence: 10, wisdom: 4, charisma: 8 },
    },
    {
      name: 'Master Zhin, Monk of the Four Winds',
      imageUrl: 'https://placehold.co/600x800/667eea/ffffff?text=Zhin',
      attributes: { strength: 8, dexterity: 10, constitution: 8, intelligence: 7, wisdom: 10, charisma: 7 },
    },
    { // Queen Valeriana - Cha 11 -> 10, +1 Str
      name: 'Queen Valeriana, the Diplomat',
      imageUrl: 'https://placehold.co/600x800/d53f8c/ffffff?text=Valeriana',
      attributes: { strength: 6, dexterity: 7, constitution: 7, intelligence: 10, wisdom: 10, charisma: 10 },
    },
    {
      name: 'The Nameless One',
      imageUrl: 'https://placehold.co/600x800/000000/ffffff?text=?',
      attributes: { strength: 8, dexterity: 8, constitution: 9, intelligence: 9, wisdom: 8, charisma: 8 },
    },
  ],
};
