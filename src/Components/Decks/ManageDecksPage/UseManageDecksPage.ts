import { useState, useEffect } from 'react';
import { useSelector } from '@xstate/react';
import { GlobalStateContext } from '../../../Hooks/UseAppState';
import type { Deck } from '../../../Machines/DeckMachine/DeckMachine.types';
import type { DeckFormData } from '../DeckForm/DeckForm.types';
import { deckMachine } from '../../../Machines/DeckMachine/DeckMachine';
import type { ActorRefFrom } from 'xstate';

/**
 * Custom hook for the ManageDecksPage component.
 * This hook encapsulates all logic for the page, including interaction
 * with the invoked deckMachine actor.
 */
export const useManageDecksPage = () => {
  const appActorRef = GlobalStateContext.useActorRef();

  // Select the child actor reference from the parent machine
  const deckMachineActorRef = useSelector(appActorRef, (state) => {
    return state.children.deckMachineActor as ActorRefFrom<typeof deckMachine> | undefined;
  });

  // Subscribe to the child actor's state
  const [snapshot, setSnapshot] = useState(() => deckMachineActorRef?.getSnapshot());
  useEffect(() => {
    if (deckMachineActorRef) {
      const subscription = deckMachineActorRef.subscribe(setSnapshot);
      return () => subscription.unsubscribe();
    }
  }, [deckMachineActorRef]);


  const [formData, setFormData] = useState<DeckFormData>({ name: '', description: '' });

  const isModalOpen = snapshot?.hasTag('deck-form') ?? false;
  const isConfirmingDelete = snapshot?.hasTag('confirming-delete') ?? false;
  const isSubmitting = snapshot?.hasTag('saving') ?? false;
  const isLoading = snapshot?.matches('loadingDecks') ?? false;
  const editingDeck = snapshot?.context.selectedDeck ?? null;
  const deckToDelete = snapshot?.context.deckToDelete ?? null;
  const error = snapshot?.context.error ?? null;
  const decks = snapshot?.context.decks ?? [];

  useEffect(() => {
    if (editingDeck) {
      setFormData({ name: editingDeck.name, description: editingDeck.description || '' });
    } else {
      setFormData({ name: '', description: '' });
    }
  }, [editingDeck]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateNewDeck = () => {
    if (deckMachineActorRef) {
      deckMachineActorRef.send({ type: 'CREATE_NEW_DECK' });
    }
  };

  const handleEditDeck = (deck: Deck) => {
    if (deckMachineActorRef) {
      deckMachineActorRef.send({ type: 'EDIT_DECK', deck });
    }
  };

  const handleSaveDeck = () => {
    if (deckMachineActorRef) {
      deckMachineActorRef.send({
        type: 'SAVE_DECK',
        deck: {
          id: editingDeck?.id,
          ...formData,
        },
      });
    }
  };

  const handleDeleteDeck = (deck: Deck) => {
    if (deckMachineActorRef) {
      deckMachineActorRef.send({ type: 'DELETE_DECK', deckId: deck.id, deckName: deck.name });
    } else {
      console.error('DeckMachine actor not available to send DELETE_DECK event');
    }
  };

  const handleConfirmDelete = () => {
    if (deckMachineActorRef) {
      deckMachineActorRef.send({ type: 'CONFIRM_DELETE' });
    }
  };

  const handleCancelDelete = () => {
    if (deckMachineActorRef) {
      deckMachineActorRef.send({ type: 'CANCEL_DELETE' });
    }
  };

  const handleCloseModal = () => {
    if (deckMachineActorRef) {
      deckMachineActorRef.send({ type: 'CANCEL_DECK_EDIT' });
    }
  };

  return {
    decks,
    isLoading: isLoading || isSubmitting,
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
  };
};
