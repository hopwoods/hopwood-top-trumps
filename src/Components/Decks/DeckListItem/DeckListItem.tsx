import { Button } from '../../Common/Button/Button' // Assuming Button component path
import { useDeckListItemStyles } from './DeckListItem.styles'
import type { DeckListItemProps } from './DeckListItem.types'
// useIcons is called within Button.tsx, not needed here directly if Button handles iconName

/**
 * DeckListItem component.
 * Displays a single deck with its name, some metadata, and action buttons.
 */
export const DeckListItem = ({ deck, onEdit, onDelete }: DeckListItemProps) => {
  const styles = useDeckListItemStyles()
  // Icons are handled by the Button component via iconName prop

  const cardCountText = deck.cards ? `${deck.cards.length} card${deck.cards.length === 1 ? '' : 's'}` : '0 cards'
  // Fallback for cardCount if not directly on deck object from Firestore yet
  const displayCardCount = typeof deck.cardCount === 'number' ? `${deck.cardCount} card${deck.cardCount === 1 ? '' : 's'}` : cardCountText


  return (
    <li className={styles.root}>
      <div className={styles.deckInfo}>
        <h3 className={styles.deckName}>{deck.name}</h3>
        <p className={styles.deckMeta}>
          {displayCardCount}
          {deck.description && ` - ${deck.description }`}
        </p>
      </div>
      <div className={styles.actionsContainer}>
        <Button
          variant="secondary"
          onClick={() => onEdit(deck.id)}
          aria-label={`Edit deck ${deck.name}`}
          iconName="edit" // Use lowercase key
        >
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => onDelete(deck.id)}
          aria-label={`Delete deck ${deck.name}`}
          iconName="delete" // Use lowercase key
        >
          Delete
        </Button>
      </div>
    </li>
  )
}
