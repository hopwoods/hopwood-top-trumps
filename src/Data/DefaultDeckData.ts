import type { CardAttributes } from '../Machines/DeckMachine/DeckMachine.types'

export interface CardDataForCreation {
  name: string
  imageUrl?: string
  attributes: CardAttributes
  // specialAbility is omitted for the default starter deck
}

export interface DeckDataForCreation {
  name: string
  description?: string
  cardsData: CardDataForCreation[]
}

export const staticDefaultDeckData: DeckDataForCreation = {
  name: 'Starter Deck',
  description: 'A balanced deck to get you started on your FableForge journey!',
  cardsData: [
    {
      name: 'Grimgar, Orc Warlord',
      imageUrl: 'https://placehold.co/600x800/2c5282/ffffff?text=Grimgar',
      // Original: { strength: 10, dexterity: 7, constitution: 10, intelligence: 6, wisdom: 9, charisma: 8 } (Total: 50)
      attributes: { strength: 6, dexterity: 4, constitution: 6, intelligence: 3, wisdom: 4, charisma: 4 }, // Total: 27
    },
    {
      name: 'Elara, Sunfire Sorceress',
      imageUrl: 'https://placehold.co/600x800/9b2c2c/ffffff?text=Elara',
      // Original: { strength: 5, dexterity: 8, constitution: 7, intelligence: 10, wisdom: 10, charisma: 10 } (Total: 50)
      attributes: { strength: 2, dexterity: 5, constitution: 3, intelligence: 6, wisdom: 6, charisma: 5 }, // Total: 27
    },
    {
      name: 'Kaelen, Shadow Rogue',
      imageUrl: 'https://placehold.co/600x800/1a202c/ffffff?text=Kaelen',
      // Original: { strength: 7, dexterity: 10, constitution: 7, intelligence: 9, wisdom: 7, charisma: 10 } (Total: 50)
      attributes: { strength: 4, dexterity: 6, constitution: 4, intelligence: 5, wisdom: 3, charisma: 5 }, // Total: 27
    },
    {
      name: 'Sir Gideon, the Stalwart',
      imageUrl: 'https://placehold.co/600x800/b794f4/ffffff?text=Gideon',
      // Original: { strength: 9, dexterity: 6, constitution: 10, intelligence: 7, wisdom: 9, charisma: 9 } (Total: 50)
      attributes: { strength: 5, dexterity: 3, constitution: 6, intelligence: 4, wisdom: 5, charisma: 4 }, // Total: 27
    },
    {
      name: 'Morwen, Witch of the Fens',
      imageUrl: 'https://placehold.co/600x800/2c7a7b/ffffff?text=Morwen',
      // Original: { strength: 5, dexterity: 7, constitution: 8, intelligence: 10, wisdom: 10, charisma: 10 } (Total: 50)
      attributes: { strength: 2, dexterity: 4, constitution: 4, intelligence: 6, wisdom: 6, charisma: 5 }, // Total: 27
    },
    {
      name: 'Drakon, the Ancient Wyrm',
      imageUrl: 'https://placehold.co/600x800/c53030/ffffff?text=Drakon',
      // Original: { strength: 10, dexterity: 5, constitution: 10, intelligence: 10, wisdom: 8, charisma: 7 } (Total: 50)
      attributes: { strength: 6, dexterity: 3, constitution: 6, intelligence: 5, wisdom: 4, charisma: 3 }, // Total: 27
    },
    {
      name: 'The Void Lich',
      imageUrl: 'https://placehold.co/600x800/5a3e8a/ffffff?text=Void+Lich',
      // Original: { strength: 6, dexterity: 6, constitution: 8, intelligence: 10, wisdom: 10, charisma: 10 } (Total: 50)
      attributes: { strength: 3, dexterity: 3, constitution: 4, intelligence: 6, wisdom: 6, charisma: 5 }, // Total: 27
    },
    {
      name: 'Anya, Swiftfoot Ranger',
      imageUrl: 'https://placehold.co/600x800/38a169/ffffff?text=Anya',
      // Original: { strength: 7, dexterity: 10, constitution: 8, intelligence: 7, wisdom: 10, charisma: 8 } (Total: 50)
      attributes: { strength: 4, dexterity: 6, constitution: 4, intelligence: 3, wisdom: 6, charisma: 4 }, // Total: 27
    },
    {
      name: 'Brother Theron, Cleric of Light',
      imageUrl: 'https://placehold.co/600x800/f6e05e/000000?text=Theron',
      // Original: { strength: 8, dexterity: 6, constitution: 9, intelligence: 7, wisdom: 10, charisma: 10 } (Total: 50)
      attributes: { strength: 4, dexterity: 3, constitution: 5, intelligence: 4, wisdom: 6, charisma: 5 }, // Total: 27
    },
    {
      name: 'Glimmer, Fey Trickster',
      imageUrl: 'https://placehold.co/600x800/ed64a6/ffffff?text=Glimmer',
      // Original: { strength: 5, dexterity: 10, constitution: 6, intelligence: 9, wisdom: 10, charisma: 10 } (Total: 50)
      attributes: { strength: 2, dexterity: 6, constitution: 3, intelligence: 5, wisdom: 6, charisma: 5 }, // Total: 27
    },
    {
      name: 'Ironhide Golem',
      imageUrl: 'https://placehold.co/600x800/718096/ffffff?text=Golem',
      // Original: { strength: 10, dexterity: 5, constitution: 10, intelligence: 5, wisdom: 10, charisma: 10 } (Total: 50)
      attributes: { strength: 6, dexterity: 3, constitution: 6, intelligence: 2, wisdom: 5, charisma: 5 }, // Total: 27
    },
    {
      name: "Captain 'Salty' Silvermane",
      imageUrl: 'https://placehold.co/600x800/4a5568/ffffff?text=Silvermane',
      // Original: { strength: 8, dexterity: 9, constitution: 9, intelligence: 7, wisdom: 7, charisma: 10 } (Total: 50)
      attributes: { strength: 4, dexterity: 5, constitution: 5, intelligence: 3, wisdom: 3, charisma: 7 }, // Total: 27
    },
    {
      name: 'The Silent Assassin',
      imageUrl: 'https://placehold.co/600x800/2d3748/ffffff?text=Assassin',
      // Original: { strength: 7, dexterity: 10, constitution: 7, intelligence: 10, wisdom: 8, charisma: 8 } (Total: 50)
      attributes: { strength: 3, dexterity: 6, constitution: 3, intelligence: 6, wisdom: 4, charisma: 5 }, // Total: 27
    },
    {
      name: 'High Druid Caelan',
      imageUrl: 'https://placehold.co/600x800/3f9142/ffffff?text=Caelan',
      // Original: { strength: 6, dexterity: 7, constitution: 9, intelligence: 9, wisdom: 10, charisma: 9 } (Total: 50)
      attributes: { strength: 3, dexterity: 4, constitution: 5, intelligence: 5, wisdom: 6, charisma: 4 }, // Total: 27
    },
    {
      name: 'Groknar, Hill Giant Chieftain',
      imageUrl: 'https://placehold.co/600x800/b7791f/ffffff?text=Groknar',
      // Original: { strength: 10, dexterity: 6, constitution: 10, intelligence: 6, wisdom: 8, charisma: 10 } (Total: 50)
      attributes: { strength: 6, dexterity: 3, constitution: 6, intelligence: 3, wisdom: 4, charisma: 5 }, // Total: 27
    },
    {
      name: 'Seraphina, Celestial Champion',
      imageUrl: 'https://placehold.co/600x800/faf089/000000?text=Seraphina',
      // Original: { strength: 9, dexterity: 8, constitution: 9, intelligence: 8, wisdom: 8, charisma: 8 } (Total: 50)
      attributes: { strength: 5, dexterity: 4, constitution: 5, intelligence: 4, wisdom: 4, charisma: 5 }, // Total: 27
    },
    {
      name: 'The Abyssal Horror',
      imageUrl: 'https://placehold.co/600x800/702459/ffffff?text=Horror',
      // Original: { strength: 10, dexterity: 8, constitution: 10, intelligence: 10, wisdom: 4, charisma: 8 } (Total: 50)
      attributes: { strength: 6, dexterity: 4, constitution: 6, intelligence: 5, wisdom: 2, charisma: 4 }, // Total: 27
    },
    {
      name: 'Master Zhin, Monk of the Four Winds',
      imageUrl: 'https://placehold.co/600x800/667eea/ffffff?text=Zhin',
      // Original: { strength: 8, dexterity: 10, constitution: 8, intelligence: 7, wisdom: 10, charisma: 7 } (Total: 50)
      attributes: { strength: 4, dexterity: 6, constitution: 4, intelligence: 3, wisdom: 6, charisma: 4 }, // Total: 27
    },
    {
      name: 'Queen Valeriana, the Diplomat',
      imageUrl: 'https://placehold.co/600x800/d53f8c/ffffff?text=Valeriana',
      // Original: { strength: 6, dexterity: 7, constitution: 7, intelligence: 10, wisdom: 10, charisma: 10 } (Total: 50)
      attributes: { strength: 3, dexterity: 4, constitution: 3, intelligence: 6, wisdom: 6, charisma: 5 }, // Total: 27
    },
    {
      name: 'The Nameless One',
      imageUrl: 'https://placehold.co/600x800/000000/ffffff?text=?',
      // Original: { strength: 8, dexterity: 8, constitution: 9, intelligence: 9, wisdom: 8, charisma: 8 } (Total: 50)
      attributes: { strength: 4, dexterity: 4, constitution: 5, intelligence: 5, wisdom: 4, charisma: 5 }, // Total: 27
    },
  ],
}
