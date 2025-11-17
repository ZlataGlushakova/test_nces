import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTasks } from '../../hooks/useTasks';
import styles from './TaskDetailsPage.module.css';

export const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { task, loading, error, deleteTask } = useTask(id!);

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      await deleteTask();
      navigate('/');
    }
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  if (!task) {
    return <div className={styles.error}>Задача не найдена</div>;
  }

  const getStatusText = (status: string) => {
    const statusMap = {
      todo: 'К выполнению',
      inProgress: 'В процессе',
      done: 'Выполнена'
    };
    return statusMap[status as keyof typeof statusMap];
  };

  const getPriorityText = (priority: string) => {
    const priorityMap = {
      low: 'Низкий',
      medium: 'Средний',
      high: 'Высокий'
    };
    return priorityMap[priority as keyof typeof priorityMap];
  };

  const getPriorityClass = (priority: string) => {
    return styles[`priority-${priority}`];
  };

  const getStatusClass = (status: string) => {
    return styles[`status-${status}`];
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/" className={styles.backButton}>
          ← Назад к списку
        </Link>
        <div className={styles.actions}>
          <Link to={`/task/edit/${task.id}`} className={styles.editButton}>
            Редактировать
          </Link>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Удалить
          </button>
        </div>
      </div>

      <div className={styles.task}>
        <div className={styles.taskHeader}>
          <h1 className={styles.title}>{task.title}</h1>
          <div className={styles.meta}>
            <span className={`${styles.status} ${getStatusClass(task.status)}`}>
              {getStatusText(task.status)}
            </span>
            <span className={`${styles.priority} ${getPriorityClass(task.priority)}`}>
              {getPriorityText(task.priority)}
            </span>
          </div>
        </div>

        <div className={styles.dates}>
          <div className={styles.date}>
            <strong>Создана:</strong> {new Date(task.createdAt).toLocaleDateString()}
          </div>
          <div className={styles.date}>
            <strong>Обновлена:</strong> {new Date(task.updatedAt).toLocaleDateString()}
          </div>
          <div className={styles.date}>
            <strong>Срок выполнения:</strong> {new Date(task.dueDate).toLocaleDateString()}
          </div>
        </div>

        <div className={styles.section}>
          <h3>Описание</h3>
          <p className={styles.description}>{task.description}</p>
        </div>

        {task.tags.length > 0 && (
          <div className={styles.section}>
            <h3>Метки</h3>
            <div className={styles.tags}>
              {task.tags.map(tag => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};