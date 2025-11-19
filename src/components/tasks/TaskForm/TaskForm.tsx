import React from 'react';
import { ITask } from '../../../types/task';
import styles from './TaskForm.module.css';

interface TaskFormProps {
  task?: ITask;
  onSubmit: (taskData: Omit<ITask, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  existingTags: string[];
}

export const TaskForm: React.FC<TaskFormProps> = ({
  task,
  onSubmit,
  onCancel,
  existingTags,
}) => {
  const [formData, setFormData] = React.useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'todo',
    priority: task?.priority || 'medium',
    dueDate: task?.dueDate || new Date().toISOString().split('T')[0],
    tags: task?.tags || [],
  });

  const [newTag, setNewTag] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }

    onSubmit({
      ...formData,
      dueDate: new Date(formData.dueDate).toISOString(),
    });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className={styles.textarea}
          rows={4}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as ITask['status'] }))}
            className={styles.select}
          >
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as ITask['priority'] }))}
            className={styles.select}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="tags">Tags</label>
        <div className={styles.tagInput}>
          <input
            id="tags"
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.input}
            placeholder="Add a tag..."
            list="existingTags"
          />
          <button 
            type="button" 
            onClick={handleAddTag}
            className={styles.addTagButton}
          >
            Add
          </button>
        </div>
        <datalist id="existingTags">
          {existingTags.map(tag => (
            <option key={tag} value={tag} />
          ))}
        </datalist>
        
        <div className={styles.tagsList}>
          {formData.tags.map(tag => (
            <span key={tag} className={styles.tag}>
              {tag}
              <button 
                type="button" 
                onClick={() => handleRemoveTag(tag)}
                className={styles.removeTag}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          {task ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};