import type { Deck } from '../../../Machines/DeckMachine/DeckMachine.types';

export interface DeckFormData {
  name: string;
  description: string;
}

export interface DeckFormProps {
  /**
   * The initial data to populate the form with.
   * Used for editing an existing deck.
   */
  initialData?: Deck;
  /**
   * The form data to display.
   */
  formData: DeckFormData;
  /**
   * The function to call when any form field changes.
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /**
   * The function to call when the form is submitted.
   */
  onSubmit: () => void;
  /**
   * The function to call when the form is cancelled.
   */
  onCancel: () => void;
  /**
   * A flag to indicate if the form is currently submitting.
   * Used to disable the submit button.
   */
  isSubmitting?: boolean;
}
