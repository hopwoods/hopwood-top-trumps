import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../Common/Button/Button';
import { useManageDecksPageStyles } from './ManageDecksPage.styles';
import { useManageDecksPage } from './UseManageDecksPage';
import { DeckListItem } from '../DeckListItem/DeckListItem';
import { Modal } from '../../Common/Modal/Modal';
import { DeckForm } from '../DeckForm/DeckForm';
import LoadingIndicator from '../../Common/LoadingIndicator/LoadingIndicator';

/**
 * ManageDecksPage component.
 * This page allows users to view, create, edit, and delete their decks.
 */
const ManageDecksPage = () => {
  const styles = useManageDecksPageStyles();
  const {
    decks,
    isLoading,
    error,
    isModalOpen,
    editingDeck,
    isSubmitting,
    formData,
    isConfirmingDelete,
    deckToDelete,
    handleFormChange,
    handleCreateNewDeck,
    handleEditDeck,
    handleDeleteDeck,
    handleSaveDeck,
    handleCloseModal,
    handleConfirmDelete,
    handleCancelDelete,
  } = useManageDecksPage();

  if (isLoading && decks.length === 0) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <div className={styles.root}>
        Error loading decks: {error.message}
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>Manage Decks</h1>
        <Button variant="primary" onClick={handleCreateNewDeck} iconLeft={faPlus}>
          Create New Deck
        </Button>
      </div>

      <div className={styles.deckListContainer}>
        {decks.length === 0 ? (
          <p className={styles.noDecksMessage}>
            You haven't created any decks yet. Get started by creating one!
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
            {decks.map(deck => (
              <DeckListItem
                key={deck.id}
                deck={deck}
                onEdit={() => handleEditDeck(deck)}
                onDelete={() => handleDeleteDeck(deck)}
              />
            ))}
          </ul>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingDeck ? 'Edit Deck' : 'Create New Deck'}>
        <DeckForm
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleSaveDeck}
          onCancel={handleCloseModal}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <Modal isOpen={isConfirmingDelete} onClose={handleCancelDelete} title="Confirm Deletion">
        <div className={styles.confirmDeleteContainer}>
          <p>
            Are you sure you want to delete the deck <strong>{deckToDelete?.name}</strong>? <br />
            This action cannot be undone.
          </p>
          <div className={styles.confirmDeleteButtons}>
            <Button iconName='cancel' variant="secondary" onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button iconName='delete' variant="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageDecksPage
