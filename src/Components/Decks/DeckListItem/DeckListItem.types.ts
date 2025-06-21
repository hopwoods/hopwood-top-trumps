import type { Deck } from '../../../Machines/DeckMachine/DeckMachine.types'

export interface DeckListItemProps {
  deck: Deck
  onEdit: (deckId: string) => void
  onDelete: (deckId: string) => void
}
