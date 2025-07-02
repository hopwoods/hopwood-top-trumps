import { Badge } from '../../Common/Badge/Badge'
import { Button } from '../../Common/Button/Button'
import { useDeckListItemStyles } from './DeckListItem.styles'
import type { DeckListItemProps } from './DeckListItem.types'

/**
 * DeckListItem component.
 * Displays a single deck with its name, some metadata, and action buttons.
 */
export const DeckListItem = ({ deck, onEdit, onDelete }: DeckListItemProps) => {
  const styles = useDeckListItemStyles()

  // Determine the card count, preferring the direct `cardCount` property if available.
  const cardCount = typeof deck.cardCount === 'number' ? deck.cardCount : deck.cards?.length ?? 0

  return (
    <li className={styles.root}>
      <div className={styles.deckInfo}>
        <h3 className={styles.deckName}>{deck.name}</h3>
        <div className={styles.deckMeta}>
          <Badge variant="secondary">{`${cardCount} card${cardCount === 1 ? '' : 's'}`}</Badge>
          {deck.description && <p className={styles.description}>{deck.description}</p>}
        </div>
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
