import { useDeckFormStyles } from './DeckForm.styles';
import type { DeckFormProps } from './DeckForm.types';
import { Button } from '../../Common/Button/Button';
import { Input } from '../../Common/Input/Input';
import { Spinner } from '../../Common/Spinner/Spinner';
import { TextArea } from '../../Common/TextArea/TextArea';

export const DeckForm = ({ formData, onChange, onSubmit, onCancel, isSubmitting = false}: DeckFormProps) => {
  const styles = useDeckFormStyles();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <Input
          id="name"
          name="name"
          label="Deck Name"
          value={formData.name}
          onChange={onChange}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className={styles.field}>
        <TextArea
          id="description"
          name="description"
          label="Description"
          value={formData.description}
          onChange={onChange}
          rows={4}
          disabled={isSubmitting}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button iconName='cancel' type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button iconName='save' type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : 'Save Deck'}
        </Button>
      </div>
    </form>
  );
};
