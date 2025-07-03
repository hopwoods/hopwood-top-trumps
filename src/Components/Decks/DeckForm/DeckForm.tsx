import { useDeckFormStyles } from './DeckForm.styles';
import type { DeckFormProps } from './DeckForm.types';
import { Button } from '../../Common/Button/Button';
import { Input } from '../../Common/Input/Input';
import { Spinner } from '../../Common/Spinner/Spinner';

export const DeckForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: DeckFormProps) => {
  const styles = useDeckFormStyles();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>Deck Name</label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="description" className={styles.label}>Description</label>
        <textarea
          id="description"
          name="description"
          className={styles.input}
          value={formData.description}
          onChange={onChange}
          rows={4}
          disabled={isSubmitting}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : 'Save Deck'}
        </Button>
      </div>
    </form>
  );
};
