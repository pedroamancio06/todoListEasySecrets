import { useState, useEffect } from 'react';
import styles from '../assets/stylesComponents/Task.module.css';

import Edit from './Edit';

/*
  Import icons
*/
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function Task({ tasks, deleteTask, completeTask, setEdit, editTask, editId  }) {
    const [newTitle, setNewTitle] = useState(tasks.title);
    const [newDescription, setNewDescription] = useState(tasks.description);
    const [isVisible, setIsVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (editId === tasks.id) {
        setIsVisible(true);
        } else {
        setIsVisible(false);
        }
    }, [editId, tasks.id]);

    function toSave() {
        editTask(tasks.id, newTitle, newDescription);
    }

    return (
        <div className={styles.taskContainer} 
            style={{
                textDecoration : tasks.complete ? 'line-through' : 'none',
                backgroundColor : tasks.complete ? 'var(--background-task_complete-light)' : 'var(--background-task-light)'
            }}
        >
            <span className={`${styles.span} ${isEditing ? styles.editMode : ''}`}>
                <input  
                    type="checkbox" 
                    name="checkConcluded" 
                    id={styles.inputConcluded}
                    onChange={() => completeTask(tasks.id)}
                    checked={tasks.complete}
                    // Passei para o atributo "checked" o valor "complete" atribuído a tarefa
                />
                <div className={`${styles.infoTask} ${isVisible ? 'visible' : ''}`}>
                    {editId === tasks.id ? (
                        /*  */
                        <Edit 
                            toSave={toSave}
                            setNewDescription={setNewDescription} 
                            setNewTitle={setNewTitle} 
                            newTitle={newTitle}
                            newDescription={newDescription}
                            setIsEditing={setIsEditing}
                        />
                    ) : (
                    <div className={styles.infoTask}>
                        <h4 className={styles.infoTitle}>{tasks.title}</h4>
                        <p className={styles.infoDescription}>{tasks.description}</p>
                    </div>
                    )}
                </div>
            </span>
            <span className={styles.btnContainer}>
                <button className={styles.btnEdit} onClick={() => {
                    setEdit(tasks.id);
                    setIsEditing(true);
                }}>
                    <FaRegEdit />
                </button>
                <button className={styles.btnDelete} onClick={() => deleteTask(tasks.id)}>
                    <MdDelete />
                </button>
            </span>
        </div>
    );
}

export default Task