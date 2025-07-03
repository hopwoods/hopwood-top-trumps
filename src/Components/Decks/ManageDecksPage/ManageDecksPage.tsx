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
    handleFormChange,
    handleCreateNewDeck,
    handleEditDeck,
    handleDeleteDeck,
    handleSaveDeck,
    handleCloseModal,
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
                onDelete={() => handleDeleteDeck(deck.id)}
              />
            ))}
          </ul>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingDeck ? 'Edit Deck' : 'Create New Deck'}
      >
        <DeckForm
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleSaveDeck}
          onCancel={handleCloseModal}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default ManageDecksPage
